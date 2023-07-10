const { prisma } = require('../utils/prismaUtil');

const createComment = async (description, postId, userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }

  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
    },
  });
  if (!file) {
    throw new Error('Post not found');
  }

  const comment = await prisma.comment.create({
    data: {
      description,
      author: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    },
  });
  return comment;
};

module.exports = {
  createComment,
};
