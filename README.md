# Cookbook

A recipe extraction tool that uses local AI (Ollama) to pull recipes from web pages and turn them into structured, clean Markdown.

Add a URL → fetch the page HTML → process it → extract the recipe → save it.

## Tech Stack

| Area              | Tool                                                                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework         | [Next.js](https://nextjs.org/) 15 (App Router, Turbopack)                                                                                     |
| Auth              | [NextAuth.js](https://authjs.dev/) v5 beta — magic-link email via Nodemailer                                                                  |
| Database          | [SQLite](https://sqlite.org/) via [Prisma](https://prisma.io/)                                                                                |
| AI / LLM          | [Ollama](https://ollama.com/) (local inference)                                                                                               |
| UI                | [daisyUI](https://daisyui.com/) 5 + [Tailwind CSS](https://tailwindcss.com/) v4 + [`@heroicons/react`](https://heroicons.com/)                |
| Forms / Actions   | [next-safe-action](https://next-safe-action.dev/) + [zod](https://zod.dev/) + [zod-form-data](https://github.com/StefanTerdell/zod-form-data) |
| Data Fetching     | [SWR](https://swr.vercel.app/)                                                                                                                |
| Styling Utilities | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)                                          |
| HTML Processing   | [sanitize-html](https://github.com/apostrophecms/sanitize-html) + [isomorphic-dompurify](https://github.com/kkomelin/isomorphic-dompurify)    |
| Markdown          | [marked](https://marked.js.org/)                                                                                                              |
| Package Manager   | [pnpm](https://pnpm.io/)                                                                                                                      |
| CI                | GitHub Actions (format check, peer-dep check, build)                                                                                          |

## Prerequisites

- **Node.js** 24.x (version specified in [`.tool-versions`](.tool-versions); if you use [asdf](https://asdf-vm.com/), run `asdf install`)
- **pnpm** ([install guide](https://pnpm.io/installation))
- **Ollama** ([install guide](https://ollama.com/)) — used for local LLM inference
- **Docker** — used only for the local dev mail server

## Setup

### 1. Install dependencies & pull the model

```sh
pnpm i
ollama pull mistral
```

### 2. Configure environment variables

Copy the template and fill in your local values:

```sh
cp .env .env.local
```

Then edit `.env.local`. The template `.env` contains sensible dev defaults for the mail server (smtp4dev), so the only value you _must_ change is `AUTH_SECRET`:

```sh
# Generate a proper secret:
pnpm dlx auth secret
```

| Variable                | Purpose                   | Dev default           |
| ----------------------- | ------------------------- | --------------------- |
| `DATABASE_URL`          | SQLite database file path | `file:./dev.db`       |
| `OLLAMA_MODEL`          | Ollama model name         | `mistral`             |
| `AUTH_SECRET`           | NextAuth encryption key   | — **must generate** — |
| `EMAIL_SERVER_HOST`     | SMTP host                 | `localhost`           |
| `EMAIL_SERVER_PORT`     | SMTP port                 | `1025`                |
| `EMAIL_SERVER_USER`     | SMTP username             | `username`            |
| `EMAIL_SERVER_PASSWORD` | SMTP password             | `password`            |
| `EMAIL_FROM`            | Sender address            | `noreply@example.com` |

> [!NOTE]
> The `EMAIL_SERVER_*` values match the smtp4dev container defined in `docker-compose.yml`. Don't change them unless you also update the container config.

### 3. Initialize the database

```sh
pnpm prisma:generate
pnpm prisma:migrate
```

Optional — seed with sample data:

```sh
pnpm db:seed
```

To wipe and re-seed:

```sh
pnpm db:drop
pnpm db:seed
```

### 4. Start the dev mail server

```sh
docker compose up -d
```

This launches [smtp4dev](https://github.com/rnwood/smtp4dev) — a local SMTP server with a web UI for viewing emails sent during development.

## Development

```sh
pnpm dev
```

Opens the Next.js dev server with Turbopack on http://localhost:3000.

### Authentication

Cookbook uses **NextAuth.js v5** with the **Nodemailer** provider (magic-link email sign-in). There are no passwords — users enter their email, receive a sign-in link, and click it.

**How it works locally:**

1. On any page, click **Sign In** (or navigate to `/api/auth/signin`).
2. Enter any email address.
3. Open the smtp4dev web UI at **http://localhost:8025**.
4. Find the sign-in email and click the magic link.

**Middleware protection:** All routes except `/`, `/api/auth/signin`, and `/api/auth/callback/nodemailer` require authentication. Unauthenticated visitors are redirected to the sign-in page.

**Session strategy:** JWT-based (not database sessions), with the user's database ID attached to the session via a callback in `src/lib/auth.ts`.

**User creation:** Users are automatically created on first sign-in via `findOrCreateUserByEmail` in the auth session callback.

### App Workflow

Each "Source" goes through a **5-step pipeline**:

1. **Add URL** — provide a web page URL
2. **Fetch HTML** — the server fetches the full HTML from that URL
3. **Process HTML** — strips navigation, footers, scripts, etc. and isolates recipe-like content
4. **Extract Recipe** — sends processed HTML to Ollama, which returns structured Markdown
5. **Create Recipe** — Ollama parses the extracted Markdown into a named recipe object and saves it

Steps 4 and 5 call Ollama's local generate endpoint with custom system prompts (see `src/lib/helpers/prompts.ts`). Each step can be re-run independently.

### Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/                    # NextAuth routes
│   │   └── sources/[sourceId]/
│   │       ├── html/                # Fetch raw HTML from source URL
│   │       ├── html/extract-recipe/ # Extract recipe via Ollama
│   │       └── create-recipe/       # Create recipe via Ollama
│   ├── recipes/                     # Recipe pages & forms
│   ├── sources/                     # Source pages, forms, modals
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ...
├── lib/
│   ├── actions/                     # next-safe-action server actions
│   │   ├── auth.ts                  # signIn / signOut actions
│   │   ├── sources.ts               # CRUD actions for sources
│   │   └── recipes.ts               # CRUD actions for recipes
│   ├── db/                          # Prisma query helpers
│   │   ├── users.ts
│   │   ├── sources.ts
│   │   ├── recipes.ts
│   │   └── seed/                    # Seed script & fixtures
│   ├── helpers/
│   │   ├── html.ts                  # HTML processing (sanitize, condense)
│   │   ├── markdown.ts              # Markdown → HTML rendering
│   │   ├── prompts.ts               # Ollama system prompts
│   │   ├── source.ts                # Source progress calculation
│   │   └── index.ts                 # cn() utility
│   ├── hooks/                       # SWR hooks for API calls
│   ├── auth.ts                      # NextAuth config
│   ├── prisma.ts                    # Prisma client singleton
│   ├── safe-action.ts               # Safe-action client (with auth middleware)
│   ├── fetcher.ts                   # SWR fetcher
│   └── ...
├── auth.config.ts                   # Edge-compatible auth config
├── middleware.ts                     # Route protection
└── types.ts                         # Shared types
```

### Scripts

| Script                 | What it does                              |
| ---------------------- | ----------------------------------------- |
| `pnpm dev`             | Start Next.js dev server (Turbopack)      |
| `pnpm build`           | Generate Prisma client + production build |
| `pnpm start`           | Start production server                   |
| `pnpm tsc`             | Type-check (includes Prisma generation)   |
| `pnpm lint:check`      | ESLint check                              |
| `pnpm lint:fix`        | ESLint auto-fix                           |
| `pnpm format:check`    | Prettier check                            |
| `pnpm format:fix`      | Prettier auto-fix                         |
| `pnpm prisma:generate` | Generate Prisma client                    |
| `pnpm prisma:migrate`  | Run database migrations                   |
| `pnpm prisma:studio`   | Open Prisma Studio GUI                    |
| `pnpm db:seed`         | Seed the database with sample data        |
| `pnpm db:drop`         | Reset the database                        |
| `pnpm check:peer-deps` | Check for peer dependency warnings        |

### Database

SQLite, managed by Prisma. The schema lives in `prisma/schema.prisma` and defines four main models:

- **User** — identity, linked to accounts, sessions, sources, and recipes
- **Source** — a URL with progressively filled fields: `fullHtml` → `processedHtml` → `extractedRecipe`
- **Recipe** — a name + Markdown content, always linked to a source
- **Account / Session / VerificationToken** — NextAuth internal models

Run `pnpm prisma:studio` to browse data in a GUI.

### Design System

#### Components

We're using [`daisyUI`](https://daisyui.com/components/) with the **dracula** theme (configured in `src/app/globals.css`).

#### Icons

For iconography, we're using [`@heroicons/react`](https://github.com/tailwindlabs/heroicons?tab=readme-ov-file#react). See the full list of icons [here](https://heroicons.com/) and their exported components [here](https://unpkg.com/browse/@heroicons/react/24/solid/). You should import from the `@heroicons/react/24/solid` package:

```tsx
import { GlobeAltIcon } from "@heroicons/react/24/solid";

...

<GlobeAltIcon className="size-4" />
```

### Cursor

#### daisyUI MCP

Example prompt: `give me a light daisyUI 5 theme with tropical color palette. use context7` (the suffix is required)
