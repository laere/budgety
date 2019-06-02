const mongoose = require("mongoose");
const myAsync = require("../middlewares/asyncMiddleware");
const requireLogin = require("../middlewares/requireLogin");
const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const validateCheck = require("../validation/validateCheck");
const errors = require("../errors/errors");

// @route   POST api/budgets/:budgetId/checks
// @desc    POST a single paycheck
// @access  Public
router.post(
  "/:budgetId/checks",
  requireLogin,
  myAsync(async (req, res, next) => {
    const { error } = validateCheck(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let budget = await Budget.findOne({ _id: req.params.budgetId });

    if (!budget) return next(errors.notFound);

    // console.log(budget);

    budget.paychecks.unshift(req.body);

    budget.amount += req.body.checkamount;

    await budget.save();

    res.send("Check was successfully added!");
  })
);

// @route   DELETE api/budgets/:budgetId/checks/:checkId
// @desc    DELETE a single paycheck
// @access  Public
router.delete(
  "/:budgetId/checks/:checkId",
  requireLogin,
  myAsync(async (req, res, next) => {
    let budget = await Budget.findOne({ _id: req.params.budgetId });

    if (!budget) return next(errors.notFound);

    let check = budget.paychecks.id(req.params.checkId);

    if (!check) return next(errors.notFound);

    budget.amount -= check.checkamount;

    check.remove();

    await budget.save();

    res.send("Check was successfully deleted!");
  })
);

// @route   EDIT api/budgets/:budgetId/checks/:checkId
// @desc    EDIT a single paycheck
// @access  Public
router.put(
  "/:budgetId/checks/:checkId",
  requireLogin,
  myAsync(async (req, res, next) => {
    let budget = await Budget.findOne({ _id: req.params.budgetId });

    if (!budget) return next(errors.notFound);

    let currentCheck = budget.paychecks.id(req.params.checkId);

    if (!currentCheck) return next(errors.notFound);

    let newCheck = { ...req.body };

    budget.calculateChecks(currentCheck.checkamount, newCheck.checkamount);

    currentCheck.set(newCheck);

    await budget.save();

    res.send("Check was successfully edited!");
  })
);

module.exports = router;
