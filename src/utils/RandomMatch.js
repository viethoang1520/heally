const matchWithPerson = (socket, userData, person, roomID) => {
  socket.join(roomID);
  person.socket.join(roomID);
  socket.emit('matched', { roomID, users: [userData._id, person.userData._id] });
};

const randomMatch = (socket, userData, maleList, femaleList) => {
  const randomGender = Math.round(Math.random());
  const person = randomGender === 0 ? femaleList.shift() : maleList.shift();
  const roomID = crypto.randomUUID();
  matchWithPerson(socket, userData, person, roomID);
};

module.exports = { matchWithPerson, randomMatch };
