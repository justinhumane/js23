const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  level: {
    type: Number,
    default: 3,
  },
});

const User = model("user", UserSchema);
module.exports = User;
