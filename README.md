# DMF-Personal-Portfolio

A modern, responsive personal portfolio site built with **React**, **TypeScript**, and **Vite**, ready to deploy on **Netlify**.

## Features

- Single-page portfolio with Hero, About, Projects, Experience, and Contact sections
- Animated gradient background, scroll-reveal transitions, and a responsive mobile nav
- Accessible contact form with client-side validation (wired for Netlify Forms in production)
- Fully typed with strict TypeScript and linted with ESLint

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server (port 5173) |
| `npm run build` | Type-check and build the production bundle to `dist/` |
| `npm run preview` | Preview the production build (port 4173) |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting |

## Deployment

The site deploys to Netlify. `netlify.toml` sets the build command (`npm run build`),
the publish directory (`dist`), and an SPA redirect. Editing site content is as simple
as updating `src/data.ts`.

## Cloud Agent environment

`.cursor/environment.json` configures the Cursor Cloud Agent environment:
`npm ci` installs dependencies and a `dev` terminal runs the Vite dev server on port 5173.
