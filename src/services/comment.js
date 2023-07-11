const { prisma } = require('../utils/prismaUtil');

const createComment = async (description, fileID, userID) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }

  const file = await prisma.file.findUnique({
    where: {
      id: fileID,
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
          id: userID,
        },
      },
      file: {
        connect: {
          id: fileID,
        },
      },
    },
  });
  return comment;
};

module.exports = {
  createComment,
};
