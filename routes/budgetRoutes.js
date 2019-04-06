const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const User = require("../models/User");

// @route   GET api/budgets
// @desc    Get all budgets
// @access  Public
router.get("/", requireLogin, async (req, res) => {
  const budgets = await Budget.find({ user: req.user.id }).sort({
    dateCreated: 1
  });

  if (!budgets) {
    res.status(404).json({ budgetsnotfound: "Not budgets found!" });
  }

  res.send(budgets);
});

// @route   GET api/budgets/:budgetId
// @desc    Get a budget by ID
// @access  Public
router.get("/:budgetId", requireLogin, async (req, res) => {
  const budget = await Budget.findById({ _id: req.params.budgetId });

  if (!budget) {
    res.status(404).json({ budgetnotfound: "Budget with this ID not found" });
  }

  res.send(budget);
});

router.post("/", requireLogin, async (req, res) => {
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
    user: req.user.id
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
router.delete("/:budgetId", requireLogin, (req, res) => {
  // REFACTOR *************//
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
router.put(":budgetId", requireLogin, (req, res) => {
  // REFACTOR *************//

  const { title, description, amount, startDate, endDate } = req.body;

  const budgetFields = {
    title,
    description,
    amount,
    startDate,
    endDate
  };

  // Refactor FindOneAndUpdate

  Budget.findOne({ _id: req.params.budgetId })
    .then(budget => {
      // budget.amount is the amount of the budget before Edit
      // amount is the new amount pulled from req.body after edit
      if (budget.amount - amount < budget.amount) {
        req.user.totalBalance -= budget.amount - amount;
        budget.amount += budget.amount - amount;
      }

      req.user.save();

      budget.updateOne({ $set: budgetFields }, { new: true }).then(budget => {
        Budget.find()
          .then(budgets => res.json(budgets))
          .catch(e => res.status(404).json(e));
      });
    })
    .catch(e => res.status(404).json(e));
});

module.exports = router;
