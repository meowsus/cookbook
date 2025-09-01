# Cookbook

A robot pal for recipes

## Setup

This project requires:

1. [pnpm](https://pnpm.io/installation)
2. [ollama](https://ollama.com/)
3. [sqlite](https://sqlite.org/download.html)

```
pnpm i
ollama pull mistral
```

## Development

```
pnpm dev
```

## Notes

- `mistral` has been the model most battle-tested, since it runs on my machine fairly well in CPU mode
- LLM generation can take a very long time in CPU mode, timeouts may occur
- I am using ollama because it is free
