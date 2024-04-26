const Joi = require("joi");
const { join } = require("lodash");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
  },
  address: {
    type: String,
    required: true,
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
      },
      email: {
        type: String,
      },
      website: {
        type: String,
      },
    },
  },
  coords: {
    type: {
      latitude: Number,
      longitude: Number,
    },
    required: true,
  },
  type: {
    type: Object,
    required: true,
  },
  category: {
    type: ObjectId,
    required: true,
  },
  imageUris: {
    type: Array,
  },
  accessibility: {
    type: Array,
  },
  distanceToUser: {
    type: Number,
  },
});

// Enable full-text search
venueSchema.index({
  name: "text",
  type: "text",
  address: "text",
  neighbourhood: "text",
});

const Venue = mongoose.model("Venue", venueSchema);

function validateVenue(venue) {
  const schema = {
    name: Joi.string().min(3).max(40).required(),
    address: Joi.string().required(),
    neighbourhood: Joi.string().required(),
    coords: Joi.object().required(),
    type: Joi.object().required(),
    category: Joi.objectId().required(),
    imageUris: Joi.array().required(),
  };

  return Joi.validate(venue, schema);
}

exports.Venue = Venue;
exports.validate = validateVenue;
