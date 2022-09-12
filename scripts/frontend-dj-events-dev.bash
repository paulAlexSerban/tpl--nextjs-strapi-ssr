#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "👀  Watching Next.js DJ Events" 
npm --prefix ../frontend/dj-events run dev