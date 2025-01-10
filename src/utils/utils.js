const jwt = require('jsonwebtoken');
const IsDevelopment = () => {
  return process.env.ENVIROMENT == 'dev' ? true : false;
};

const createToken = (data) => {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: '15d' });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};
module.exports = { IsDevelopment, createToken, verifyToken };
