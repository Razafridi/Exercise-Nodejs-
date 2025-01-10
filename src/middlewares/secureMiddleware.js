const UserModel = require('../models/UserModel');
const { verifyToken } = require('../utils/utils');

const secureMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    console.log('Token', token);
    if (!token) {
      throw new Error('Token not found');
    }
    const { id, role } = verifyToken(token);
    console.log(id, role);
    const user = await UserModel.findById(id);
    res.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: error.message,
      code: 401,
      data: null,
    });
  }
};

module.exports = { secureMiddleware };
