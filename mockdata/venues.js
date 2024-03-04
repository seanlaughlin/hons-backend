const { ObjectId } = require("mongodb");

const venues = [
  {
    name: "The Gaelic School",
    address: "123 The mad Street Glasgow G3 8LS",
    neighbourhood: "Finnieston",
    openingHours: [
      { time: "Mon - Fri", hours: "9am - 7pm" },
      { time: "Sat", hours: "9am - 10pm" },
      { time: "Sun", hours: "Closed" },
    ],
    contact: {
      phone: "0141 334 9435",
      email: "gaelicschool@council.co.uk",
      website: "glasgowgaelicschool.co.uk",
    },
    coords: { latitude: 55.86506, longitude: -4.27778 },
    type: "school",
    category: new ObjectId("65e4ce2aed4632029aef1964"),
    imageUris: ["../assets/school.jpg"],
    accessibility: [
      {
        criteria: "wheelchair",
        name: "Wheelchair Accessible",
        reportedFor: 2,
        reportedAgainst: 0,
      },
      {
        criteria: "asdFriendly",
        name: "ASD Friendly",
        reportedFor: 1,
        reportedAgainst: 0,
      },
      {
        criteria: "quiet",
        name: "Quiet",
        reportedFor: 3,
        reportedAgainst: 0,
      },
      {
        criteria: "automaticNoDoors",
        name: "Automatic/No Doors",
        reportedFor: 2,
        reportedAgainst: 0,
      },
    ],
  },
  {
    id: "fg45sddf",
    name: "Lloyds Pharmacy",
    address: "124 The Mad Street, Glasgow G3 8LS",
    neighbourhood: "Finnieston",
    openingHours: [
      { time: "Mon - Fri", hours: "9am - 7pm" },
      { time: "Sat", hours: "9am - 10pm" },
      { time: "Sun", hours: "Closed" },
    ],
    contact: {
      phone: "0141 334 9435",
      email: "gaelicschool@council.co.uk",
      web: "glasgowgaelicschool.co.uk",
    },
    coords: { latitude: 55.8632, longitude: -4.2757 },
    type: "pharmacy",
    category: new ObjectId("65e4ce2aed4632029aef196d"),
    imageUris: [
      "../assets/lloyds.jpg",
      "../assets/lloyds2.jpg",
      "../assets/lloyds3.jpg",
    ],
    accessibility: [
      {
        criteria: "wheelchair",
        name: "Wheelchair Accessible",
        reportedFor: 2,
        reportedAgainst: 0,
      },
      {
        criteria: "asdFriendly",
        name: "ASD Friendly",
        reportedFor: 1,
        reportedAgainst: 0,
      },
      {
        criteria: "quiet",
        name: "Quiet",
        reportedFor: 3,
        reportedAgainst: 3,
      },
    ],
  },
];

module.exports = venues;
