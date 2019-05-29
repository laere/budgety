const mongoose = require("mongoose");
const { Schema } = mongoose;

const payCheckSchema = new Schema({
  name: {
    type: String,
    default: "Paycheck " + paychecks.length
  },
  planned: {
    type: Number,
    default: 0
  },
  received: {
    type: Number,
    default: 0
  }
});

const transactionSchema = new Schema({
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  amount: {
    type: Number,
    default: 0,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const categoryItemSchema = new Schema({
  name: {
    type: String,
    required: true
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
  name: {
    type: String,
    default: "Untitled",
    minlength: 2,
    maxlength: 50
  },
  items: [categoryItemSchema],
  transactions: [transactionSchema]
});

const budgetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  goals: {
    type: String,
    required: true,
    minlength: 2
  },
  currentmonth: {
    type: Date,
    default: Date.now
  },
  categories: [categorySchema],
  income: {
    title: {
      type: String,
      default: "Income",
      min: 2,
      max: 55
    },
    paychecks: [payCheckSchema]
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Budget = mongoose.model("budgets", budgetSchema);
module.exports = Budget;
