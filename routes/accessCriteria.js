const { AccessCriteria, validate } = require("../models/accessCriteria");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await AccessCriteria.find();
  console.info("Access Criteria request from: ", req.ip);
  res.send(result);
});

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  const result = await AccessCriteria.findOne({ id: id });
  res.send(result);
});

router.get("/criteria/:criteria", async (req, res) => {
  const criteria = req.params.criteria;
  console.log(criteria);
  const result = await AccessCriteria.findOne({ criteria: criteria });
  if (result) res.send(result);
  else res.status(404).send();
});

module.exports = router;
