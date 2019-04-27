const mongoose = require("mongoose");
const { Schema } = mongoose;

const budgetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
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
    minlength: 2,
    maxlength: 255
  },
  amount: {
    type: Number,
    default: 0,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
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

budgetSchema.methods.calculate = function(totalBalance, amount) {
  if (this.amount - amount < this.amount) {
    totalBalance -= this.amount - amount;
    this.amount += this.amount - amount;
  }

  return this;
};

const Budget = mongoose.model("budgets", budgetSchema);
module.exports = Budget;
