# AGENTS.md — working contract for this repo

Read by Claude Code, Codex, Cursor, Copilot, and others. Keep it short and exact.

## What this is

Dave Freeman's personal portfolio: a static single-page site (`index.html`, `resume.html`,
`assets/`) plus two Netlify serverless functions in `netlify/functions/` — `ask.mjs` (the
"Ask my work" agent) and `event.mjs`. Deployed on Netlify (`netlify.toml`, publish = repo
root). No bundler or build step; the HTML is served as-is.

## Commands

| Task | Command |
|---|---|
| **Run all gates** | `npm run check:all` (alias for `./check_all.sh`) |
| Local dev (site + functions) | `npx netlify dev` |
| Record the brain demo | `npm run record:brain` |
| e2e (needs a running server) | `BASE_URL=<url> npm run test:e2e` |

## Conventions

- It's a static site — keep pages self-contained and dependency-light; no build step to
  hide behind.
- Netlify functions are ESM (`.mjs`); read secrets from the environment, never inline.
- `assets/kb.js` is the fallback grounding record for the agent and is served
  `must-revalidate` — keep it in step with the HTML when you change site content.

## Protected / not hand-edited

- `resume.pdf`, `og.png`, and anything under `demos/` are produced artifacts (the demo is
  recorded via `npm run record:brain`). Regenerate them from their source rather than
  editing by hand.

## Definition of Done

A change is finished when **`npm run check:all` is green**, and, for anything user-facing,
you've looked at it in `netlify dev`. Don't report a task done on a red or unrun gate.

## The gates (and what's deliberately not gated)

`check:all` runs three deterministic checks: `node --check` on every `.mjs` (a broken
function can't ship), config validity (every JSON/TOML parses), and a dependency-free
secret/card-number scan. **Not** gated: the Playwright e2e suite (it needs a running server
and the live "ask" backend, so it's run manually, not on every commit) and any
formatter/linter (the repo doesn't use one; the harness gates, it doesn't re-opinionate the
code).
