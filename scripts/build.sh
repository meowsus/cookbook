#!/usr/bin/env bash
# Script to build the project

pnpm prisma:generate
pnpm next build

