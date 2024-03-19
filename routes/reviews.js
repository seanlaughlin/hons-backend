const { AccessReview, validate } = require("../models/accessReview");
const express = require("express");
const router = express.Router();
const reviews = require("../mockdata/accessReviews");

router.post("/", async (req, res) => {
  const { accessId, venueId } = req.body;
  console.log(req.body);
  const result = await AccessReview.find({
    // accessId: accessId,
    venueId: venueId,
  });
  res.send(result);
});

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  const result = await AccessReview.findOne({ id: id });
  if (result) res.send(result);
  else res.status(404).send();
});

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  const result = await AccessReview.findOne({ id: id });
  if (result) res.send(result);
  else res.status(404).send();
});

router.get("/populate", async (req, res) => {
  const result = AccessReview.insertMany(reviews);
  res.send(result);
});

module.exports = router;
