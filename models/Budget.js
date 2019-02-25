const mongoose = require("mongoose");
const { Schema } = mongoose;

const budgetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  transactions: [
    {
      description: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        default: 0,
        required: true
      },
      dateCreated: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model("budgets", budgetSchema);
