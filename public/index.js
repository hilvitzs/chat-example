const socket = io();

     $('form').submit((event) => {
       event.preventDefault();
       socket.emit('chat message', $('#m').val(), $('#name').val(), socket.id);
      //  socket.emit('loginUser', $('#name').val())
       $('#m').val('');
       return false;
     });



    //  $('form').on('keydown', () => {
    //    socket.broadcast.emit('user is typing');
    //  });

     socket.on('chat message', (msg, name) => {
       $('#messages').append($('<li>').text(`${name}: ${msg}`));
     });

     socket.on('login', (msg) => {
       $('#login-users').append($('<li>').text(msg));
     });

     socket.on('logout', (msg) => {
       $('#logout-users').append($('<li>').text(msg));
     });

     socket.on('user count', (count) => {
       $('#users-count').append($('<li>').text(`Users in the room: ${count}`));
     });

     socket.on('users online', clients => {
       let userKeys = Object.keys(clients)

       userKeys.map(user => {
         $('#users-list').append($('<li>').text(`Current User: ${user}`));
       })
     })
