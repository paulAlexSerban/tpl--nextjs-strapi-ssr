#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🛑  Cleaning Frontend DJ Events node_modules"
rm -rfv ../frontend/dj-events/node_modules

echo "🔧  Installing Frontend DJ Events"
npm --prefix ../frontend/dj-events install
