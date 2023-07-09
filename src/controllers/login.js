const { login } = require('../services/login');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
