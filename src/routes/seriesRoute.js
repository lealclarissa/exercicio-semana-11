const express = require("express");
const router = express.Router();
const controller = require("../controllers/seriesController");

router.post("/", controller.createSerie);

module.exports = router;
