const express = require("express");
const {
  searchChampionsLol,
  searchMasteryChampions,
  searchPuuid,
} = require("../models/newModels");
const router = express.Router();

router.get("/account/:gameName/:tagLine", searchPuuid);
// router.get("/champions", search);
router.get("/masteryChampionsUser/:puuid", searchMasteryChampions);
router.get("/champions", searchChampionsLol);

module.exports = router;
