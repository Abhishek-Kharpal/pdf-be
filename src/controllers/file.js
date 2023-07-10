const fileService = require('../services/file');

const getFilesByUser = async (req, res, next) => {
  try {
    const { user } = req;
    const files = await fileService.getFilesByUser(user);
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFilesByUser,
};
