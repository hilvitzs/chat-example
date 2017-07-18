const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/',  (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

let clients = {}

io.on('connection', (socket) => {
  socket.broadcast.emit('login', 'a user connected');
  socket.broadcast.emit('users', `${io.engine.clients}`)

  socket.on('disconnect', () => {
    socket.broadcast.emit('logout', 'user disconnected');
    socket.broadcast.emit('user count', `${io.engine.clientsCount}`);
  });

  socket.on('chat message', (msg, name, id) => {
    io.emit('chat message', msg, name, id);
    clients[name] = id;
    let clientKeys = Object.keys(clients);
    io.emit('users online', clients);
    console.log(clients);
  
  });

  io.emit('user count', `${io.engine.clientsCount}`);
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
