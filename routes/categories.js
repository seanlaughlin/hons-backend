const { VenueCategory, validate } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await VenueCategory.find();
  res.send(result);
});

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  const result = await VenueCategory.findOne({ id: id });
  if (result) res.send(result);
  else res.status(404).send();
});

router.get("/name/:name", async (req, res) => {
  const name = req.params.name;
  const result = await VenueCategory.findOne({ name: name });
  if (result) res.send(result);
  else res.status(404).send();
});

module.exports = router;
