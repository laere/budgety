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
        const { description, amount } = req.body;

        const transaction = {
          description,
          amount
        };

        budget.amount -= parseFloat(amount);
        req.user.totalBalance -= parseFloat(amount);

        req.user.save();

        budget.transactions.unshift(transaction);

        budget.save().then(budget => {
          res.json(budget);
        });
      })
      .catch(e => res.status(404).json(e));
  });

  // @route   DELETE api/budgets/:budgetId/transactions/:transactionId
  // @desc    Delete a transaction
  // @access  Public
  app.delete(
    "/api/budgets/:budgetId/:transactionId",
    requireLogin,
    (req, res) => {
      Budget.findOne({ _id: req.params.budgetId })
        .then(budget => {
          const removeIndex = budget.transactions
            .map(transaction => transaction._id)
            .indexOf(req.params.transactionId);

          // TODO: make dynamic
          const transactionAmount = budget.transactions[0].amount;

          req.user.totalBalance += transactionAmount;
          budget.amount += transactionAmount;

          budget.transactions.splice(removeIndex, 1);

          req.user.save();

          budget.save().then(budget => res.json(budget));
        })
        .catch(e => res.status(404).json(e));
    }
  );

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
