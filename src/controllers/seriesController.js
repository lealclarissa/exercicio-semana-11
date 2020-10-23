const series = require("../models/series.json");
const fs = require("fs");

const createSerie = (req, res) => {
  const { id, name, genre, synopsis, liked, seasons } = req.body;
  series.push({ id, name, genre, synopsis, liked, seasons });
  fs.writeFile(
    "./src/models/series.json",
    JSON.stringify(series),
    "utf8",
    function (err) {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        console.log("A série foi gravada no arquivo com sucesso!");
        const serieFound = series.find((serie) => serie.id == id);
        res.status(200).send(serieFound);
      }
    }
  );
};

const getAllSeries = (req, res) => {
  res.status(200).send(series);
};

module.exports = { createSerie, getAllSeries };
