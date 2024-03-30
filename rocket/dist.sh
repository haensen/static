#!/bin/bash
cd "$(dirname "$0")"

cd ts && tsc
cd ..

cd ../dist/rocket
mkdir images
cd ../..
cp rocket/images/*.{png,jpg,txt,json} dist/rocket/images/

sass rocket/scss/style.scss dist/rocket/css/style.css --no-source-map

cp rocket/index.html dist/rocket