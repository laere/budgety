const mongoose = require("mongoose");
const { Schema } = mongoose;

const checkSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  checkamount: {
    type: Number,
    default: 0,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Check = mongoose.model("checks", checkSchema);
module.exports = Check;
