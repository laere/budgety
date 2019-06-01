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

    console.log(budget);

    // saving budget after creation
    await budget.save();

    res.send({ success: "Budget was sucessfully added!" });
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

    budget.remove();

    res.send({ success: "Budget was sucessfully deleted!" });
  })
);

// @route   Patch api/budgets/edit/:budgetId
// @desc    Edit a budget by ID
// @access  Public
router.put(
  "/:budgetId",
  requireLogin,
  myAsync(async (req, res, next) => {
    const { error } = validateBudget(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const budgetFields = {
      ...req.body
    };

    const budget = await Budget.findOneAndUpdate(
      { _id: req.params.budgetId },
      { $set: budgetFields },
      { new: true }
    );

    res.send(budget);
  })
);

module.exports = router;
