const express = require("express");
const categories = require("../routes/categories");
const accessCriteria = require("../routes/accessCriteria");
const venues = require("../routes/venues");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/accessCriteria", accessCriteria);
  app.use("/api/venues", venues);
};
