const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoryItemSchema = new Schema({
  name: {
    type: String,
    default: "Untitled"
  },
  spent: {
    type: Number,
    default: 0
  }
});

const categorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  planned: {
    type: Number,
    default: 0
  },
  spentTotal: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: "Untitled",
    minlength: 2,
    maxlength: 50
  },
  categoryitems: [categoryItemSchema]
});

const Category = mongoose.model("categories", categorySchema);
module.exports = Category;
