const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Budget = mongoose.model("budgets");
const User = mongoose.model("users");

module.exports = app => {
  // @route   POST api/budgets/:budgetId/transactions/
  // @desc    POST transactions
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
    "/api/budgets/:budgetId/transactions/:transactionId",
    requireLogin,
    (req, res) => {
      Budget.findOne({ _id: req.params.budgetId })
        .then(budget => {
          // map id's of transactions and find index of params transactionId
          const removeIndex = budget.transactions
            .map(transaction => transaction.id)
            .indexOf(req.params.transactionId);

          // Grab the transactions amount value
          const transactionAmount = budget.transactions[removeIndex].amount;

          budget.amount += transactionAmount;
          req.user.totalBalance += transactionAmount;

          budget.transactions.splice(removeIndex, 1);

          req.user.save();

          budget.save().then(budget => res.json(budget));
        })
        .catch(e => res.status(404).json(e));
    }
  );

  // @route   GET api/budgets/:budgetId/transactions
  // @desc    Get a single transaction
  // @access  Public
  app.get(
    "/api/budgets/:budgetId/transactions/:transactionId",
    requireLogin,
    (req, res) => {
      Budget.findOne({ _id: req.params.budgetId })
        .then(budget => {
          // Find transaction based on ID
          const singleTransaction = budget.transactions.find(
            transaction => transaction.id === req.params.transactionId
          );

          res.json(singleTransaction);
        })
        .catch(e => res.status(400).json(e));
    }
  );

  // @route   PATCH api/budgets/:budgetId/transactions
  // @desc    Update a single transaction
  // @access  Public
  app.patch(
    "/api/budgets/:budgetId/transactions/:transactionId",
    requireLogin,
    (req, res) => {
      const { description, amount } = req.body;
      const newTransaction = { description, amount };

      User.findOne({ _id: req.user.id })
        .then(user => {
          Budget.findOne({ _id: req.params.budgetId })
            .then(budget => {
              // Find transaction in budget based on transaction ID
              const transaction = budget.transactions.id(
                req.params.transactionId
              );

              // console.log("TRANSACTION AMOUNT", transaction.amount);
              // console.log("AMOUNT", amount);

              // Determines difference between original tranaction AMOUNT
              // and the new transaction AMOUNT
              // then adds difference to user total and budget amounts
              if (transaction.amount - amount < transaction.amount) {
                user.totalBalance += transaction.amount - amount;
                budget.amount += transaction.amount - amount;
              }

              // set old transaction to new transaction
              transaction.set(newTransaction);

              budget.save();
              user.save();
            })
            .then(budget => res.json(budget))
            .catch(e => res.status(404).json(e));
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
