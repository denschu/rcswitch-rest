//execute commands
var util = require('util')
var exec = require('child_process').exec;

var data = [
    {
      "id": "0", "url": "/switches/0", "name": "Lamp 1", "script": "sudo /home/pi/rcswitch-pi/sendRev", "command": "B 1", "status": "0"
    },
    {
      "id": "1", "url": "/switches/1", "name": "Lamp 2", "script": "sudo /home/pi/rcswitch-pi/sendRev", "command": "B 2", "status": "0"
    },
    {
      "id": "2", "url": "/switches/2", "name": "Lamp 3", "script": "sudo /home/pi/rcswitch-pi/sendRev", "command": "B 3", "status": "0"
    }   
  ];

// GET
exports.switches = function (req, res) {
  console.log('Getting switches.');
  var switches = [];
  res.json(data);
};

exports.switch = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.length) {
    res.json(data[id]);
  } else {
    res.json(404);
  }
};

// POST
exports.addSwitch = function (req, res) {
  var newSwitch = req.body;
  newSwitch.id=data.length;
  newSwitch.url="/switches/"+newSwitch.id;
  newSwitch.status="0";
  console.log('Adding switch: ' + JSON.stringify(newSwitch));
  data.push(newSwitch);
  res.send(201);
};

// PUT
exports.editSwitch = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id <= data.length) {
    console.log('Switch Status of switch with id: ' + id + " to " + req.body.status);
    var script = data[id].script;
    var command = data[id].command;
    switchStatus(script,command,req.body.status);
    data[id].status = req.body.status;
    res.send(200);
  } else {
    res.json(404);
  }
};

// DELETE
exports.deleteSwitch = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.length) {
    console.log('Delete switch with id: ' + id);
    data.splice(id, 1);
    res.send(200);
  } else {
    res.json(404);
  }
};


function switchStatus(script, command, status){
    var execString = script + " " + command + " " + status;
    console.log("Executing: " + execString);
    exec(execString, puts);
}

function puts(error, stdout, stderr) { 
        util.puts(stdout); 
        console.warn("Executing Done");
}