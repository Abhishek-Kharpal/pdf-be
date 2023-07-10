const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../utils/prismaUtil');

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
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

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  return token;
};

module.exports = { login };
