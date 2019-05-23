const mongoose = require("mongoose");
const myAsync = require("../middlewares/asyncMiddleware");
const requireLogin = require("../middlewares/requireLogin");
const express = require("express");
const router = express.Router();
const Check = require("../models/Check");
const User = require("../models/User");
// const validateBudget = require("../validation/validateBudget");
const errors = require("../errors/errors");

router.post(
  "/",
  requireLogin,
  myAsync(async (req, res, next) => {
    console.log(req.body);
    console.log(req.user);

    let check = new Check({ ...req.body, user: req.user.id });

    console.log("CHECK", check);

    await check.save();

    req.user.totalBalance += parseFloat(req.body.checkamount);

    const user = await req.user.save();

    res.send(user);
  })
);

router.get(
  "/",
  requireLogin,
  myAsync(async (req, res, next) => {
    let checks = await Check.find({ user: req.user.id }).sort({
      dateCreated: -1
    });

    if (!checks) return;

    res.send(checks);
  })
);

module.exports = router;
