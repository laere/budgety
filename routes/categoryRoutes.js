const mongoose = require("mongoose");
const myAsync = require("../middlewares/asyncMiddleware");
const requireLogin = require("../middlewares/requireLogin");
const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const Category = require("../models/Category");
const errors = require("../errors/errors");

router.post(
  "/:budgetId/categories",
  requireLogin,
  myAsync(async (req, res, next) => {
    console.log(req.body);
    let budget = await Budget.findById(req.params.budgetId).populate(
      "categories"
    );

    console.log(budget);

    if (!budget) return next(errors.processReq);

    let category = new Category({});

    await category.save();

    budget.categories.push(category);

    await budget.save();

    console.log(budget);

    res.send(budget);
  })
);

module.exports = router;
