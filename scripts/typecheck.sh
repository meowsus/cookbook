#!/usr/bin/env bash
# Script to typecheck the project

# Generate the Prisma client if not in CI
if [ -z "$CI" ]; then
  pnpm prisma:generate
fi

# Run type checking
pnpm tsc
