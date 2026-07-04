# Allstat Search

Allstat Search is a statistics discovery portal for BPS (Badan Pusat Statistik) built for the
Sensus Ekonomi 2026 (SE2026) initiative. It lets users search and browse official publications,
dynamic data tables, and press releases (Berita Resmi Statistik) from a single, unified interface,
and includes an AI-assisted stats advisor.

Loosely modeled on [searchengine.web.bps.go.id](https://searchengine.web.bps.go.id/)'s categorized
search-results experience (result grouping by content type, per-category counts, per-item detail view).

## Tech Stack

- **React 19** + **TypeScript**, built with **Vite**
- **React Router** for client-side routing
- **Tailwind CSS v4** for styling (theme tokens in [src/styles/index.css](src/styles/index.css))
- **react-i18next** for internationalization (English / Bahasa Indonesia)
- **Express** server (`server.ts`) — serves the Vite app and proxies the AI assistant's chat
  endpoint to the Gemini API
- **motion** (Framer Motion) for page/element transitions

## Getting Started

### Prerequisites

- Node.js 18+

### Install dependencies

```bash
npm install
```

### Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable         | Required | Description                                                                                                     |
| ---------------- | :------: | ---------------------------------------------------------------------------------------------------------------- |
| `GEMINI_API_KEY` |    No    | Enables real responses from the AI Stats Assistant. Without it, the assistant falls back to canned demo replies. |
| `APP_URL`        |    No    | Base URL of the deployed app, used for self-referential links.                                                    |

### Run in development

```bash
npm run dev
```

This starts the Express server with Vite in middleware mode (hot reload enabled) at
`http://localhost:3000`.

### Build for production

```bash
npm run build
```

This produces two build outputs:

- `dist/` — the compiled static frontend (from `vite build`)
- `dist/server.cjs` — the bundled Express server (from `esbuild`)

### Run the production build locally

```bash
npm start
```

### Type-check

```bash
npm run lint
```

## Deploying to cPanel

1. Run `npm run build` **locally** — cPanel Node.js apps typically don't have dev tooling
   available, so always ship a pre-built `dist/` folder rather than building on the server.
2. Upload the project (or at minimum `dist/`, `package.json`, and `public/.htaccess`) to your
   cPanel Node.js application directory.
3. In cPanel's "Setup Node.js App" panel, set the startup file to `dist/server.cjs` and configure
   `GEMINI_API_KEY` / `APP_URL` as environment variables through the panel (not via a committed
   `.env` file).
4. Install production dependencies on the server (cPanel's Node.js app manager runs `npm install`
   for you), then start/restart the app.
5. `public/.htaccess` is included for Apache-fronted cPanel setups that need to proxy requests
   through to the Node.js app.

## Folder Structure

```
allstat-search/
├── public/                  # Static assets copied as-is to the build output
│   └── .htaccess            # Apache proxy config for cPanel deployments
├── server.ts                # Express server: serves the app + /api/gemini/generate endpoint
├── index.html                # Vite HTML entry point
├── src/
│   ├── main.tsx              # App bootstrap: mounts React, initializes i18n
│   ├── App.tsx                # Root component: layout shell, routing, global search state
│   ├── components/           # Shared chrome used on every page
│   │   ├── Header.tsx         # Top nav, logo, language-agnostic tour trigger
│   │   └── Footer.tsx         # Footer links, language switcher, disclaimer
│   ├── routes/
│   │   ├── AppRoutes.tsx      # Route table (dashboard, publications, tables, news, search)
│   │   └── paths.ts           # Central path constants (SECTION_PATHS, SEARCH_PATH)
│   ├── features/             # One folder per screen/domain area
│   │   ├── dashboard/          # Landing page: hero search, category cards, core metrics
│   │   ├── search/             # Unified search results page (tabs, result cards, detail view)
│   │   ├── publications/       # Publications index + filter/detail panel
│   │   ├── tables/             # Dynamic data tables + SVG chart visualizer
│   │   ├── news/                # Press releases (BRS) feed + reader panel
│   │   ├── ai-assistant/        # Slide-in AI stats advisor panel
│   │   └── tour/                # Guided onboarding tour overlay
│   ├── services/
│   │   ├── api.ts              # fetch wrapper + auth-header interceptor (drop in a real token later)
│   │   └── mockData.ts         # Mock publications/tables/news data (swap for a real API later)
│   ├── i18n/
│   │   ├── index.ts            # i18next setup — this is where new languages get registered
│   │   └── locales/
│   │       ├── en/common.json  # English translation strings
│   │       └── id/common.json  # Bahasa Indonesia translation strings
│   ├── styles/index.css        # Tailwind import + design-system theme tokens
│   └── types/index.ts          # Shared TypeScript interfaces (Publication, NewsItem, StatTable, ...)
├── .env.example               # Documented environment variable template
└── vite.config.ts             # Vite config (React + Tailwind plugins, @ path alias)
```

## Internationalization (i18n)

The app ships with **English (`en`)** and **Bahasa Indonesia (`id`)**, switchable from the language
button in the footer (persisted to `localStorage`).

### Adding a new language

1. Copy `src/i18n/locales/en/common.json` to `src/i18n/locales/<code>/common.json` and translate
   the values (keep the keys identical).
2. Register it in `src/i18n/index.ts`:
   - add the file to the `resources` map, and
   - add `{ code: "<code>", label: "<Native Name>" }` to `SUPPORTED_LANGUAGES`.
3. That's it — the footer language switcher is driven entirely by `SUPPORTED_LANGUAGES`, so the new
   language appears automatically.

### Using translations in a component

```tsx
import { useTranslation } from "react-i18next";

function Example() {
  const { t } = useTranslation();
  return <h1>{t("dashboard.title")}</h1>;
}
```

Note: the bundled mock dataset (`src/services/mockData.ts`) simulates real BPS content and is
intentionally left in its original mixed Indonesian/English form rather than translated — only the
static UI chrome (nav, labels, buttons, empty states, etc.) is localized.

## Authentication (placeholder)

`src/services/api.ts` reads a bearer token from `localStorage` (`allstat_auth_token`) and attaches
it to every request. There's no real auth flow yet — this is a seam for wiring one in later without
touching call sites.
