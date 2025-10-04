#!/usr/bin/env bash
# Script to build the project

# Disable linting in CI
if [ -z "$CI" ]; then
  pnpm build --no-lint
else
  pnpm build
fi
