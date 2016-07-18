#!/bin/bash

if [ $EUID -eq 0 ]
then
  echo "Do not run this script as root !"
  echo ""
  echo "You should fix your npm permission instead to avoid root execution"
  echo "See : https://docs.npmjs.com/getting-started/fixing-npm-permissions"
  exit 1
fi

cd protocol
npm link

cd ../client
npm link ares-protocol

cd ../server
npm link ares-protocol
