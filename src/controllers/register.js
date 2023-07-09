const { register } = require('../services/register');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await register(email, password);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};
