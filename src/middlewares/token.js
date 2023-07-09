const { jwt } = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) {
      res.status(401).json({
        message: 'No token provided',
      });
    }
    jwt.verify((error, decoded) => {
      if (error) {
        throw new Error(error);
      }
      req.user = decoded.user;
    });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;
