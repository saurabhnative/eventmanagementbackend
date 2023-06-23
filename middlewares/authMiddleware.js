// authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware function to validate JWT or session token
const authenticateToken = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authentication token not provided' });
  }

  try {
    // Verify the authenticity and integrity of the token
    const decoded = jwt.verify(token, 'event_auth');

    // Attach user information to the request object
    req.user = decoded.user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
