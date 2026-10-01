# AI teammate for Slack — Agents HTTP API

Python 3.10+ and curl; no Python packages or OpenAI SDK required. Run on Linux, macOS, or Windows WSL. All HTTP requests are made by the curl executable. The Python wrapper builds JSON, parses SSE, and handles state and errors.

## Setup and run

Use an application API key for project `proj_OUFYAkPW67W3UHjVUJaQwDJH`, with `api.agents.read`, `api.agents.write`, and `api.responses.write`. Configure `OPENAI_API_KEY` through your server's secret environment. In Bash you can enter it without echo or a literal key in shell history:

```bash
cd tools/ai-teammate-slack
read -rsp 'OpenAI API key: ' OPENAI_API_KEY
export OPENAI_API_KEY
python3 teammate.py run --message 'Introduce yourself and help me plan my next project task.'
```

The first run POSTs `agent.json` to `/v1/agents`, saves the returned agent ID, then POSTs `/v1/agents/sessions` with `agent_id`, the initial message, and `stream: true`. Events, text deltas, and final output events appear as JSON lines. Later runs reuse the saved agent and create a new session. Use `--new-agent` after changing the definition; this creates another saved agent.

```bash
python3 teammate.py recover
python3 teammate.py watch
python3 -m unittest discover -s tests -v
```

`recover` retrieves the latest session and paginates its saved items, without replaying a task. `watch` opens its live stream. You may provide `--session sess_ID` for either. Streams do not replay missed events: recover after a disconnect, then watch if the turn remains active. Live subscription and snapshot merging for a graphical UI are beyond this CLI's scope.

## Runtime, tools, and safety

The agent uses `gpt-6-astra` and web search with medium context. Its supported environment is `none`: it answers and uses web search without shell access, so no sandbox runtime or executor is needed. Python runs the application locally, not inside an agent sandbox.

Web search executes on OpenAI's side. Pending function calls are handled through `required_actions` and returned to the events endpoint using their original turn/call IDs. Unconfigured functions return `success: false`; no arbitrary command or Slack action executes. Add an explicit authorized function implementation and durable result journal before enabling functions with effects.

This implements the requested agent/session application. The name does not connect it to Slack. No Slack events, tokens, posting, or workspace installation are configured by the original definition.

Authentication headers travel through curl's stdin configuration, never command-line arguments. No key is saved to disk. Known key values are redacted from displayed output and errors. Do not enable shell tracing, curl verbose mode, or HTTP debugging. State files contain only IDs, have restricted permissions, and are ignored by Git. Treat streamed content as private and avoid publishing logs.

HTTP failures, lifecycle failures, cancelled root turns, malformed events, and incomplete streams exit nonzero. Child turn completion and idle events do not imply success. Automatic mutation retries are intentionally absent because requests may have succeeded before a connection failed. A lost create response can leave an orphaned resource: inspect the Platform before creating another.

Sessions and saved agents persist remotely and can incur charges. Interrupting the client stops watching, not necessarily the remote turn. Explicit cancellation uses `POST /v1/agents/sessions/{id}/events` with `{"events":[{"type":"agent.session.input.cancel"}]}`. Delete unwanted sessions/agents through the documented API or Platform after retaining necessary output.

## Verification and repository review

Inspected GitHub as `divinestarraven-sys`, including repository trees and current package files. Selected target: `divinestarraven-sys/TGRPOCT`, reviewed main commit `c963a7a60a69b95c927a90a74cdef9d3c887002d`. It is a Vite/React application and has no existing Agents/Slack app paths. This independent server-side CLI is installed at `tools/ai-teammate-slack/` with user approval, without changing frontend dependencies.

Local mock verification uses real curl and tests agent creation/reuse, returned-ID session creation, initial input, SSE with CRLF, function failure results, root/child completion, state recovery, HTTP and turn errors, disconnects, missing keys, and redaction. This environment had no OPENAI_API_KEY; live agent creation, model/project permissions, web search, and live sessions remain unverified. Do not interpret a passing mock test as a successful OpenAI run.

## Official documentation

- https://developers.openai.com/api/docs/guides/agents-api/overview
- https://developers.openai.com/api/docs/guides/agents-api/quickstart
- https://developers.openai.com/api/docs/guides/agents-api/configuration
- https://developers.openai.com/api/docs/guides/agents-api/sessions/events
- https://developers.openai.com/api/docs/guides/agents-api/tools/functions
- https://developers.openai.com/api/docs/guides/agents-api/tools/web-search

Documentation retrieved October 2, 2026 (Australia/Sydney).
