const Joi = require("joi");
const mongoose = require("mongoose");

const AccessCriteria = mongoose.model(
  "AccessCriteria",
  new mongoose.Schema({
    critieria: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
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
