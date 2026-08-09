# DMF-Personal-Portfolio

Personal portfolio for **Dave Freeman — Applied AI Engineer** (The DMF Company).

A single-page, no-build site with a machined/blueprint aesthetic: a three.js node-lattice hero, scroll reveals, a section rail, a full DMF Brain architecture diagram, and a grounded **"Ask my work"** agent. Public systems named: DMF Brain, DMF control plane, DMF sales app, ServiceRelay — with **20+ agents in production**.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Main portfolio — HTML, CSS, and JS in one file (no build step). |
| `demos/brain/` | Interactive Brain mini-site: capture → human gate → knowledge graph unlocks. |
| `demos/brain/fixtures.js` | Anonymized Ridgeway Field Services fixtures for the Brain demo. |
| `assets/kb.js` | Grounding record used by the agent's client-side fallback. |
| `assets/track.js` | Soft analytics helper (Plausible if present + `/api/event` beacon). |
| `netlify/functions/ask.mjs` | Serverless agent endpoint (`/api/ask`) via the Netlify AI Gateway. |
| `netlify/functions/event.mjs` | Soft analytics sink (`/api/event`) — structured logs in Netlify. |
| `favicon.svg` | Brand mark derived from the ServiceRelay / DMF Company logo. |
| `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `og.png` | Rasterized icons + social share image. |
| `netlify.toml`, `site.webmanifest` | Deploy config and PWA manifest. |
| `tests/brain-demo.spec.js` | Thin Playwright smoke for the Brain inject → promote → unlock path. |

## The "Ask my work" agent

The agent answers questions grounded in the portfolio record — the same capture → retrieve → serve pattern as the DMF Brain, shrunk to one page.

- **Live path:** `POST /api/ask` → `netlify/functions/ask.mjs` calls Claude (`claude-haiku-4-5`) through the **Netlify AI Gateway**. No API keys are stored in the repo — Netlify injects them when AI is enabled.
- **Fallback path:** if the function is unavailable (local dev, or before the first production deploy), the client answers from `assets/kb.js` via lightweight retrieval, so the panel always works.

### Enabling the live agent

1. Deploy the site to Netlify.
2. In the Netlify UI, **enable AI** for the site.
3. Deploy to production once more — the AI Gateway only activates after a production deploy.

Until then, the grounded on-page fallback handles every question.

**Status:** production `https://dmf-personal-portfolio.netlify.app/api/ask` returns `source: "DMF Brain (live)"` when AI Gateway is active.

## Brain mini-site

Open `/demos/brain/` (linked from Models). Synthetic end-to-end story: inject agent/email/SMS artifacts, decide at the human gate, promote into the graph, and surface watcher unlocks. Control-plane governance is shown as gate + unlocks — not a separate console.

## Soft analytics

`assets/track.js` emits:

| Event | When |
| --- | --- |
| `brain_demo_open` | Models CTA click into the mini-site |
| `brain_demo_view` | Brain mini-site load |
| `ask_submit` | Ask-my-work answer (props: `via=live\|fallback`) |

Events beacon to `/api/event` (Netlify function logs). If you add [Plausible](https://plausible.io) (or a compatible `window.plausible`), the same names fire there automatically — no second instrumentation pass.

## Local preview

```bash
npx serve .        # or any static server
```

The 3D hero and the agent fallback work from any static host. The live LLM path requires the Netlify deploy + AI Gateway above.

## Tests & recording

```bash
npm install
npx playwright install chromium
npm run test:e2e:brain          # local static server via Playwright webServer
BASE_URL=https://dmf-personal-portfolio.netlify.app npm run test:e2e:brain
npm run record:brain            # writes mp4 + gif under /opt/cursor/artifacts
```

## Editing content

Copy lives directly in `index.html`. If you change the systems/stack copy, mirror it in `assets/kb.js` and the `RECORD` string in `netlify/functions/ask.mjs` so the agent stays grounded.
