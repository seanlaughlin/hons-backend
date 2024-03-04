const Joi = require("joi");
const mongoose = require("mongoose");

const AccessCriteria = mongoose.model(
  "AccessCriteria",
  new mongoose.Schema({
    criteria: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  })
);

function validateAccessCriteria(criteria) {
  const schema = {
    criteria: Joi.string().min(3).max(20).required(),
    name: Joi.string().min(3).max(20).required(),
    title: Joi.string().min(3).max(20).required(),
  };

  return Joi.validate(criteria, schema);
}

exports.AccessCriteria = AccessCriteria;
exports.validate = validateAccessCriteria;
