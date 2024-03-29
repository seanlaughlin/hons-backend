const { VenueType, validate } = require("../models/type");
const express = require("express");
const router = express.Router();
const types = require("../mockdata/types");

router.get("/", async (req, res) => {
  const result = await VenueType.find();
  console.info("Venue types request from: ", req.ip);
  res.send(result);
});

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  const result = await VenueType.findOne({ id: id });
  if (result) res.send(result);
  else res.status(404).send();
});

router.get("/category/:id", async (req, res) => {
  const category = req.params.id;
  const result = await VenueType.findOne({ category: category });
  if (result) res.send(result);
  else res.status(404).send();
});

router.post("/categories", async (req, res) => {
  const categoryIds = req.body.categoryIds;
  const types = await VenueType.find({ category: { $in: categoryIds } });
  if (types) res.status(200).send(types);
  else res.status(404).send();
});
module.exports = router;
