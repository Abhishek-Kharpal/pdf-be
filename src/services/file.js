const { prisma } = require('../utils/prismaUtil');

const getFilesByUser = async (user) => {
  const files = await prisma.file.findMany({
    where: {
      userId: user.id,
    },
  });

  return files;
};

module.exports = {
  getFilesByUser,
};
