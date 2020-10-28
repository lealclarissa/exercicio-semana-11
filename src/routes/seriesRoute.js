const express = require("express");
const router = express.Router();
const controller = require("../controllers/seriesController");

router.post("/", controller.createSerie);
router.get("/", controller.getAllSeries);
router.get("/:id", controller.getSerieById);
router.put("/:id", controller.updateSerie);
router.patch("/:id/liked", controller.updateLikedStatus);
router.delete("/:id", controller.deleteSerie);

module.exports = router;