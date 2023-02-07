#!/usr/bin/env bash

set -e

cd /app

npm install

npm install react-scripts@3.4.1 -g

npm run build

exit 0
