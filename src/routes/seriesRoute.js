const express = require("express");
const router = express.Router();
const controller = require("../controllers/seriesController");

router.post("/", controller.createSerie);
router.get("/", controller.getAllSeries);
router.get("/:id", controller.getSerieById);

module.exports = router;