const commentService = require('../services/comment');

const createComment = async (req, res, next) => {
  try {
    const { description, fileId } = req.body;
    const { id } = req.user;
    const comment = await commentService.createComment({
      description,
      fileId,
      userId: id,
    });
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
