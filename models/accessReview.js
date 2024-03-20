const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const AccessReview = mongoose.model(
  "AccessReview",
  new mongoose.Schema({
    venueId: {
      type: ObjectId,
      required: true,
    },
    accessCriteria: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    date: {
      type: Date,
      required: true,
    },
    for: {
      type: Boolean,
      required: true,
      default: true,
    },
    comment: {
      type: String,
      required: false,
      maxlength: 200,
    },
  })
);

function validateAccessReview(review) {
  const schema = {
    venueId: Joi.objectId().required(),
    accessCriteria: Joi.string().required(),
    user: Joi.string().min(3).max(20).required(),
    date: Joi.date().required(),
    for: Joi.boolean().required(),
    comment: Joi.string().max(200),
  };

  return Joi.validate(review, schema);
}

exports.AccessReview = AccessReview;
exports.validate = validateAccessReview;
