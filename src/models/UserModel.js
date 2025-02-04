const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  accountCreatedAt: {
    type: Date,
    default: new Date(),
  },
});

const UserModel = model('users', UserSchema);

module.exports = UserModel;
