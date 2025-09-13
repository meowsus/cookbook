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

### Authentication

After signing in with any email address, visit http://localhost:8025 to retrieve the magic link email.
