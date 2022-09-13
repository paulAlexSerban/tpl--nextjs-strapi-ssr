#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "👀  Watching Strapi DJ Events" 
npm --prefix ../backend/dj-events run develop