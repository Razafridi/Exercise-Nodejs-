const UserModel = require('../models/UserModel.js');
const bcryptjs = require('bcryptjs');
const { createToken } = require('../utils/utils.js');

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email exists',
        data: null,
        code: 400,
      });
    } else {
      const hashedPassword = await bcryptjs.hash(password, 10);
      const user = await UserModel.create({
        email,
        password: hashedPassword,
        name,
      });
      return res.status(200).json({
        success: true,
        message: 'User Created Successfully',
        data: user,
        code: 200,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
      code: 500,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email: email });
    console.log(existingUser);
    if (existingUser) {
      const compare = await bcryptjs.compare(password, existingUser.password);
      console.log(compare);

      if (compare) {
        const token = createToken({ id: existingUser._id, role: 'user' });
        console.log('key', token);

        return res.status(200).json({
          success: true,
          message: 'User Created Successfully',
          data: { token },
          code: 200,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid User',
          data: null,
          code: 401,
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid User',
        data: null,
        code: 401,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
      code: 500,
    });
  }
};

const getUser = async (req, res) => {
  try {
    if (res.user) {
      return res.status(200).json({
        success: true,
        message: 'Authorized',
        data: res.user,
        code: 200,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid User',
        data: null,
        code: 401,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
      code: 500,
    });
  }
};
module.exports = { register, login, getUser };
