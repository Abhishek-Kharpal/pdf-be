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

const getFileByID = async (id) => {
  const file = await prisma.file.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      size: true,
      data: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      comments: true,
    },
  });
  return file;
};

const shareFile = async (id, userID, email) => {
  const file = await prisma.file.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  if (!file) {
    throw new Error('File not found');
  }

  if (file.authorId !== userID) {
    throw new Error('You are not the author of this file');
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      files: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.files.some((file) => file.id === id)) {
    throw new Error('File already shared with this user');
  }

  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      files: {
        connect: {
          id: file.id,
        },
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      files: true,
      storage: true,
    },
  });

  return updatedUser;
};

module.exports = {
  uploadFile,
  getFileByID,
  shareFile,
};
