const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const helmet = require("helmet");
app.use(helmet());
app.use(cors());

require("./db");
const routes = require("./routes");
app.use("/api", routes);

module.exports = app;
