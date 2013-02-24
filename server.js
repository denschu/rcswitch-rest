/**
 * Module dependencies.
 */
var express = require('express'),
  api = require('./routes/api');
var app = express();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

// JSON API
app.get('/switches', api.switches);
app.get('/switches/:id', api.switch);
app.post('/switches', api.addSwitch);
app.put('/switches/:id', api.editSwitch);
app.delete('/switches/:id', api.deleteSwitch);

// Start server
app.listen(8080);
console.log("Server running at http://127.0.0.1:8080/");