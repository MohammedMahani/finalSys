const router = require("express").Router();
const network = require("./network");

router.use("/", network);

module.exports = router;
