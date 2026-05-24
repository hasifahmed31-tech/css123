# Multi-Profile Playwright Automation Runner

A robust, multi-profile web automation testing script using **Playwright (Python sync API)** with persistent browser contexts, proxy rotation, human-like telemetry, and configurable concurrency.

## Features

- **Persistent Contexts** — Each profile gets a dedicated user-data directory (`./profiles/profile_*`), preserving cookies, local storage, and session state across runs.
- **Dynamic Configuration** — Profiles are defined as dictionaries containing user-agent, proxy settings, and viewport dimensions.
- **Human-Like Telemetry** — Random delays and smooth incremental scrolling simulate natural browsing behavior.
- **Error Recovery** — `try / except / finally` blocks ensure browser contexts close cleanly and state is saved even on failure.
- **Concurrency Control** — A single variable (`MAX_CONCURRENT_PROFILES`) caps simultaneous sessions to manage RAM.

## Quick Start

```bash
cd automation
pip install -r requirements.txt
playwright install chromium
python multi_profile_runner.py
```

## Configuration

Edit the constants at the top of `multi_profile_runner.py`:

| Variable | Purpose |
|---|---|
| `BASE_PROFILE_DIR` | Root directory for persistent profile data |
| `MAX_CONCURRENT_PROFILES` | Max browser sessions running at once |
| `NAVIGATION_URLS` | List of URLs each profile will visit |
| `PROFILES` | Dict mapping profile IDs to their config (user-agent, proxy, viewport) |

### Profile Config Schema

```python
"profile_id": {
    "user_agent": "Mozilla/5.0 ...",
    "proxy": {
        "server": "http://host:port",
        "username": "user",
        "password": "pass",
    },
    "viewport": {"width": 1920, "height": 1080},
}
```

## Requirements

- Python 3.10+
- Playwright (`pip install playwright && playwright install chromium`)
