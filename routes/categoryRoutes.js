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
    console.log(req.params.budgetId);
    let budget = await Budget.findById(req.params.budgetId).populate(
      "categories"
    );

    if (!budget) return next(errors.processReq);

    console.log(req.params.budgetId);
    console.log(budget);

    let category = new Category({});

    await category.save();

    budget.categories.push(category);

    await budget.save();

    res.send(budget);
  })
);

// DELETE CATEGORY

router.delete(
  "/:budgetId/categories/:categoryId",
  requireLogin,
  myAsync(async (req, res, next) => {
    let category = await Category.findByIdAndRemove(req.params.categoryId);

    if (!category) return next(errors.processReq);

    res.send(category);
  })
);

// EDIT CATEGORY

router.put(
  "/:budgetId/categories/:categoryId",
  requireLogin,
  myAsync(async (req, res, next) => {
    console.log(req.body);
    let category = await Category.findOneAndUpdate(
      { _id: req.params.categoryId },
      { $set: req.body },
      { new: true }
    );

    res.send(category);
  })
);

// POST CATEGORY ITEM

router.post(
  "/:budgetId/categories/:categoryId",
  requireLogin,
  myAsync(async (req, res, next) => {
    // let budget = await Budget.findById(req.params.budgetId).populate(
    //   "categories"
    // );

    console.log("CATEGORY ITEM", req.body);

    // if (!budget) return next(errors.processReq);

    const { categoryId } = req.params;

    let category = await Category.findById(categoryId);

    if (!category) return next(errors.processReq);

    const { categoryitems } = category;

    categoryitems.push(req.body);

    console.log(category);

    // We know the item added will always be the alst in the array
    // let addedCategoryItem = categoryitems[categoryitems.length - 1];

    await category.save();
    //
    // await budget.save();

    res.send(category);
  })
);

router.put(
  "/:budgetId/categories/:categoryId/:categoryItemId",
  requireLogin,
  myAsync(async (req, res, next) => {
    // {name: Untitled, spent: 100}
    // console.log(req.body);

    // console.log(req.params.categoryId);
    let budget = await Budget.findById(req.params.budgetId).populate(
      "categories"
    );
    let category = await Category.findById(req.params.categoryId);

    console.log("CATEGORY", category);

    // 600
    let totalSpent = category.totalspent;

    let categoryItem = category.categoryitems.id(req.params.categoryItemId);
    //
    // console.log(totalSpent);
    // console.log("CAT ITEM", categoryItem);

    // { name: Untitled, spent: 100}
    const newCheckItemProps = { ...req.body };
    // 600, 100
    // console.log("SPENT", newCheckItemProps.spent);

    categoryItem.set(newCheckItemProps);

    const newTotal = category.calculateSpentTotal();

    // console.log("new total", newTotal);

    category.set("totalspent", newTotal);

    budget.calculateBudgetAmount(totalSpent, newTotal);

    await budget.save();
    await category.save();

    // let category = await Category.findOneAndUpdate(
    //   {
    //     _id: req.params.categoryId,
    //     categoryitems: {
    //       $elemMatch: {
    //         _id: req.params.categoryItemId
    //       }
    //     }
    //   },
    //   {
    //     $set: {
    //       "categoryitems.$.name": req.body.name,
    //       "categoryitems.$.spent": req.body.spent
    //     }
    //   },
    //   { new: true }
    // );

    console.log(category);

    res.send({ budget, category });
  })
);

// DELETE CATEGORY ITEM

router.delete(
  "/:budgetId/categories/:categoryId/:categoryItemId",
  requireLogin,
  myAsync(async (req, res, next) => {
    let budget = await Budget.findById(req.params.budgetId);

    if (!budget) return next(errors.processReq);

    let category = await Category.findById(req.params.categoryId);

    console.log("Current cat total", category.totalspent);

    if (!category) return next(errors.processReq);

    let categoryItem = category.categoryitems.id(req.params.categoryItemId);

    console.log("CATEGORY ITEM", categoryItem);

    budget.amount += categoryItem.spent;

    categoryItem.remove();

    const newTotal = category.calculateSpentTotal();

    console.log(newTotal);

    category.set("totalspent", newTotal);

    await category.save();
    await budget.save();

    res.send({ category, budget });
  })
);

module.exports = router;
