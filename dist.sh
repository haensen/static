#!/bin/bash
cd "$(dirname "$0")"
mkdir dist
chmod +x ./*/dist.sh
./*/dist.sh
cp index.html dist
cp -r images dist
cp -r css-tricks dist
