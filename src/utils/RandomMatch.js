const matchWithPerson = (socket, userData, person, roomID) => {
  // console.log(userData.full_name)
  // console.log(person.userData.full_name)
  // console.log('-------------------------')
  socket.join(roomID);
  person.socket.join(roomID);
  socket.emit('matched', { roomID, user: person.userData });
  person.socket.emit('matched', { roomID, user: userData });
};

const matchWithCondition = (socket, userData, genderList, exceptGender, roomID) => {
  for (let user of genderList) {
    if (user.userData.oppositeGender !== exceptGender) {
      console.log("except gender", exceptGender)
      console.log("opposite gender", user.userData.oppositeGender)
      const userIndex = genderList.indexOf(user)
      const person = genderList.splice(userIndex, 1)[0]
      matchWithPerson(socket, userData, person, roomID);
      return
    }
  }
}

module.exports = { matchWithPerson, matchWithCondition };