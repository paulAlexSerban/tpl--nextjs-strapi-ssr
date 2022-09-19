#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

cp -rfv ../backend/database/data.db ../backend/dj-events/.tmp/data.db