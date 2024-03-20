const { ObjectId } = require("mongodb");

const accessReviews = [
  {
    venueId: new ObjectId("65e5b6508829454b36be87d4"),
    accessCriteria: "Automatic/No Doors",
    user: "BigJim",
    date: new Date(),
    for: true,
    comment: "No automatic doors, but owner leaves doors open usually.",
    imageUri: [],
  },
  {
    venueId: new ObjectId("65e5b6508829454b36be87d1"),
    accessCriteria: "ASD Friendly",
    user: "PurpleDuck221",
    date: new Date(),
    for: true,
    comment:
      "Staff are patient and friendly. Staff are patient and friendly.Staff are patient and friendly.Staff are patient and friendly.Staff are patient and friendly.Staff are patient and friendly.",
    imageUri: [],
  },
  {
    venueId: new ObjectId("65e5b6508829454b36be87d1"),
    accessCriteria: "Wheelchair Accessible",
    user: "BigJim",
    date: new Date(),
    for: true,
    comment: "Good",
    imageUri: [],
  },
];

module.exports = accessReviews;
