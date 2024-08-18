const express = require("express");
const { searchAccoutGame } = require("../models/newModels");
const router = express.Router();

router.get("/search/:gameName/:tagLine", searchAccoutGame);

module.exports = router;
