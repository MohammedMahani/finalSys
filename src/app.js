const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const csv = require("csv-parser");
const fs = require("fs");
const router = require("./router");

const app = express();
require("dotenv").config();

const { PORT } = process.env;
app.set("port", PORT || 5000);

app.disable("x-powered-by");
app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  express.static('public'),
  compression(),
  cookieParser(),
]);

app.get("/", (req, res) => {
  res.json([]);
});

app.use("/api/v1", router);
module.exports = app;
