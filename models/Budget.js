const mongoose = require('mongoose');
const { Schema } = mongoose;
const TransactionSchema = require('./Transaction');

const budgetSchema = new Schema({
  title: String,
  description: String,
  amount: { type: Number, default: 0 },
  startDate: Date,
  endDate: Date,
  transactions: [TransactionSchema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: Date
})

mongoose.model('budgets', budgetSchema);
