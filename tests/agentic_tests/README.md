# Agentic browser tests

This directory stores the repo-local YAML contract for the shared Playwright-MCP agentic browser runtime.

## Generated install-check

- Product: `website`
- Environment: `production`
- Public route: `/en`
- Target URL: `https://awesomeworks.ai/en`
- Case file: `tests/agentic_tests/suites/smoke/website.bootstrap.install-check.yml`
- Run request: `tests/agentic_tests/run_requests/bootstrap-public-install-check.example.yml`

## Required reporting env contract

- `WEBSITE_AGENTIC_REPORTING_PROJECT_ID` (required) - software-factory project id for MCP reporting
- `WEBSITE_AGENTIC_MCP_SERVER_COMMAND` (required) - stdio command used to launch software-factory MCP
- `WEBSITE_AGENTIC_MCP_SERVER_ARGS` (required) - stdio arguments used to launch software-factory MCP
- `WEBSITE_AGENTIC_MCP_SERVER_CWD` (required) - working directory used to launch software-factory MCP
- `WEBSITE_AGENTIC_REPORTING_BASE_URL` (optional) - REST fallback base URL
- `WEBSITE_AGENTIC_REPORTING_TOKEN` (optional) - REST fallback bearer token

## Verification flow

Run these commands from a `software-factory/backend` checkout or any environment where `sf-agentic-browser` is installed:

1. `uv run sf-agentic-browser plan --case-file /home/deploy/repos/worktrees/website/feature-agentic-browser-bootstrap/tests/agentic_tests/suites/smoke/website.bootstrap.install-check.yml --run-request /home/deploy/repos/worktrees/website/feature-agentic-browser-bootstrap/tests/agentic_tests/run_requests/bootstrap-public-install-check.example.yml`
2. `uv run sf-agentic-browser run --case-file /home/deploy/repos/worktrees/website/feature-agentic-browser-bootstrap/tests/agentic_tests/suites/smoke/website.bootstrap.install-check.yml --run-request /home/deploy/repos/worktrees/website/feature-agentic-browser-bootstrap/tests/agentic_tests/run_requests/bootstrap-public-install-check.example.yml | tee /home/deploy/repos/worktrees/website/feature-agentic-browser-bootstrap/tests/agentic_tests/website.bootstrap.install-check.observation.json`
3. `uv run sf-agentic-browser evaluate --case-file /home/deploy/repos/worktrees/website/feature-agentic-browser-bootstrap/tests/agentic_tests/suites/smoke/website.bootstrap.install-check.yml --run-request /home/deploy/repos/worktrees/website/feature-agentic-browser-bootstrap/tests/agentic_tests/run_requests/bootstrap-public-install-check.example.yml --observation-file /home/deploy/repos/worktrees/website/feature-agentic-browser-bootstrap/tests/agentic_tests/website.bootstrap.install-check.observation.json`

The evaluate step will emit success or failure through the shared software-factory MCP adapter defined in `adapters/software-factory.yml`.
