var express = require('express'),
 	app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
 	port = 8000;


app.use('/app', express.static(__dirname + '/app'));
app.use('/login', express.static(__dirname + '/login'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

io.on('connection', function(socket){
  console.log('a user connected');
});

server.listen(port, function(){
	console.log('Listen on Port ' + port);
});
