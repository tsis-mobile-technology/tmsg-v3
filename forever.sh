#!/bin/sh
if [ "$1" = "start" ];
then
	forever start target/assets/js/server.js
elif [ "$1" = "stop" ];
then
	forever stop target/assets/js/server.js
elif [ "$1" = "restart" ];
then
	forever restart target/assets/js/server.js
elif [ "$1" = "status" ];
then
	forever restart target/assets/js/server.js
else
	echo "sh forever.sh start|stop|restart|status"
fi
