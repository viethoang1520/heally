const Server = require("socket.io");
const crypto = require('crypto')

function configureSocketIO(server) {
  const io = new Server.Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: 'http://localhost:3001',
    },
  });

  io.on('connection', (socket) => {

    socket.on('setup', (userData) => {
      socket.join(userData._id);
      socket.emit('connected');
    });

    socket.on('join room', (userData) => {
      if (randomChatSet.size < 2) {
        randomChatSet.add({ userData, socket });
      } else {
        let matched = false;

        for (let chat of randomChatSet) {
          if (userData.oppositeGender === chat.userData.gender) {
            const roomID = crypto.randomUUID();
            socket.join(roomID);
            chat.socket.join(roomID);
            socket.emit('matched', { roomID: roomID, partner: chat.userData });
            chat.socket.emit('matched', { roomID: roomID, partner: userData });
            randomChatSet.delete(chat);
            matched = true;
            break;
          }
        }
        if (!matched) {
          randomChatSet.add({ userData, socket });
        }
      }
    });

    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMessageReceive) => {
      var chat = newMessageReceive.chatID;
      if (!chat.users) {
        console.log('chats.users is not defined');
      }
      chat.users.forEach((user) => {
        if (user._id == newMessageReceive.sender._id) return;
        socket.in(user._id).emit('message received', newMessageReceive);
      });
    });

    const randomChatSet = new Set([])

    
  });
}

module.exports = configureSocketIO;



// const Server = require("socket.io");

// function configureSocketIO(server) {
//   const io = new Server.Server(server, {
//     pingTimeout: 60000,
//     cors: {
//       origin: 'http://localhost:3001',
//     },
//   });

//   io.on('connection', (socket) => {
//     //setup
//     socket.on('setup', (userData) => {
//       socket.join(userData._id);
//       socket.emit('connected');
//     });

//     socket.on('join room', (room) => {
//       socket.join(room);
//     });

//     socket.on('typing', (room) => {
//       console.log("Typing: " + room);
//       socket.in(room).emit('typing')

//     });
//     socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

//     socket.on('new message', (newMessageReceive) => {
//       var chat = newMessageReceive.chatID;
//       if (!chat.users) {
//         console.log('chats.users is not defined');
//       }
//       chat.users.forEach((user) => {
//         if (user._id == newMessageReceive.sender._id) return;
//         socket.in(user._id).emit('message received', newMessageReceive);
//       });
//     });
//   });
// }

// module.exports = configureSocketIO;
