const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
      res.status(401).json({
        message: 'No token provided',
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        throw new Error('Invalid token');
      }
      req.userID = decoded.id;
    });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
