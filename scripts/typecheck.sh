#!/usr/bin/env bash
# Script to typecheck the project

pnpm prisma:generate
pnpm tsc
