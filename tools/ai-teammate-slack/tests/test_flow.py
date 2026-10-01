import json
import os
import subprocess
import tempfile
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

APP = Path(__file__).resolve().parents[1] / 'teammate.py'

class FlowTest(unittest.TestCase):
    def test_real_curl_transport(self):
        calls = []
        mode = ['ok']
        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *args): pass
            def do_POST(self):
                body = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
                calls.append((self.path, body, dict(self.headers)))
                if mode[0] == 'http':
                    self.send_response(401); self.end_headers()
                    self.wfile.write(b'{"error":"mock-key unauthorized"}'); return
                if self.path == '/v1/agents':
                    self.send_response(200); self.end_headers()
                    self.wfile.write(b'{"id":"agent_mock"}'); return
                if self.path.endswith('/events'):
                    self.send_response(200); self.end_headers(); self.wfile.write(b'{}'); return
                self.send_response(200); self.send_header('Content-Type', 'text/event-stream'); self.end_headers()
                events = [
                    {'type':'agent.session.created','session':{'id':'sess_mock'}},
                    {'type':'agent.session.idle'},
                    {'type':'agent.session.requires_action','session':{'id':'sess_mock','required_actions':[
                        {'type':'function_call','turn_id':'turn_mock','call_id':'call_mock','name':'unsafe_command','arguments':{}}]}},
                    {'type':'agent.session.turn.completed','turn':{'subagent_id':'child'}},
                    {'type':'agent.session.turn.output_text.delta','delta':'Hello mock-key'},
                ]
                if mode[0] == 'ok': events.append({'type':'agent.session.turn.completed','turn':{'subagent_id':None}})
                if mode[0] == 'failed': events.append({'type':'agent.session.turn.failed','turn':{'subagent_id':None}})
                for event in events:
                    self.wfile.write(('event: progress\r\ndata: '+json.dumps(event)+'\r\n\r\n').encode()); self.wfile.flush()
            def do_GET(self):
                calls.append((self.path, None, dict(self.headers)))
                self.send_response(200); self.end_headers()
                if '/items?' in self.path:
                    self.wfile.write(json.dumps({'data':[], 'has_more':False}).encode())
                else: self.wfile.write(b'{"id":"sess_mock","status":"idle"}')
        server = ThreadingHTTPServer(('127.0.0.1',0), Handler)
        thread = threading.Thread(target=server.serve_forever, daemon=True); thread.start()
        try:
            with tempfile.TemporaryDirectory() as state:
                env = dict(os.environ, OPENAI_API_KEY='mock-key', AGENTS_STATE_DIR=state,
                           AGENTS_API_BASE=f'http://127.0.0.1:{server.server_port}/v1')
                def run(*args):
                    return subprocess.run(['python3',str(APP),*args],env=env,capture_output=True,text=True,timeout=20)
                result = run('run','--message','Initial hello')
                self.assertEqual(result.returncode,0,result.stderr)
                self.assertNotIn('mock-key',result.stdout+result.stderr)
                self.assertEqual(calls[0][1]['model'],'gpt-6-astra')
                self.assertEqual(calls[1][1]['agent_id'],'agent_mock')
                self.assertEqual(calls[1][1]['environment'],{'type':'none'})
                self.assertEqual(calls[1][1]['input'],'Initial hello')
                self.assertEqual(calls[0][2]['OpenAI-Beta'],'agents=v1')
                self.assertEqual(calls[2][1]['events'][0]['success'],False)
                self.assertEqual(json.loads(Path(state,'session.json').read_text())['id'],'sess_mock')
                self.assertEqual(run('recover').returncode,0)
                before = len([c for c in calls if c[0]=='/v1/agents'])
                self.assertEqual(run('run').returncode,0)
                self.assertEqual(len([c for c in calls if c[0]=='/v1/agents']),before)
                for value in ['disconnect','failed','http']:
                    mode[0]=value
                    result=run('run')
                    self.assertNotEqual(result.returncode,0)
                    self.assertNotIn('mock-key',result.stdout+result.stderr)
                env.pop('OPENAI_API_KEY')
                self.assertIn('Set OPENAI_API_KEY',run('run').stderr)
        finally:
            server.shutdown(); server.server_close(); thread.join()

if __name__ == '__main__': unittest.main()
