const winston = require("winston");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
