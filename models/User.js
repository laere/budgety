const mongoose = require("mongoose");
const { Schema } = mongoose;

const checkSchema = new Schema({
  amount: {
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new Schema({
  googleId: String,
  totalBalance: {
    type: Number,
    default: 0
  },
  currentCheck: {
    type: Number,
    default: 0
  },
  lastCheck: {
    type: Number,
    default: 0
  },
  checks: [checkSchema]
});

const User = mongoose.model("users", userSchema);
module.exports = User;
