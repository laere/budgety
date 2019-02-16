const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  description: String,
  amount: { type: Number, default: 0 },
  dateCreated: Date
});

module.exports = transactionSchema;
