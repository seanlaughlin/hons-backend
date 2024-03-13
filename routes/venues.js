const { Venue, validate } = require("../models/venue");
const express = require("express");
const router = express.Router();
const venues = require("../mockdata/venues");
const calculateDistance = require("../utils/calculateDistance");

router.get("/", async (req, res) => {
  const venues = await Venue.find();
  res.send(venues);
});

// only filters if does have one of accessibiltiies supplied - doesn't filter out if doesn't have others
router.post("/filter", async (req, res) => {
  const location = req.body.location;
  const maxDistance = req.body.maxDistance;
  const categoryIds = req.body.categoryIds;
  const accessibilityCriteria = req.body.accessibilityCriteria;
  const searchTerm = req.body.searchTerm;

  if (!location || !location.latitude || !location.longitude) {
    return res.status(400).send("Invalid input");
  }

  try {
    let query = Venue.find({
      "coords.latitude": { $exists: true },
      "coords.longitude": { $exists: true },
    });

    if (categoryIds && categoryIds.length > 0) {
      query = query.where("category").in(categoryIds);
    }

    if (accessibilityCriteria && accessibilityCriteria.length > 0) {
      accessibilityCriteria.forEach((criteria) => {
        query = query.where("accessibility.criteria").equals(criteria);
      });
    }

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
