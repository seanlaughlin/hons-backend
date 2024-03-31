const { Venue, validate } = require("../models/venue");
const express = require("express");
const router = express.Router();
const venues = require("../mockdata/venues");
const calculateDistance = require("../utils/calculateDistance");
const multer = require("multer");

const imageResize = require("../middleware/imageResize");
const { VenueCategory } = require("../models/category");
const { VenueType } = require("../models/type");
const { AccessCriteria } = require("../models/accessCriteria");

const outputFolder = "assets/venue-images";

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

router.get("/", async (req, res) => {
  const result = await Venue.find();
  if (result) res.send(result);
  else res.status(404).send();
});

router.post("/filter", async (req, res) => {
  const location = req.body.location;
  const maxDistance = req.body.maxDistance;
  const categoryIds = req.body.categoryIds;
  const typeIds = req.body.typeIds;
  const accessibilityCriteria = req.body.accessibilityCriteria;
  const searchTerm = req.body.searchTerm;
  const showMixedReviews = req.body.showMixedReviews;
  const showNoReviews = req.body.showNoReviews;

  const accessibilityFilter = (accessibility) => {
    if ((showMixedReviews && showNoReviews) || showNoReviews) {
      return (
        (accessibility.reportedFor > 0 && accessibility.reportedAgainst > 0) ||
        accessibility.reportedFor + accessibility.reportedAgainst === 0 ||
        (accessibility.reportedFor > 0 && accessibility.reportedAgainst === 0)
      );
    } else if (showMixedReviews) {
      return accessibility.reportedFor > 0;
    } else {
      return (
        accessibility.reportedFor > 0 && accessibility.reportedAgainst === 0
      );
    }
  };

  if (!location || !location.latitude || !location.longitude) {
    return res.status(400).send("No user location provided.");
  }

  try {
    let query = Venue.find({
      "coords.latitude": { $exists: true },
      "coords.longitude": { $exists: true },
    });

    if (categoryIds && categoryIds.length > 0) {
      query = query.where("category").in(categoryIds);
    }

    accessibilityCriteria.forEach((criteria) => {
      query = query.where("accessibility").elemMatch({ criteria: criteria });
    });

    if (searchTerm) {
      const searchTermsArray = searchTerm.split(" ");
      const regexArray = searchTermsArray.map((term) => new RegExp(term, "i"));
      query = query.find({
        $and: regexArray.map((termRegex) => ({
          $or: [
            { name: { $regex: termRegex } },
            { neighbourhood: { $regex: termRegex } },
            { type: { $regex: termRegex } },
            { address: { $regex: termRegex } },
            {
              "accessibility.name": { $regex: termRegex },
            },
          ],
        })),
      });
    }

    const nearbyVenues = await query.lean();

    let filteredVenues = nearbyVenues;
    if (maxDistance) {
      filteredVenues = nearbyVenues.filter((venue) => {
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          venue.coords.latitude,
          venue.coords.longitude
        );
        return distance <= maxDistance;
      });
    }

    filteredVenues = filteredVenues.filter((venue) => {
      return accessibilityCriteria.every((criteria) => {
        const matchedAccessibility = venue.accessibility.find(
          (access) => access.criteria === criteria
        );
        return (
          matchedAccessibility && accessibilityFilter(matchedAccessibility)
        );
      });
    });

    filteredVenues = filteredVenues.map((venue) => ({
      ...venue,
      distanceToUser: calculateDistance(
        location.latitude,
        location.longitude,
        venue.coords.latitude,
        venue.coords.longitude
      ).toFixed(2),
    }));

    if (typeIds && typeIds.length > 0) {
      filteredVenues = filteredVenues.filter((venue) =>
        typeIds.includes(venue.type._id.toString())
      );
    }

    filteredVenues.sort((a, b) => a.distanceToUser - b.distanceToUser);

    res.send(filteredVenues);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/save",
  [
    upload.array("images"),
    (req, res, next) => imageResize(req, res, next, outputFolder),
  ],
  async (req, res) => {
    if (!req.files) {
      console.log("No images uploaded");
    }

    const venue = {
      name: req.body.name,
      address: req.body.address,
      coords: JSON.parse(req.body.coords),
      neighbourhood: req.body.neighbourhood,
      openingHours: [],
      contact: {},
    };
    if (req.image) venue.imageUris = [req.image];
    if (req.images) venue.imageUris = req.images;

    if (req.body.openingHours) {
      venue.openingHours = JSON.parse(req.body.openingHours);
    }

    if (req.body.contact) {
      venue.contact = JSON.parse(req.body.contact);
    }

    const accessCategories = await AccessCriteria.find();
    const accessibility = accessCategories.map((item) => ({
      criteria: item.criteria,
      name: item.name,
      reportedFor: 0,
      reportedAgainst: 0,
    }));

    const category = await VenueCategory.findOne({ title: req.body.category });
    const type = await VenueType.findOne({ title: req.body.type });
    venue.category = category._id;
    venue.type = type;
    venue.accessibility = accessibility;
    try {
      const result = await Venue.create(venue);
      res.status(200).send(result);
    } catch (err) {
      console.error("Error saving venue:", err);
      res.status(500).send("Internal server error - Unable to save.");
    }
  }
);

module.exports = router;
