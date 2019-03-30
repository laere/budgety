"use strict";
const mongoose = require("mongoose");
const keys = require("../config/keys");

// Executed once for your entire test suite.
before(done => {
  mongoose.connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  );
  //
  // mongoose.connection
  //   .once("open", () => {
  //     done();
  //   })
  //   .on("error", error => console.warn("Warning", error));
});

beforeEach(done => {
  console.log(mongoose.connection.collections);
});
