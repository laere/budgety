const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const myAsync = require("../middlewares/asyncMiddleware");
const express = require("express");
const router = express.Router();
const errors = require("../errors/errors");
const Budget = require("../models/Budget");
const User = require("../models/User");

const validateTransaction = require("../validation/validateTransaction");

// @route   POST api/budgets/:budgetId/transactions/
// @desc    POST transactions
// @access  Public
router.post(
  "/:budgetId",
  requireLogin,
  myAsync(async (req, res, next) => {
    const { error } = validateTransaction(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { amount } = req.body;

    const budget = await Budget.findOne({ _id: req.params.budgetId });

    if (!budget) return next(errors.notFound);

    budget.transactions.unshift(req.body);

    budget.amount -= amount;

    await budget.save();

    res.send(budget);
  })
);

// @route   DELETE api/budgets/:budgetId/:transactionId
// @desc    Delete a transaction
// @access  Public
router.delete(
  "/:budgetId/:transactionId",
  requireLogin,
  myAsync(async (req, res, next) => {
    let budget = await Budget.findById(req.params.budgetId);

    let transaction = budget.transactions.id(req.params.transactionId);

    const transactionAmount = transaction.amount;

    budget.amount += transactionAmount;
    req.user.totalBalance += transactionAmount;

    transaction.remove();

    await req.user.save();
    await budget.save();

    res.send(budget);
  })
);

// @route   GET api/budgets/:budgetId/:transactionId
// @desc    Get a single transaction
// @access  Public
router.get(
  "/:budgetId/:transactionId",
  requireLogin,
  myAsync(async (req, res, next) => {
    let budget = await Budget.findById(req.params.budgetId);
    // console.log(budget);

    if (!budget) return next(errors.notFound);

    let transaction = budget.transactions.id(req.params.trasnsactionId);

    // console.log(transaction);

    if (!transaction) return next(errors.notFound);

    res.send(transaction);
  })
);

// @route   PATCH api/budgets/:budgetId/:transactionId
// @desc    Update a single transaction
// @access  Public
router.put(
  "/:budgetId/:transactionId",
  requireLogin,
  myAsync(async (req, res, next) => {
    // console.log(req.body);
    const { error } = validateTransaction(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { description, amount } = req.body;
    const newTransaction = { description, amount };

    let budget = await Budget.findOne({ _id: req.params.budgetId });

    if (!budget) return next(errors.notFound);

    let transaction = budget.transactions.id(req.params.transactionId);

    if (!transaction) return next(errors.notFound);

    budget.amount += transaction.amount - amount;

    transaction.set(newTransaction);

    await budget.save();

    res.send(budget);
  })
);

module.exports = router;
