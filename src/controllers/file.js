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

const getFileByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await fileService.getFileByID(id);
    res.status(200).json({
      message: 'File fetched successfully',
      file,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadFile,
  getFileByID,
};
