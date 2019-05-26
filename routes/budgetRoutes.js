const mongoose = require("mongoose");
const myAsync = require("../middlewares/asyncMiddleware");
const requireLogin = require("../middlewares/requireLogin");
const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const User = require("../models/User");
const validateBudget = require("../validation/validateBudget");
const errors = require("../errors/errors");

// @route   GET api/budgets
// @desc    Get all budgets
// @access  Public
router.get(
  "/",
  requireLogin,
  myAsync(async (req, res, next) => {
    const budgets = await Budget.find({ user: req.user.id }).sort({
      dateCreated: -1
    });

    if (!budgets) {
      next(errors.notFound);
    }

    res.send(budgets);
  })
);

// @route   GET api/budgets/:budgetId
// @desc    Get a budget by ID
// @access  Public
router.get(
  "/:budgetId",
  requireLogin,
  myAsync(async (req, res, next) => {
    const budget = await Budget.findById(req.params.budgetId);

    if (!budget) {
      next(errors.notFound);
    }

    res.send(budget);
  })
);

router.post(
  "/",
  requireLogin,
  myAsync(async (req, res, next) => {
    const { error } = validateBudget(req.body);
    // console.log(error);
    if (error) return res.status(400).send(error.details[0].message);

    const budget = new Budget({
      ...req.body,
      user: req.user.id
    });

    // saving budget after creation
    await budget.save();
    // adding budget amount to user total balance
    // req.user.totalBalance += parseFloat(req.body.amount);
    // saving user after adding budget amount to total balance

    res.send(req.user);
  })
);

// @route   DELETE api/budgets/delete/:budgetId
// @desc    Delete a budget by ID
// @access  Public
router.delete(
  "/:budgetId",
  requireLogin,
  myAsync(async (req, res, next) => {
    let budget = await Budget.findById(req.params.budgetId);

    if (!budget) {
      next(errors.notFound);
    }

    req.user.totalBalance -= parseFloat(budget.amount);

    await req.user.save();

    budget.remove();

    res.json({ success: true });
  })
);

// @route   Patch api/budgets/edit/:budgetId
// @desc    Edit a budget by ID
// @access  Public
router.put(
  "/:budgetId",
  requireLogin,
  myAsync(async (req, res, next) => {
    // REFACTOR *************//
    const { error } = validateBudget(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, description, amount, startDate, endDate } = req.body;

    const budgetFields = {
      title,
      description,
      amount,
      startDate,
      endDate
    };

    let budget = await Budget.findById(req.params.budgetId);

    if (budget.amount - amount < budget.amount) {
      req.user.totalBalance -= budget.amount - amount;
      budget.amount += budget.amount - amount;
    }

    await budget.updateOne({ $set: budgetFields }, { new: true });

    await req.user.save();

    res.send(budget);
  })
);

module.exports = router;
