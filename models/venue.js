const Joi = require("joi");
const { join } = require("lodash");
const mongoose = require("mongoose");

const Venue = mongoose.model(
  "Venue",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 40,
    },
    address: {
      type: String,
      required: true,
      minLength: 15,
    },
    neighbourhood: {
      type: String,
    },
    openingHours: {
      type: Array,
    },
    contact: {
      type: {
        phone: {
          type: String,
          required: true,
          minLength: 11,
        },
        email: {
          type: String,
          minLength: 5,
        },
        website: {
          type: String,
          minLength: 3,
        },
      },
    },
  })
);

function validateVenue(venue) {
  const schema = {
    name: Joi.min(5).max(40).required(),
    address: Joi.min(15).required(),
  };

  return Joi.validate(venue, schema);
}

exports.Venue = Venue;
exports.validate = validateVenue;
