const Server = require("socket.io");
const crypto = require('crypto')
const filterMessage = require('../../../middleware/MessageFilter')
const { matchWithCondition } = require('../../../utils/RandomMatch')

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

    socket.on('finding', (userData) => {
      /*
      In this context:
      1 : Man
      0 : Woman
      2 : Both man and woman
      */
      const MALE = 1
      const FEMALE = 0
      const BOTH = 2

      const userGender = userData.gender
      const oppositeGender = userData.oppositeGender
      const maleLength = maleList.length
      const femaleLength = femaleList.length
      // if a man finds someone but no one available
      if (userGender === MALE && femaleLength < 1) {
        if ((oppositeGender === FEMALE) || ((oppositeGender === BOTH || oppositeGender === MALE) && maleLength < 1)) {
          maleList.push({ userData, socket })
          return
        }
      }
      // if a woman finds someone but no one available
      if (userGender === FEMALE && maleLength < 1) {
        if ((oppositeGender === MALE) || ((oppositeGender === BOTH || oppositeGender === FEMALE) && femaleLength < 1)) {
          femaleList.push({ userData, socket })
          return
        }
      }
      // if a man finds a woman
      if (userGender === MALE && oppositeGender === FEMALE) {
        const roomID = crypto.randomUUID();
        matchWithCondition(socket, userData, femaleList, FEMALE, roomID)
      }
      // if a woman finds a man
      if (userGender === FEMALE && oppositeGender === MALE) {
        const roomID = crypto.randomUUID();
        matchWithCondition(socket, userData, maleList, MALE, roomID)
      }
      // if a man finds a man
      if (userGender === MALE && oppositeGender === MALE) {
        const roomID = crypto.randomUUID();
        matchWithCondition(socket, userData, maleList, FEMALE, roomID)
      }
      // if a woman finds a woman
      if (userGender === FEMALE && oppositeGender === FEMALE) {
        const roomID = crypto.randomUUID();
        matchWithCondition(socket, userData, femaleList, MALE, roomID)
      }
      // if a man finds anyone 
      if (userGender === MALE && oppositeGender === BOTH) {
        const roomID = crypto.randomUUID();
        const randomMatchGender = Math.round(Math.random());
        if (randomMatchGender === FEMALE) {
          matchWithCondition(socket, userData, femaleList, FEMALE, roomID)
        } else if (randomMatchGender === MALE) {
          matchWithCondition(socket, userData, maleList, FEMALE, roomID)
        }
      }
      // if a woman finds anyone 
      if (userGender === FEMALE && oppositeGender === BOTH) {
        const roomID = crypto.randomUUID();
        const randomMatchGender = Math.round(Math.random());
        if (randomMatchGender === FEMALE) {
          matchWithCondition(socket, userData, femaleList, MALE, roomID)
        } else if (randomMatchGender === MALE) {
          matchWithCondition(socket, userData, maleList, MALE, roomID)
        }
      }
    })

    // when user stop finding 
    socket.on('stop finding', (userData) => {
      const userID = userData._id
      const userGender = userData.gender
      const userList = userGender === 1 ? maleList : femaleList
      for (let user of userList) {
        if (userID === user.userData._id) {
          userList.splice(userList.indexOf(user), 1)
          return
        }
      }
    })
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMessageReceive) => {
      let chat = newMessageReceive.chatID;
      // newMessageReceive.message = filterMessage(newMessageReceive.message)
      if (!chat.users) {
        console.log('chats.users is not defined');
      }
      chat.users.forEach((user) => {
        if (user._id == newMessageReceive.sender._id) return;
        socket.in(user._id).emit('message received', newMessageReceive);
      });
    });


    socket.on('random message', (data) => {
      // client sends rootUserID, userID, message, roomID
      const { rootUserID, userID, message } = data
      if (!rootUserID || !userID) {
        console.log('Missing chat users')
      }
      socket.in(userID).emit('message received', data)
    })
  });
}

module.exports = configureSocketIO;

