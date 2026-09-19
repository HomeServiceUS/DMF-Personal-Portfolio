#!/usr/bin/env bash
# check_all.sh — the single gate entry point. CI and the pre-commit hook both run this, so
# local and CI never diverge. `npm run check:all` is an alias for it.
#
# Gates, chosen for what this repo actually is (a static site + two Netlify functions,
# no build/typecheck/bundler):
#   1. JS syntax — node --check every .mjs (functions + scripts) so a broken function
#      can't ship to Netlify.
#   2. config validity — every JSON/TOML config parses (scripts/validate_config.py).
#   3. secrets — no committed credentials or card numbers (scripts/secret_scan.py).
#
# Deliberately not here: the Playwright e2e suite (needs a running server and the live
# "ask" backend, so it stays a separate, manually-run check — see AGENTS.md), and a
# formatter/linter (the repo doesn't use one; this harness gates, it doesn't re-opinionate).
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"

declare -a RESULTS
failed=0
run() { # label, command...
  local label="$1"; shift
  printf '\n=== %s ===\n' "$label"
  if "$@"; then RESULTS+=("PASS  $label"); else RESULTS+=("FAIL  $label"); failed=1; fi
}

# 1. JS syntax on every tracked .mjs
printf '\n=== js syntax (node --check) ===\n'
js_ok=0
while IFS= read -r f; do
  if node --check "$f"; then echo "ok: $f"; else echo "FAIL: $f"; js_ok=1; fi
done < <(git ls-files '*.mjs')
if [ "$js_ok" -eq 0 ]; then RESULTS+=("PASS  js syntax"); else RESULTS+=("FAIL  js syntax"); failed=1; fi

# 2. config validity
run "config validity" python3 scripts/validate_config.py

# 3. secrets
run "secrets" python3 scripts/secret_scan.py

printf '\n%s\n' "============================================================"
for r in "${RESULTS[@]}"; do printf '  %s\n' "$r"; done
if [ "$failed" -ne 0 ]; then printf '\ncheck_all: FAIL\n'; exit 1; fi
printf '\ncheck_all: ok (%d gates green)\n' "${#RESULTS[@]}"
