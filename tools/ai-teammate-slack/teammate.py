#!/usr/bin/env python3
"""Agents HTTP API client: Python 3.10+ orchestration, curl transport, no SDK."""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
PROJECT = 'proj_OUFYAkPW67W3UHjVUJaQwDJH'

class Client:
    def __init__(self):
        self.key = os.environ.get('OPENAI_API_KEY', '')
        if not self.key:
            raise RuntimeError('Set OPENAI_API_KEY in the server environment. It is never printed.')
        if not shutil.which('curl'):
            raise RuntimeError('Install curl first.')
        self.base = os.environ.get('AGENTS_API_BASE', 'https://api.openai.com/v1').rstrip('/')
        parsed = urlparse(self.base)
        if self.base != 'https://api.openai.com/v1' and not (
            parsed.scheme == 'http' and parsed.hostname in ('127.0.0.1', 'localhost')
            and self.key == 'mock-key'):
            raise RuntimeError('API override permits only loopback with mock-key.')
        self.state = Path(os.environ.get('AGENTS_STATE_DIR', str(ROOT / '.state')))
        self.state.mkdir(mode=0o700, parents=True, exist_ok=True)
        os.chmod(self.state, 0o700)
        self.saved = self.read('session.json', {})

    def safe(self, value):
        return str(value).replace(self.key, '[REDACTED]')

    def read(self, name, default):
        path = self.state / name
        return json.loads(path.read_text()) if path.exists() else default

    def save(self, name, value):
        fd, temp = tempfile.mkstemp(dir=self.state)
        try:
            with os.fdopen(fd, 'w') as f:
                json.dump(value, f)
            os.replace(temp, self.state / name)
        finally:
            if os.path.exists(temp): os.unlink(temp)

    def transport(self, method, path, body=None):
        # Headers and JSON go through stdin/config, never argv or shell expansion.
        def quote(s):
            return '"' + s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r') + '"'
        cfg = ['silent', 'show-error', 'no-buffer', 'fail-with-body',
               'connect-timeout = 20', 'max-time = 600',
               'request = ' + quote(method), 'url = ' + quote(self.base + path)]
        for h in ['Authorization: Bearer ' + self.key, 'OpenAI-Beta: agents=v1',
                  'OpenAI-Project: ' + os.environ.get('OPENAI_PROJECT_ID', PROJECT),
                  'Content-Type: application/json']:
            cfg.append('header = ' + quote(h))
        if body is not None: cfg.append('data = ' + quote(json.dumps(body)))
        p = subprocess.Popen(['curl', '--config', '-'], stdin=subprocess.PIPE,
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        p.stdin.write('\n'.join(cfg) + '\n')
        p.stdin.close()
        return p

    def request(self, method, path, body=None):
        p = self.transport(method, path, body)
        out = p.stdout.read()
        err = p.stderr.read()
        code = p.wait()
        if code: raise RuntimeError(self.safe(f'curl failed ({code}): {err} {out[:2000]}'))
        return json.loads(out) if out.strip() else {}

    def actions(self, session):
        sid = session['id']
        for action in session.get('required_actions', []):
            if action.get('type') != 'function_call':
                raise RuntimeError('Unsupported required action; inspect session before continuing.')
            result = {'type': 'agent.session.input.tool_result',
                      'turn_id': action['turn_id'], 'call_id': action['call_id']}
            # Explicit allowlist: no arbitrary command execution or Slack writes.
            # The default definition has only server-executed web_search.
            result.update(success=False, error='No authorized handler for function ' + action.get('name', 'unknown'))
            self.request('POST', f'/agents/sessions/{sid}/events', {'events': [result]})

    def event(self, event):
        session = event.get('session', {})
        sid = event.get('session_id') or session.get('id')
        if sid:
            self.saved = {'id': sid}
            self.save('session.json', self.saved)
        print(self.safe(json.dumps(event, ensure_ascii=False)), flush=True)
        kind = event.get('type', '')
        if kind == 'agent.session.requires_action': self.actions(session)
        root = event.get('turn', {}).get('subagent_id') is None
        if kind in ('error', 'agent.session.failed', 'agent.session.environment.failed') or (
            root and kind in ('agent.session.turn.failed', 'agent.session.turn.cancelled')):
            raise RuntimeError('Agent failed; retrieve saved state with recover. See event above.')
        return root and kind == 'agent.session.turn.completed'

    def stream(self, method, path, body=None):
        p = self.transport(method, path, body)
        data = []
        raw = []
        try:
            for line in p.stdout:
                raw.append(line)
                if len(raw) > 100: raw.pop(0)
                if line.startswith('data:'): data.append(line[5:].strip())
                elif not line.strip() and data:
                    payload = '\n'.join(data)
                    data = []
                    if payload == '[DONE]': continue
                    if self.event(json.loads(payload)): return
            if data and self.event(json.loads('\n'.join(data))): return
            err = p.stderr.read()
            code = p.wait()
            raise RuntimeError(self.safe(f'Stream ended without root turn completion (curl {code}). {err} {"".join(raw)[:1500]} Run recover; do not blindly resend the task.'))
        finally:
            if p.poll() is None: p.terminate()
            try: p.wait(timeout=5)
            except subprocess.TimeoutExpired: p.kill(); p.wait()

    def run(self, message, new_agent=False):
        agent = self.read('agent.json', {})
        if new_agent or not agent:
            agent = self.request('POST', '/agents', json.loads((ROOT / 'agent.json').read_text()))
            if not agent.get('id'): raise RuntimeError('Create agent response had no ID.')
            self.save('agent.json', {'id': agent['id']})
        self.stream('POST', '/agents/sessions', {
            'agent_id': agent['id'], 'environment': {'type': 'none'},
            'input': message, 'stream': True})

    def recover(self, sid):
        # No task replay. Read authoritative state and all saved item pages.
        session = self.request('GET', f'/agents/sessions/{sid}')
        print(self.safe(json.dumps(session)), flush=True)
        after = ''
        while True:
            page = self.request('GET', f'/agents/sessions/{sid}/items?order=asc&limit=100{after}')
            print(self.safe(json.dumps(page)), flush=True)
            if not page.get('has_more'): break
            cursor = page.get('last_id')
            if not cursor or not re.fullmatch(r'[A-Za-z0-9_-]+', cursor):
                raise RuntimeError('Invalid item pagination cursor.')
            after = '&after=' + cursor
        if session.get('status') == 'requires_action': self.actions(session)
        print('Saved state retrieved. To watch an active turn, run watch.', file=sys.stderr)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=['run', 'recover', 'watch'])
    parser.add_argument('--message', default='Introduce yourself as AI teammate for Slack and explain what you can do with the currently configured tools.')
    parser.add_argument('--session')
    parser.add_argument('--new-agent', action='store_true')
    args = parser.parse_args()
    try:
        client = Client()
        if args.command == 'run': client.run(args.message, args.new_agent)
        else:
            sid = args.session or client.saved.get('id')
            if not sid or not re.fullmatch(r'[A-Za-z0-9_-]+', sid): raise RuntimeError('No valid saved session ID.')
            if args.command == 'recover': client.recover(sid)
            else: client.stream('GET', f'/agents/sessions/{sid}/events?stream=true')
    except (RuntimeError, ValueError, OSError, KeyError) as err:
        key = os.environ.get('OPENAI_API_KEY')
        print(str(err).replace(key, '[REDACTED]') if key else str(err), file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        print('Stopped watching. The remote turn may continue; run recover.', file=sys.stderr)
        return 130
    return 0

if __name__ == '__main__': sys.exit(main())
