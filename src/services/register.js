const { prismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const register = async (email, password) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    throw new Error('Email already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prismaClient.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return newUser;
};

module.exports = { register };
