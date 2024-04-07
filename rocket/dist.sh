#!/bin/bash
cd "$(dirname "$0")"

npm install
npm run build
mkdir ../dist/rocket
cp -r ./dist/* ../dist/rocket
