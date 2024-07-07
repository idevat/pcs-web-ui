#!/bin/sh
node_modules=$1

if [ -d "$node_modules" ]; then
  echo "Backuping node modules"
  mv "$node_modules" "$node_modules".backup
fi
echo "*==================: ${NODE_PATH}"
npm --prefix="$NODE_PATH" ci
