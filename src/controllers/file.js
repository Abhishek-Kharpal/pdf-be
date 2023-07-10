const fileService = require('../services/file');

const uploadFile = async (req, res, next) => {
  try {
    const { userID } = req;
    const { file } = req;
    const { updatedUser, uploadFile } = await fileService.uploadFile(file, userID);
    res.status(200).json({
      message: 'File uploaded successfully',
      updatedUser,
      uploadFile,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFile,
};
