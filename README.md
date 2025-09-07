# Cookbook

A robot pal for recipes

## Setup

This project requires:

1. [the correct version](.nvmrc) of [nodejs](https://nodejs.org/en/download)
1. [pnpm](https://pnpm.io/installation)
1. [ollama](https://ollama.com/)
1. [sqlite](https://sqlite.org/download.html)

```
ollama pull mistral
pnpm i
pnpm prisma:generate
pnpm prisma:migrate
pnpm db:seed # optional
```

## Development

```
pnpm dev
```

## Notes

- `mistral` has been the model most battle-tested, since it runs on my machine fairly well in CPU mode
- LLM generation can take a very long time in CPU mode, timeouts may occur
- I am using ollama because it is free
