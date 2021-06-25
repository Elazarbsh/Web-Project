const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = {
  email: String,
  password: String,
};

module.exports = mongoose.model("User", UserSchema);
