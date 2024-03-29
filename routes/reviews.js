const { AccessReview, validate } = require("../models/accessReview");
const { Venue } = require("../models/venue");
const express = require("express");
const router = express.Router();
const multer = require("multer");

const imageResize = require("../middleware/imageResize");

const outputFolder = "assets/review-images";

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

router.post("/", async (req, res) => {
  const { accessCriteria, venueId } = req.body;
  const result = await AccessReview.find({
    accessCriteria: accessCriteria,
    venueId: venueId,
  });
  res.send(result);
});

router.post(
  "/save",
  [
    upload.single("image"),
    (req, res, next) => imageResize(req, res, next, outputFolder),
  ],
  async (req, res) => {
    if (!req.file) {
      console.log("No image uploaded");
    }

    const review = {
      user: req.body.user,
      accessCriteria: req.body.accessCriteria,
      comment: req.body.comment,
      venueId: req.body.venueId,
      for: req.body.for,
      date: new Date(req.body.date),
    };
    if (req.image) review.image = req.image;

    try {
      const result = await AccessReview.create(review);

      // Increment reportedFor or reportedAgainst of the matching venue
      const venue = await Venue.findById(req.body.venueId);

      if (!venue) {
        return res.status(404).send("Venue not found");
      }

      // Update reportedFor or reportedAgainst based on the 'for' property of the review
      const fieldToUpdate =
        review.for === "true" ? "reportedFor" : "reportedAgainst";
      venue.accessibility.forEach((access) => {
        if (access.name === review.accessCriteria) {
          access[fieldToUpdate]++;
        }
      });

      await Venue.findByIdAndUpdate(req.body.venueId, venue);

      res.status(200).send(result);
    } catch (err) {
      console.error("Error saving review:", err);
      res.status(500).send("Internal server error - Unable to save.");
    }
  }
);

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  const result = await AccessReview.findOne({ id: id });
  if (result) res.send(result);
  else res.status(404).send();
});

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  const result = await AccessReview.findOne({ id: id });
  if (result) res.send(result);
  else res.status(404).send();
});

module.exports = router;
