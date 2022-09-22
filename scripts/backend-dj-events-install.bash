#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🛑  Cleaning Backend DJ Events node_modules"
rm -rfv ../backend/dj-events/node_modules

echo "🔧  Installing Backend DJ Events"
npm --prefix ../backend/dj-events install
