const fileService = require('../services/file');

const uploadFile = async (req, res, next) => {
  try {
    const { userID } = req;
    const { file } = req;
    const uploadedFile = await fileService.uploadFile(file, userID);
    res.status(200).json({
      message: 'File uploaded successfully',
      uploadedFile,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFile,
};
