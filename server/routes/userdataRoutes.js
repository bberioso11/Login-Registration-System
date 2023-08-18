const express = require("express");
const router = express.Router();
const { getUserData } = require("../controller/userdataController");

router.get("/get-userdata", getUserData);

module.exports = router;
