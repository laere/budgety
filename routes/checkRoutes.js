const mongoose = require("mongoose");
const myAsync = require("../middlewares/asyncMiddleware");
const requireLogin = require("../middlewares/requireLogin");
const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const User = require("../models/User");
// const validateBudget = require("../validation/validateBudget");
const errors = require("../errors/errors");

router.post(
  "/:budgetId/checks",
  requireLogin,
  myAsync(async (req, res, next) => {
    // add validation

    console.log("Check", req.body);

    // find budget
    let budget = await Budget.findOne({ _id: req.params.budgetId });

    budget.paychecks.unshift(req.body);

    console.log(budget.amount);

    budget.amount += req.body.checkamount;

    await budget.save();

    console.log(budget);

    res.json(budget);
  })
);

module.exports = router;
