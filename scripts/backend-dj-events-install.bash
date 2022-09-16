#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "🛑  Cleaning Backend DJ Events node_modules"
rm -rfv ../bakcend/dj-events/node_modules

echo "🔧  Installing Backend DJ Events"
npm --prefix ../bakcend/dj-events install
