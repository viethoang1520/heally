const Server = require("socket.io");
const crypto = require('crypto')
const { matchWithPerson, randomMatch } = require('../../utils/RandomMatch')

function configureSocketIO(server, maleList, femaleList) {
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

    socket.on('find', (userData) => {
      const userGender = userData.gender
      const oppositeGender = userData.oppositeGender
      const maleLength = maleList.length
      const femaleLength = femaleList.length

      if (userGender === 1 && femaleLength < 1) {
        if ((oppositeGender === 0) || (oppositeGender === 3 && maleLength < 1)) {
          maleList.push({ userData, socket })
          return
        }
      }
      if (userGender === 0 && maleLength < 1) {
        if ((oppositeGender === 1) || (oppositeGender === 3 && femaleLength < 1)) {
          femaleList.push({ userData, socket })
          return
        }
      }

      if (userGender === 1) {
        const roomID = crypto.randomUUID();
        if (oppositeGender === 0) {
          const femalePerson = femaleList.shift();
          matchWithPerson(socket, userData, femalePerson, roomID);
        } else if (oppositeGender === 3) {
          randomMatch(socket, userData, maleList, femaleList);
        }
      }

      if (userGender === 0) {
        const roomID = crypto.randomUUID();
        if (oppositeGender === 1) {
          const malePerson = maleList.shift();
          matchWithPerson(socket, userData, malePerson, roomID);
        } else if (oppositeGender === 3) {
          randomMatch(socket, userData, maleList, femaleList);
        }
      }

    })

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
  });
}

module.exports = configureSocketIO;


