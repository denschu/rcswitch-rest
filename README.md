rcswitch-rest
=============

#RESTful API for the rcswitch library based on node.js/express

##Add a new switch to the configuration
	curl -i -X POST -H 'Content-Type: application/json' -d '{"id": "0", "url": "/switches/0", "name": "Lamp 1", "script": "sudo /home/pi/rcswitch-pi/sendRev", "command": "B 1", "status": "0"}' http://rasperrypi:8080/switches

##Get the list of active switches
	curl -i -X GET http://rasperrypi:8080/switches

##Turn switch on
	curl -i -X PUT -H 'Content-Type: application/json' -d '{"status": "1"}' http://rasperrypi:8080/switches/0

##Turn switch off
	curl -i -X PUT -H 'Content-Type: application/json' -d '{"status": "0"}' http://rasperrypi:8080/switches/0

##Remove switch configuration
	curl -i -X DELETE http://rasperrypi:8080/switches/0