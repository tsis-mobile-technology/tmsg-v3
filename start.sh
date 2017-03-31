#!/bin/sh
rm -Rf ../npm.stdout;
rm -Rf ../npm.stderr;
nohup npm start > ../npm.stdout 2> ../npm.stderr &
