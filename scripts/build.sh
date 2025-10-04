#!/usr/bin/env bash
# Script to build the project

# Disable linting in CI
if [ -n "$CI" ]; then
  pnpm next build --no-lint
else
  pnpm next build
fi
