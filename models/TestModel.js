const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  paychecks: [
    {
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
    }
  ],
  savings: [budgetItemSchema],
  housing: [budgetItemSchema],
  food: [budgetItemSchema],
  personal: [budgetItemSchema],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Budget = mongoose.model("budgets", budgetSchema);
module.exports = Budget;
