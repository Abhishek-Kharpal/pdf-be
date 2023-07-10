const userService = require('../services/user');

const getMe = async (req, res, next) => {
  try {
    const { userID } = req;
    const user = await userService.getUserById(userID);
    res.status(200).json({
      message: 'Success',
      user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMe,
};
