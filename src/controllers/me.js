const getMe = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      userID: req.userID,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMe,
};
