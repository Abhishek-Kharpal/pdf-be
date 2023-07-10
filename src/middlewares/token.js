const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
      throw new Error('Missing token');
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
