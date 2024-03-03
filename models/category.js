const Joi = require("joi");
const mongoose = require("mongoose");

const VenueCategory = mongoose.model(
  "VenueCategory",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    name: {
      type: String,
      required: true,
    },
    imageUri: {
      type: String,
      required: false,
    },
  })
);

function validateVenueCategory(category) {
  const schema = {
    title: Joi.string().min(3).required(),
    name: Joi.string().required(),
    imageUri: Joi.string(),
  };

  return Joi.validate(category, schema);
}

exports.VenueCategory = VenueCategory;
exports.validate = validateVenueCategory;
