const { register: registerService } = require('../services/register');

const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const user = await registerService(email, name, password);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
