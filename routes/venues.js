const { Venue, validate } = require("../models/venue");
const express = require("express");
const router = express.Router();
const venues = require("../mockdata/venues");
const calculateDistance = require("../utils/calculateDistance");

router.get("/", async (req, res) => {
  const venues = await Venue.find();
  res.send(venues);
});

router.get("/filter", async (req, res) => {
  const location = req.body.location;
  const maxDistance = req.body.maxDistance;
  const categoryIds = req.body.categoryIds;
  const accessibilityCriteria = req.body.accessibilityCriteria;

  if (!location.latitude || !location.longitude || !maxDistance) {
    return res.status(400).send("Invalid input");
  }

  try {
    let query = Venue.find({
      "coords.latitude": { $exists: true },
      "coords.longitude": { $exists: true },
    });

    if (categoryIds.length > 0) {
      query = query.where("category").in(categoryIds);
    }

    if (accessibilityCriteria.length > 0) {
      query = query.where({
        "accessibility.criteria": { $in: accessibilityCriteria },
        $expr: {
          $gt: [
            {
              $divide: [
                "$accessibility.reportedFor",
                {
                  $add: [
                    "$accessibility.reportedFor",
                    "$accessibility.reportedAgainst",
                  ],
                },
              ],
            },
            0.7,
          ],
        },
      });
    }

    const nearbyVenues = await query.lean();

    const filteredVenues = nearbyVenues.filter((venue) => {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        venue.coords.latitude,
        venue.coords.longitude
      );
      return distance <= maxDistance;
    });

    res.send(filteredVenues);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
