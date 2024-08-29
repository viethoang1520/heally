const Server = require("socket.io");

function configureSocketIO(server) {
  const io = new Server.Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: 'http://localhost:3001',
    },
  });

  io.on('connection', (socket) => {
    //setup
    socket.on('setup', (userData) => {
      socket.join(userData.id);
      socket.emit('connected');
    });

    socket.on('join room', (room) => {
      socket.join(room);
    });
    
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));  

    socket.on('new message', (newMessageReceive) => {
        var chat = newMessageReceive.chatId;
        if (!chat.users) {
        console.log('chats.users is not defined');
      }
      chat.users.forEach((user) => {
        if (user._id == newMessageReceive.sender._id) return;
        socket.in(user._id).emit('message received', newMessageReceive);
      });
    });
  });
}

module.exports = configureSocketIO;
