const commentService = require('../services/comment');

const createComment = async (req, res, next) => {
  try {
    const { description, fileID } = req.body;
    const { userID } = req;
    const comment = await commentService.createComment(description, fileID, userID);
    res.status(201).json({
      status: 'success',
      comment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
};
