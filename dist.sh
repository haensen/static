#!/bin/bash
cd "$(dirname "$0")"
chmod +x ./*/dist.sh
./*/dist.sh
cp index.html dist
