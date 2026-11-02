#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
{ cat src/head.html src/engine.js src/rooms.js src/ui.js src/tail.html; } > index.html
echo "built $(pwd)/index.html ($(wc -c < index.html) bytes)"
