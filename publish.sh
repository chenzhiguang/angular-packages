#!/usr/bin/env bash

if [[ -z "$1" ]]; then
  echo "No project is specified"
  exit
fi

ng build $1 --prod
DIST=./dist/${1#@}
cp ../npmrc $DIST/.npmrc
cd $DIST
npm publish --access=public
