#!/usr/bin/env python3
"""Dependency-free secret and card-number scan.

A self-contained guard for the standing rule that credentials never enter the repo. It
deliberately uses no third-party action and no network: it scans tracked text files for a
small set of HIGH-PRECISION provider key patterns and for Luhn-valid card numbers, chosen
so it does not false-positive on prose that merely mentions tokens, keys, or payments.

Place at <repo>/scripts/secret_scan.py and call it from the check-all entry point. It
scans the files given as arguments, or, with none, every Git-tracked file. Binary files
and this script are skipped. Exit status 1 on any hit, so CI and the pre-commit hook gate
on it.

Extend PATTERNS for a provider this repo actually uses; keep each pattern specific enough
that it cannot match ordinary prose (see references/secret-scan.md in the skill).
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve()
ROOT = HERE.parent.parent

# High-precision provider secret patterns. Each is specific enough not to match prose.
PATTERNS = {
    "AWS access key id": re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    "private key block": re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----"),
    "Stripe secret key": re.compile(r"\b[rs]k_live_[0-9a-zA-Z]{20,}\b"),
    "GitHub token": re.compile(r"\b(?:ghp|gho|ghu|ghs|ghr)_[0-9A-Za-z]{36}\b|\bgithub_pat_[0-9A-Za-z_]{40,}\b"),
    "Slack token": re.compile(r"\bxox[baprs]-[0-9A-Za-z-]{10,}\b"),
    "Google API key": re.compile(r"\bAIza[0-9A-Za-z_\-]{35}\b"),
    "SendGrid key": re.compile(r"\bSG\.[0-9A-Za-z_\-]{16,}\.[0-9A-Za-z_\-]{16,}\b"),
    "Twilio account sid": re.compile(r"\bAC[0-9a-fA-F]{32}\b"),
    "OpenAI key": re.compile(r"\bsk-(?:proj-)?[0-9A-Za-z_\-]{32,}\b"),
    "Anthropic key": re.compile(r"\bsk-ant-[0-9A-Za-z_\-]{24,}\b"),
    "Supabase service key (JWT)": re.compile(r"\beyJ[0-9A-Za-z_\-]{10,}\.eyJ[0-9A-Za-z_\-]{10,}\.[0-9A-Za-z_\-]{10,}\b"),
    "generic bearer secret": re.compile(r"(?i)(?:api[_-]?key|client[_-]?secret|access[_-]?token)\"?\s*[:=]\s*\"[0-9A-Za-z_\-]{24,}\""),
}

CARD_RE = re.compile(r"\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b")


def luhn_ok(number: str) -> bool:
    digits = [int(c) for c in number]
    checksum, parity = 0, len(digits) % 2
    for i, d in enumerate(digits):
        if i % 2 == parity:
            d *= 2
            if d > 9:
                d -= 9
        checksum += d
    return checksum % 10 == 0


def tracked_files() -> list[Path]:
    out = subprocess.run(
        ["git", "-C", str(ROOT), "ls-files"], capture_output=True, text=True, check=True
    ).stdout.splitlines()
    return [ROOT / f for f in out if f.strip()]


def main(argv: list[str]) -> int:
    files = [Path(a) for a in argv[1:]] or tracked_files()
    hits: list[str] = []
    for f in files:
        if not f.is_file() or f.resolve() == HERE:
            continue
        try:
            text = f.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue  # binary or unreadable: skip
        rel = f.relative_to(ROOT) if f.is_absolute() and str(f).startswith(str(ROOT)) else f
        for line_no, line in enumerate(text.splitlines(), 1):
            for label, rx in PATTERNS.items():
                if rx.search(line):
                    hits.append(f"{rel}:{line_no}: possible {label}")
            for m in CARD_RE.finditer(line):
                if luhn_ok(m.group()):
                    hits.append(f"{rel}:{line_no}: possible card number (Luhn-valid)")

    if hits:
        print("secret_scan: FAIL")
        for h in hits:
            print("  -", h)
        print("\nCredentials and card numbers must never be committed. Remove the value,")
        print("rotate it if it was ever real, and keep secrets in the environment.")
        return 1
    print(f"secret_scan: ok ({len(files)} files scanned, no secrets or card numbers)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
