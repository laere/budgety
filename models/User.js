const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  totalBalance: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model("users", userSchema);
module.exports = User;
