const mongoose = require('mongoose');
const { Schema } = mongoose;
const TransactionSchema = require('./Transaction');

const budgetSchema = new Schema({
  title: String,
  description: String,
  amount: { type: Number, default: 0 },
  startDate: String,
  endDate: String,
  transactions: [TransactionSchema]
})

mongoose.model('budgets', budgetSchema);
