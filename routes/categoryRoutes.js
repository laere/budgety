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

router.post(
  "/:budgetId/categories/:categoryId",
  requireLogin,
  myAsync(async (req, res, next) => {
    // let budget = await Budget.findById(req.params.budgetId).populate(
    //   "categories"
    // );

    console.log(req.params.categoryId);

    // if (!budget) return next(errors.processReq);

    let category = await Category.findById(req.params.categoryId);

    if (!category) return next(errors.processReq);

    category.categoryitems.push(req.body);

    await category.save();
    //
    // await budget.save();

    res.send(category);
  })
);

router.delete(
  "/:budgetId/categories/:categoryId",
  requireLogin,
  myAsync(async (req, res, next) => {
    let category = await Category.findByIdAndRemove(req.params.categoryId);

    if (!category) return next(errors.processReq);

    res.send(category);
  })
);

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

// router.put(
//   "/:budgetId/categories/:categoryId/categoryitems",
//   requireLogin,
//   myAsync(async (req, res, next) => {
//     console.log(req.body);
//     let category = await Category.findOneAndUpdate(
//       { _id: req.params.categoryId },
//       { $set: req.body },
//       { new: true }
//     );
//
//     res.send(category);
//   })
// );

router.delete(
  "/:budgetId/categories/:categoryId/:categoryItemId",
  requireLogin,
  myAsync(async (req, res, next) => {
    let category = await Category.findById(req.params.categoryId);

    if (!category) return next(errors.processReq);

    let categoryItem = category.categoryitems.id(req.params.categoryItemId);

    console.log("CATEGORY ITEM", categoryItem);

    categoryItem.remove();

    await category.save();

    res.send(category);
  })
);

module.exports = router;
