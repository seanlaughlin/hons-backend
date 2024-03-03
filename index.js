const config = require("config");
const express = require("express");
const logger = require("./logger");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error("Unable to connect to database: ", err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("tiny"));

app.use(logger);

app.use(function (req, res, next) {
  console.log("authentication");
  next();
});

app.get("/", (req, res) => {
  res.send("hello!!");
});

app.get("/api/courses/:id", (req, res) => {
  res.send(req.params.id);
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
