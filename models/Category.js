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
  totalspent: {
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

categorySchema.methods.calculateSpentTotal = function() {
  return this.categoryitems.reduce((accum, current) => {
    console.log(accum, current);
    return accum + current.spent;
  }, 0);
};

const Category = mongoose.model("categories", categorySchema);
module.exports = Category;
