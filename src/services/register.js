const bcrypt = require('bcrypt');
const { prisma } = require('../utils/prismaUtil');

const register = async (email, name, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    throw new Error('Email already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  return newUser;
};

module.exports = { register };
