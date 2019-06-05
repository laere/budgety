const mongoose = require("mongoose");
const { Schema } = mongoose;

// const categoryItemSchema = new Schema({
//   name: {
//     type: String
//   },
//   planned: {
//     type: Number,
//     default: 0
//   },
//   remaining: {
//     type: Number,
//     default: 0
//   }
// });

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

// const categorySchema = new Schema({
//   name: {
//     type: String,
//     default: "Untitled",
//     minlength: 2,
//     maxlength: 50
//   },
//   items: [categoryItemSchema]
// });

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
  categories: [{ type: Schema.Types.ObjectId, ref: "categories" }],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

budgetSchema.methods.calculateChecks = function(
  currentCheckAmount,
  newCheckAmount
) {
  console.log("THIS", this);
  //500 > 400
  if (currentCheckAmount > newCheckAmount) {
    // 500 - 400
    // 500 = 500 - 100;
    // budget amount = 400;
    checkDifference = currentCheckAmount - newCheckAmount;

    this.amount -= checkDifference;
    // 500 < 600
  } else if (currentCheckAmount < newCheckAmount) {
    // 600 - 500
    // 500 = 500 + 100;
    // budget amount = 600;
    checkDifference = newCheckAmount - currentCheckAmount;
    this.amount += checkDifference;
  }
};

const Budget = mongoose.model("budgets", budgetSchema);
module.exports = Budget;
