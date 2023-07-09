const { prismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (email, password) => {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  return token;
};

module.exports = { login };
