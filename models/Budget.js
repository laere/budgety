const mongoose = require("mongoose");
const { Schema } = mongoose;

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

const checkSchema = new Schema({
  checkamount: {
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const budgetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  amount: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  },
  paychecks: [checkSchema],
  transactions: [
    {
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
    }
  ],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Budget = mongoose.model("budgets", budgetSchema);
module.exports = Budget;
