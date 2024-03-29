const Joi = require("joi");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);

const VenueType = mongoose.model(
  "VenueType",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: ObjectId,
      required: true,
    },
  })
);

function validateType(type) {
  const schema = {
    name: Joi.string().required(),
    title: Joi.string().required(),
    category: Joi.objectId().required(),
  };
}
exports.VenueType = VenueType;
exports.validate = validateType;
