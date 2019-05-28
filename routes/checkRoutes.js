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
    // add validation
    const { error } = validateCheck(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let budget = await Budget.findOne({ _id: req.params.budgetId });

    budget.paychecks.unshift(req.body);

    budget.amount += req.body.checkamount;

    await budget.save();

    res.send(budget);
  })
);

module.exports = router;
