const { ObjectId } = require("mongodb");

const accessReviews = [
  {
    venueId: new ObjectId("65e5b6508829454b36be87d4"),
    accessId: new ObjectId("65e4e2f3eb8923aefd07ad3f"),
    user: "BigJim",
    date: new Date(),
    for: true,
    comment: "No automatic doors, but owner leaves doors open usually.",
    imageUri: [],
  },
  {
    venueId: new ObjectId("65e5b6508829454b36be87d1"),
    accessId: new ObjectId("65e4e2f3eb8923aefd07ad3d"),
    user: "PurpleDuck221",
    date: new Date(),
    for: true,
    comment:
      "Staff are patient and friendly. Staff are patient and friendly.Staff are patient and friendly.Staff are patient and friendly.Staff are patient and friendly.Staff are patient and friendly.",
    imageUri: [],
  },
  {
    venueId: new ObjectId("65e5b6508829454b36be87d1"),
    accessId: new ObjectId("65e4e2f3eb8923aefd07ad3d"),
    user: "BigJim",
    date: new Date(),
    for: true,
    comment: "Good",
    imageUri: [],
  },
];

module.exports = accessReviews;
