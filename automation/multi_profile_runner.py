"""
Multi-Profile Web Automation Runner using Playwright (Sync API).

Supports persistent browser contexts, proxy rotation, human-like
telemetry simulation, and configurable concurrency.
"""

import os
import time
import random
import logging
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

from playwright.sync_api import sync_playwright, TimeoutError as PwTimeout

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

BASE_PROFILE_DIR = os.path.join(os.path.dirname(__file__), "profiles")

MAX_CONCURRENT_PROFILES = 2

NAVIGATION_URLS = [
    "https://example.com",
    "https://example.org",
]

PROFILES = {
    "profile_1": {
        "user_agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/124.0.0.0 Safari/537.36"
        ),
        "proxy": {
            "server": "http://proxy1.example.com:8080",
            "username": "user1",
            "password": "pass1",
        },
        "viewport": {"width": 1920, "height": 1080},
    },
    "profile_2": {
        "user_agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) "
            "AppleWebKit/605.1.15 (KHTML, like Gecko) "
            "Version/17.4.1 Safari/605.1.15"
        ),
        "proxy": {
            "server": "http://proxy2.example.com:8080",
            "username": "user2",
            "password": "pass2",
        },
        "viewport": {"width": 1440, "height": 900},
    },
    "profile_3": {
        "user_agent": (
            "Mozilla/5.0 (X11; Linux x86_64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/123.0.0.0 Safari/537.36"
        ),
        "proxy": {
            "server": "http://proxy3.example.com:3128",
            "username": "user3",
            "password": "pass3",
        },
        "viewport": {"width": 1366, "height": 768},
    },
}

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-7s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Human-like helpers
# ---------------------------------------------------------------------------


def human_delay(minimum: float = 0.8, maximum: float = 3.0) -> None:
    """Sleep for a random duration to mimic human pacing."""
    time.sleep(random.uniform(minimum, maximum))


def smooth_scroll(page, total_distance: int = 0, step_range: tuple = (80, 300)) -> None:
    """Scroll the page downward in randomised increments.

    Args:
        page: Playwright Page object.
        total_distance: Pixels to scroll. ``0`` means the full page height.
        step_range: (min, max) pixels per individual scroll tick.
    """
    if total_distance <= 0:
        total_distance = page.evaluate("document.body.scrollHeight")

    scrolled = 0
    while scrolled < total_distance:
        step = random.randint(*step_range)
        step = min(step, total_distance - scrolled)
        page.evaluate(f"window.scrollBy(0, {step})")
        scrolled += step
        time.sleep(random.uniform(0.05, 0.25))


# ---------------------------------------------------------------------------
# Profile runner
# ---------------------------------------------------------------------------


def run_profile(profile_id: str, config: dict) -> dict:
    """Launch a persistent browser context for *profile_id* and navigate.

    Returns a result dict with status and optional error message.
    """
    profile_dir = os.path.join(BASE_PROFILE_DIR, profile_id)
    Path(profile_dir).mkdir(parents=True, exist_ok=True)

    result = {"profile": profile_id, "status": "success", "error": None}
    context = None

    try:
        with sync_playwright() as pw:
            context = pw.chromium.launch_persistent_context(
                user_data_dir=profile_dir,
                headless=True,
                user_agent=config["user_agent"],
                viewport=config["viewport"],
                screen=config["viewport"],
                proxy={
                    "server": config["proxy"]["server"],
                    "username": config["proxy"]["username"],
                    "password": config["proxy"]["password"],
                },
                ignore_https_errors=True,
                args=[
                    "--disable-blink-features=AutomationControlled",
                    "--disable-infobars",
                ],
            )

            page = context.pages[0] if context.pages else context.new_page()

            for url in NAVIGATION_URLS:
                logger.info("[%s] Navigating to %s", profile_id, url)
                try:
                    page.goto(url, wait_until="domcontentloaded", timeout=30_000)
                except PwTimeout:
                    logger.warning("[%s] Timeout loading %s – skipping", profile_id, url)
                    continue

                human_delay()
                smooth_scroll(page)
                human_delay(1.0, 2.5)

                title = page.title()
                logger.info("[%s] Page title: %s", profile_id, title)

            logger.info("[%s] Navigation sequence complete", profile_id)

    except Exception as exc:
        logger.error("[%s] Error: %s", profile_id, exc)
        result["status"] = "error"
        result["error"] = str(exc)

    finally:
        if context is not None:
            try:
                context.close()
                logger.info("[%s] Context closed – state saved to %s", profile_id, profile_dir)
            except Exception:
                pass

    return result


# ---------------------------------------------------------------------------
# Orchestrator
# ---------------------------------------------------------------------------


def run_all(profiles: dict, concurrency: int = MAX_CONCURRENT_PROFILES) -> list:
    """Execute profiles with a bounded thread pool.

    Args:
        profiles: Mapping of profile_id → config dict.
        concurrency: Maximum simultaneous browser sessions.

    Returns:
        List of result dicts from each profile run.
    """
    results = []

    logger.info(
        "Starting automation — %d profile(s), concurrency=%d",
        len(profiles),
        concurrency,
    )

    with ThreadPoolExecutor(max_workers=concurrency) as pool:
        futures = {
            pool.submit(run_profile, pid, cfg): pid
            for pid, cfg in profiles.items()
        }

        for future in as_completed(futures):
            pid = futures[future]
            try:
                res = future.result()
            except Exception as exc:
                res = {"profile": pid, "status": "error", "error": str(exc)}
            results.append(res)
            logger.info("[%s] Finished with status: %s", pid, res["status"])

    return results


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    outcomes = run_all(PROFILES, concurrency=MAX_CONCURRENT_PROFILES)

    logger.info("--- Summary ---")
    for outcome in outcomes:
        flag = "OK" if outcome["status"] == "success" else "FAIL"
        logger.info("  %s  %s  %s", flag, outcome["profile"], outcome.get("error", ""))
