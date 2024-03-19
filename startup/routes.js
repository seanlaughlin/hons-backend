const express = require("express");
const categories = require("../routes/categories");
const accessCriteria = require("../routes/accessCriteria");
const venues = require("../routes/venues");
const reviews = require("../routes/reviews");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/access", accessCriteria);
  app.use("/api/venues", venues);
  app.use("/api/reviews", reviews);
};
