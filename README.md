# Cookbook

A robot pal for recipes

## Setup

This project requires:

1. [the correct version](.nvmrc) of [nodejs](https://nodejs.org/en/download)
1. [pnpm](https://pnpm.io/installation)
1. [ollama](https://ollama.com/)
1. [sqlite](https://sqlite.org/download.html)
1. [docker](https://www.docker.com/)

```
ollama pull mistral

pnpm i
pnpm prisma:generate
pnpm prisma:migrate
pnpm db:seed # optional
```

## Development

```
docker compose up -d
pnpm dev
```

### Design System

#### Components

We're using [`daisyUI`](https://daisyui.com/components/).

#### Icons

For iconography, we're using [`@heroicons/react`](https://github.com/tailwindlabs/heroicons?tab=readme-ov-file#react). See the full list of icons [here](https://heroicons.com/) and their exported components [here](https://unpkg.com/browse/@heroicons/react/24/outline/). You should import from the `@heroicons/react/24/outline` package:

```tsx
import { GlobeAltIcon } from "@heroicons/react/24/outline";

...

<GlobeAltIcon className="size-4" />
```

### Authentication

After signing in with any email address, visit http://localhost:8025 to retrieve the magic link email.

### Cursor

#### daisyUI MCP

Example prompt: `give me a light daisyUI 5 theme with tropical color palette. use context7` (the suffix is required)
