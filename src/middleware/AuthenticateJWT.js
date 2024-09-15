const jwt = require('jsonwebtoken')
const authenticateJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[0]
    if (!token) {
      return res.status(401).json({ message: 'No token provided. Please log in.' })
    }

    if (token.length < 500) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' })
        }
        const { id, username } = decoded
        req.id = id
        req.username = username
        req.token = token
        next()
      });
    } else {
      let data = jwt.decode(token)
      req.rootUserEmail = data.email
      const googleUser = await user
        .findOne({ email: req.rootUserEmail })
        .select('-password_hash')
      req.rootUser = googleUser
      req.token = token
      req.rootUserID = googleUser._id
      next()
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }

}

module.exports = authenticateJWT