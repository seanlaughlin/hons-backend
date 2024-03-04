const { AccessReview, validate } = require("../models/accessReview");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await AccessReview.find();
  res.send(result);
});

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  const result = await AccessReview.findOne({ id: id });
  if (result) res.send(result);
  else res.status(404).send();
});

module.exports = router;
