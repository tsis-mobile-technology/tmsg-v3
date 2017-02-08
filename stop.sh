#!/bin/sh
#after curl add code .....
ps -ef | grep icr | egrep "npm|node" | grep -v egrep
ps -ef | grep icr | egrep "npm|node" | grep -v egrep | awk '{system("kill -9 " $2)}'
