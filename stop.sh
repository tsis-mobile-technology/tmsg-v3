#!/bin/sh
#after curl add code .....
ps -U $USER -ef | egrep "npm|node " | grep -v egrep
ps -U $USER -ef | egrep "npm|node " | grep -v egrep | awk '{system("kill -9 " $2)}'
