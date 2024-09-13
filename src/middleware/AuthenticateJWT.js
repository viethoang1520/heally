const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  console.log(token)
  if (!token) {
    // Send a 401 status code if no token is found
    return res.status(401).json({ message: 'No token provided. Please log in.' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded; // Attach decoded user info to the request
    next();
  });
};

module.exports = authenticateJWT