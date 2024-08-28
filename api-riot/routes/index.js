const express = require("express");
const {
  searchChampionsLol,
  searchMasteryChampions,
  searchPuuid,
  searchRiotId,
} = require("../models/newModels");
const router = express.Router();

router.get("/account/:gameName/:tagLine", searchPuuid);
// router.get("/champions", search);
router.get("/masteryChampionsUser/:puuid", searchMasteryChampions);
router.get("/riotId/:puuid", searchRiotId);

module.exports = router;
