#!/usr/bin/env python3
"""Config validity gate: every JSON and TOML config file in the repo parses.

Cheap, deterministic, stdlib-only. Catches an unparseable edit to a config file before it
reaches a deploy (a broken netlify.toml or site.webmanifest fails silently otherwise).
Exit status 1 on any parse error.
"""
from __future__ import annotations

import json
import sys
import tomllib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

JSON_FILES = ["package.json", "package-lock.json", "site.webmanifest"]
TOML_FILES = ["netlify.toml"]


def main() -> int:
    problems = []
    checked = 0
    for name in JSON_FILES:
        p = ROOT / name
        if not p.exists():
            continue
        checked += 1
        try:
            json.loads(p.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError) as e:
            problems.append(f"{name}: invalid JSON ({e})")
    for name in TOML_FILES:
        p = ROOT / name
        if not p.exists():
            continue
        checked += 1
        try:
            with p.open("rb") as fh:
                tomllib.load(fh)
        except (tomllib.TOMLDecodeError, OSError) as e:
            problems.append(f"{name}: invalid TOML ({e})")

    if problems:
        print("validate_config: FAIL")
        for pb in problems:
            print("  -", pb)
        return 1
    print(f"validate_config: ok ({checked} config files parse)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
