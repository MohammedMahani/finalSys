const uploadData = require("./uploadData");
const getData = require("./getData");
const searchData = require("./searchData");
const addData = require("./addData");
const editData = require("./editData");
const { signup, login, logout } = require("./auth");

module.exports = {
  uploadData,
  getData,
  searchData,
  addData,
  editData,
  signup,
  login,
  logout,
};
