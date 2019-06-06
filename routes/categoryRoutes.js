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

    if (!budget) return next(errors.processReq);

    let category = new Category({});

    await category.save();

    budget.categories.push(category);

    await budget.save();

    res.send(budget);
  })
);

router.post(
  "/:budgetId/categories/:categoryId",
  requireLogin,
  myAsync(async (req, res, next) => {
    let budget = await Budget.findById(req.params.budgetId).populate(
      "categories"
    );

    if (!budget) return next(errors.processReq);

    let category = await Category.findById(req.params.categoryId);

    if (!category) return next(errors.processReq);

    category.categoryitems.push(req.body);

    await category.save();

    await budget.save();

    res.send(budget);
  })
);

router.delete(
  "/:budgetId/categories/:categoryId",
  requireLogin,
  myAsync(async (req, res, next) => {
    let category = await Category.findByIdAndRemove(req.params.categoryId);

    res.send(category);
  })
);

module.exports = router;
