const { prisma } = require('../utils/prismaUtil');

const getUserById = async (userID) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    select: {
      id: true,
      email: true,
      name: true,
      files: true,
      storage: true,
    },
  });
  return user;
};

module.exports = {
  getUserById,
};
