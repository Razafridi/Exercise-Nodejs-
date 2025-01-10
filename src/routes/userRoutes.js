const express = require('express');
const {
  register,
  login,
  getUser,
} = require('./../controllers/userController.js');
const { secureMiddleware } = require('../middlewares/secureMiddleware.js');
const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/user', secureMiddleware, getUser);

// userRouter.post('/verify', );
// userRouter.post('/reset', );
// userRouter.put('/user', );
// userRouter.delete('/user', );

module.exports = userRouter;
