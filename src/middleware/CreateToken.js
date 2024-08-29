const jwt = require('jsonwebtoken');

const maxAge = 1000 * 60 * 60 * 24 * 30;
// const maxAge = 5 * 1000;
const createToken = (payload) => {
  return jwt.sign({ payload }, process.env.TOKEN_HEADER_KEY, {
    expiresIn: maxAge
  })
}

module.exports = { createToken };