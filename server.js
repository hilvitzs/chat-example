var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){
  console.log(Object.keys(io.engine.clients));
  socket.broadcast.emit('login', 'a user connected');
  socket.broadcast.emit('users', `${io.engine.clients}`)

  socket.on('disconnect', function(){
    socket.broadcast.emit('logout', 'user disconnected');
    socket.broadcast.emit('user count', `${io.engine.clientsCount}`);
  });

  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('someone is typing', function(){
    io.emit('someone is typing')
  })



  io.sockets.emit('user count', `${io.engine.clientsCount}`);
});







http.listen(3000, function(){
  console.log('listening on *:3000');
});
