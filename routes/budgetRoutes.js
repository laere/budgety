const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Budget = mongoose.model("budgets");
const User = mongoose.model("users");

module.exports = app => {
  // @route   GET api/budgets
  // @desc    Get all budgets
  // @access  Public
  app.get("/api/budgets", requireLogin, async (req, res) => {
    const budgets = await Budget.find({ user: req.user.id });

    if (!budgets) {
      res.status(404).json({ budgetsnotfound: "Not budgets found!" });
    }

    res.send(budgets);
  });

  // @route   GET api/budgets/:budgetId
  // @desc    Get a budget by ID
  // @access  Public
  app.get("/api/budgets/:budgetId", requireLogin, async (req, res) => {
    const budget = await Budget.findById({ _id: req.params.budgetId });

    if (!budget) {
      res.status(404).json({ budgetnotfound: "Budget with this ID not found" });
    }

    res.send(budget);
  });

  app.post("/api/budgets", requireLogin, async (req, res) => {
    const {
      title,
      description,
      amount,
      startDate,
      endDate,
      transactions
    } = req.body;

    const budget = new Budget({
      title,
      description,
      amount,
      startDate,
      endDate,
      transactions,
      user: req.user.id,
      dateCreated: Date.now()
    });

    try {
      // saving budget after creation
      await budget.save();
      // adding budget amount to user total balance
      req.user.totalBalance += parseFloat(amount);
      // saving user after adding budget amount to total balance
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  // @route   DELETE api/budgets/delete/:budgetId
  // @desc    Delete a budget by ID
  // @access  Public
  app.delete("/api/budgets/delete/:budgetId", requireLogin, (req, res) => {
    Budget.findById(req.params.budgetId)
      .then(budget => {
        if (!budget) {
          res
            .status(404)
            .json({ budgetnotfound: "Budget with that ID not found!" });
        }
        req.user.totalBalance -= parseFloat(budget.amount);
        req.user.save();
        budget.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json(err));
  });

  // @route   Patch api/budgets/edit/:budgetId
  // @desc    Edit a budget by ID
  // @access  Public
  app.patch("/api/budgets/edit/:budgetId", requireLogin, (req, res) => {
    const { title, description, amount, startDate, endDate } = req.body;

    const budgetFields = {
      title,
      description,
      amount,
      startDate,
      endDate
    };

    Budget.findOne({ _id: req.params.budgetId })
      .then(budget => {
        // budget.amount is the amount of the budget before Edit
        // amount is the new amount pulled from req.body after edit
        if (budget.amount - amount < budget.amount) {
          req.user.totalBalance -= budget.amount - amount;
          budget.amount += budget.amount - amount;
        }
        console.log(budget);
        req.user.save();
        budget.updateOne({ $set: budgetFields }, { new: true }).then(budget => {
          Budget.find()
            .then(budgets => res.json(budgets))
            .catch(e => res.status(404).json(e));
        });
      })
      .catch(e => res.status(404).json(e));
  });
};
