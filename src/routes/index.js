const login = require('./login');
const register = require('./register');
const facebook = require('./facebook-auth')
const google = require('./google-auth')
const error = require('./error')
const chat = require('./chat')
const message = require('./message')
const avatar = require('./avatar')
const star = require('./star')
const user = require('./user')

function routes(app) {
  app.use('/user', user)
  app.use('/error', error)
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