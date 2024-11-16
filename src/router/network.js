const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const {
  uploadData,
  getData,
  searchData,
  editData,
  addData,
  logout,
  login,
  signup,
} = require("../controller");

const network = express.Router();

network.post("/upload-data", uploadData);

network.post("/add-data", addData);

network.get("/get-data", getData);

network.get("/search", searchData);

network.put("/update/:id", editData);

network.post("/signup", signup);

network.post("/login", login);

module.exports = network;
