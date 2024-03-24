const { Venue, validate } = require("../models/venue");
const express = require("express");
const router = express.Router();
const venues = require("../mockdata/venues");
const calculateDistance = require("../utils/calculateDistance");

router.get("/", async (req, res) => {
  const venues = await Venue.find();
  res.send(venues);
});

router.post("/filter", async (req, res) => {
  const location = req.body.location;
  const maxDistance = req.body.maxDistance;
  const categoryIds = req.body.categoryIds;
  const accessibilityCriteria = req.body.accessibilityCriteria;
  const searchTerm = req.body.searchTerm;
  const showMixedReviews = req.body.showMixedReviews;
  const showNoReviews = req.body.showNoReviews;

  const accessibilityFilter = (accessibility) => {
    if (showMixedReviews) {
      return accessibility.reportedFor > 0;
    }
    if (showNoReviews) {
      return true;
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

    filteredVenues.sort((a, b) => a.distanceToUser - b.distanceToUser);

    res.send(filteredVenues);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
