const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Budget = mongoose.model("budgets");
const User = mongoose.model("users");

module.exports = app => {
  // @route   GET api/budgets/:budgetId/transactions/
  // @desc    Get all transactions
  // @access  Public
  app.post("/api/budgets/:budgetId/transactions", requireLogin, (req, res) => {
    Budget.findOne({ _id: req.params.budgetId })
      .then(budget => {
        console.log(budget);
        const { description, amount } = req.body;

        const transaction = {
          description,
          amount
        };

        budget.transactions.unshift(transaction);

        budget.save().then(budget => {
          res.json(budget);
        });
      })
      .catch(e => res.status(404).json(e));
  });

  // @route   GET api/budgets/:budgetId/transactions
  // @desc    Get all transactions
  // @access  Public
  app.get("/api/budgets/:budgetId/transactions", requireLogin, (req, res) => {
    Budget.findById({ _id: req.params.budgetId })
      .then(budget => {
        res.json(budget.transactions);
      })
      .catch(e => res.status(404).json(e));
  });
};
