const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoryItemSchema = new Schema({
  name: {
    type: String
  },
  planned: {
    type: Number,
    default: 0
  },
  remaining: {
    type: Number,
    default: 0
  }
});

const categorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    default: "Untitled",
    minlength: 2,
    maxlength: 50
  },
  items: [categoryItemSchema]
});

const Category = mongoose.model("categories", categorySchema);
module.exports = Category;
