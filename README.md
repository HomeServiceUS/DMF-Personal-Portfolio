# DMF-Personal-Portfolio

Personal portfolio for **Dave Freeman — Applied AI Engineer** (The DMF Company).

A single-page, no-build site with a machined/blueprint aesthetic: a three.js node-lattice hero, scroll reveals, a section rail, a full DMF Brain architecture diagram, and a grounded **"Ask my work"** agent. Public systems named: DMF Brain, DMF control plane, DMF sales app, ServiceRelay — with **20+ agents in production**.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | The entire site — HTML, CSS, and JS in one file (no build step). |
| `assets/kb.js` | Grounding record used by the agent's client-side fallback. |
| `netlify/functions/ask.mjs` | Serverless agent endpoint (`/api/ask`) via the Netlify AI Gateway. |
| `favicon.svg` | Brand mark derived from the ServiceRelay / DMF Company logo. |
| `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `og.png` | Rasterized icons + social share image. |
| `netlify.toml`, `site.webmanifest` | Deploy config and PWA manifest. |

## The "Ask my work" agent

The agent answers questions grounded in the portfolio record — the same capture → retrieve → serve pattern as the DMF Brain, shrunk to one page.

- **Live path:** `POST /api/ask` → `netlify/functions/ask.mjs` calls Claude (`claude-haiku-4-5`) through the **Netlify AI Gateway**. No API keys are stored in the repo — Netlify injects them when AI is enabled.
- **Fallback path:** if the function is unavailable (local dev, or before the first production deploy), the client answers from `assets/kb.js` via lightweight retrieval, so the panel always works.

### Enabling the live agent

1. Deploy the site to Netlify.
2. In the Netlify UI, **enable AI** for the site.
3. Deploy to production once more — the AI Gateway only activates after a production deploy.

Until then, the grounded on-page fallback handles every question.

## Local preview

```bash
npx serve .        # or any static server
```

The 3D hero and the agent fallback work from any static host. The live LLM path requires the Netlify deploy + AI Gateway above.

## Editing content

Copy lives directly in `index.html`. If you change the systems/stack copy, mirror it in `assets/kb.js` and the `RECORD` string in `netlify/functions/ask.mjs` so the agent stays grounded.
