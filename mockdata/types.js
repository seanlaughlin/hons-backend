const { ObjectId } = require("mongodb");

const types = [
  {
    name: "school",
    title: "School",
    category: new ObjectId("65e4ce2aed4632029aef1964"),
  },
  {
    name: "university",
    title: "University",
    category: new ObjectId("65e4ce2aed4632029aef1964"),
  },
  {
    name: "college",
    title: "college",
    category: new ObjectId("65e4ce2aed4632029aef1964"),
  },
  {
    name: "hospital",
    title: "Hospital",
    category: new ObjectId("65e4ce2aed4632029aef196d"),
  },
  {
    name: "healthcentre",
    title: "Health Centre",
    category: new ObjectId("65e4ce2aed4632029aef196d"),
  },
  {
    name: "pharmacy",
    title: "Pharmacy",
    category: new ObjectId("65e4ce2aed4632029aef196d"),
  },
  {
    name: "library",
    title: "Library",
    category: new ObjectId("65e4ce2aed4632029aef1967"),
  },
  {
    name: "newsagent",
    title: "Newsagent",
    category: new ObjectId("65e4ce2aed4632029aef1969"),
  },
  {
    name: "supermarket",
    title: "Supermarket",
    category: new ObjectId("65e4ce2aed4632029aef1969"),
  },
  {
    name: "bakery",
    title: "Bakery",
    category: new ObjectId("65e4ce2aed4632029aef1969"),
  },
  {
    name: "butchers",
    title: "Butchers",
    category: new ObjectId("65e4ce2aed4632029aef1969"),
  },
  {
    name: "sportscentre",
    title: "Sports Centre",
    category: new ObjectId("65e4ce2aed4632029aef196b"),
  },
  {
    name: "park",
    title: "Park",
    category: new ObjectId("65e4ce2aed4632029aef196b"),
  },
  {
    name: "swimmingpool",
    title: "Swimming Pool",
    category: new ObjectId("65e4ce2aed4632029aef196b"),
  },
  {
    name: "railstation",
    title: "Rail Station",
    category: new ObjectId("65e4ce2aed4632029aef196f"),
  },
  {
    name: "busstation",
    title: "Bus Station",
    category: new ObjectId("65e4ce2aed4632029aef196f"),
  },
];

module.exports = types;
