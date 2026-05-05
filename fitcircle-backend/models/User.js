const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  phone: String,
  password: String,

  //Password reset
  resetCode: String,
  resetCodeExpires: Date,
  resetAttempts: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", UserSchema);
