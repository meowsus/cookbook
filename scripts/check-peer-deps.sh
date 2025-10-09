#!/bin/bash

# Run pnpm install with resolution-only flag and capture output
output=$(pnpm i --resolution-only --no-frozen-lockfile 2>&1)

# Print the output so it's visible
echo "$output"

# Check if "WARN" appears in the output
if echo "$output" | grep -q "WARN"; then
    echo "Warning detected in pnpm output. Exiting with code 1."
    exit 1
fi

echo "No warnings detected. Success!"
exit 0
