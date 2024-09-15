const login = require('./account/login');
const register = require('./account/register');
const facebook = require('./account/facebook-auth')
const google = require('./account/google-auth')
const chat = require('./chat/chat')
const message = require('./chat/message')
const avatar = require('./user/avatar')
const star = require('./user/star')
const user = require('./user/user')

function routes(app) {
  app.use('/user', user)
  app.use('/login', login);
  app.use('/register', register);
  app.use('/auth/facebook', facebook);
  app.use('/auth/google', google);

  app.use('/chat', chat);
  app.use('/message', message);
  app.use('/avatar', avatar);
  app.use('/star', star);
  
}

module.exports = routes;