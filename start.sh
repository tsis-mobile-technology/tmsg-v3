#!/bin/sh
rm -Rf ../npm.stdout
rm -Rf ../npm.stderr
npm start >> ../npm.stdout 2 >> ../npm.stderr &
