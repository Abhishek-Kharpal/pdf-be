const { login: loginService } = require('../services/login');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
