const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    min: 2,
    max: 50
  },
  description: {
    type: String,
    required: true,
    min: 2,
    max: 50
  }
});

const planSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  expenses: [expenseSchema],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Plan = mongoose.model("plans", planSchema);
module.exports = Plan;
