#!/usr/bin/env bash
# Script to add shadcn components and auto-format

# Run shadcn add with all passed arguments
pnpm dlx shadcn@latest add "$@"

# If shadcn add was successful, format the components
if [ $? -eq 0 ]; then
  pnpm dlx prettier --write src/components/ui
fi
