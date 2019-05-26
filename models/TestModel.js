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

const budgetItemSchema = new Schema({
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
  },
  transactions: [transactionSchema]
});

const budgetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  currentmonth: {
    type: Date,
    default: Date.now,
    required: true
  },
  income: {
    title: {
      type: String,
      default: "Income",
      min: 2,
      max: 55
    },
    paychecks: [payCheckSchema]
  },
  savings: {
    title: {
      type: String,
      default: "Savings",
      min: 2,
      max: 55
    },
    data: [budgetItemSchema]
  },
  housing: {
    title: {
      type: String,
      default: "Housing",
      min: 2,
      max: 55
    },
    data: [budgetItemSchema]
  },
  food: {
    title: {
      type: String,
      default: "Food",
      min: 2,
      max: 55
    },
    data: [budgetItemSchema]
  },
  personal: {
    title: {
      type: String,
      default: "Personal",
      min: 2,
      max: 55
    },
    data: [budgetItemSchema]
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Budget = mongoose.model("budgets", budgetSchema);
module.exports = Budget;
