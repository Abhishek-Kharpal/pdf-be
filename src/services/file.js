const { prisma } = require('../utils/prismaUtil');
const { STORAGE_CAP } = require('../constants/constraints');

const uploadFile = async (file, userID) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userID,
    },
    select: {
      id: true,
      storage: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.storage + file.size > STORAGE_CAP) {
    throw new Error('Not enough storage');
  }
  if (file.mimetype !== 'application/pdf') throw new Error('File must be pdf');

  const pdfData = await file.buffer;
  const uploadedFile = await prisma.file.create({
    data: {
      name: file.originalname,
      size: file.size,
      data: pdfData,
      author: {
        connect: {
          id: userID,
        },
      },
    },
  });

  const updatedUser = await prisma.user.update({
    where: {
      id: userID,
    },
    data: {
      storage: user.storage + file.size,
    },
    select: {
      id: true,
      email: true,
      name: true,
      files: true,
      storage: true,
    },
  });

  return {
    uploadedFile,
    updatedUser,
  };
};

module.exports = {
  uploadFile,
};
