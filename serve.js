var express = require('express'),
 	app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
 	port = 8000;


app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

io.on('connection', function(socket){
  console.log('a user connected');
});

server.listen(port, function(){
	console.log('Listen on Port ' + port);
});
