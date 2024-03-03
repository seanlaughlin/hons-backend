const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const AccessReview = mongoose.model(
  "AccessReview",
  new mongoose.Schema({
    venueId: {
      type: ObjectId,
      required: true,
    },
    accessibilityId: {
      type: ObjectId,
      required: true,
    },
    user: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
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
    accessibilityId: Joi.objectId().required(),
    user: Joi.string().min(3).max(20).required(),
    for: Joi.boolean().required(),
    comment: Joi.string().max(200),
  };

  return Joi.validate(review, schema);
}

exports.AccessReview = AccessReview;
exports.validate = validateAccessReview;
