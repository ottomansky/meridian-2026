#!/usr/bin/env bash
set -Eeuo pipefail

# Next.js standalone bundle is pre-built and committed under .next/standalone.
# Its minimal node_modules trace ships in the repo, so there is nothing to
# install at container start. Building during setup.sh is forbidden by the
# Keboola contract and would also be far slower than the deploy timeout.

echo "[meridian] standalone bundle ready · server.js entrypoint"
ls -1 /app/.next/standalone | head -10
