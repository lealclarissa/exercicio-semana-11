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

const getSerieById = (req, res) => {
  const serieId = req.params.id;
  const serieFound = series.find((serie) => serie.id == serieId);

  if (serieFound) {
    res.status(200).send(serieFound);
  } else {
    res.status(404).send({ message: "Série não encontrada!" });
  }
};

const updateSerie = (req, res) => {
  const serieId = req.params.id;
  const serieToUpdate = req.body;

  const serieFound = series.find((serie) => serie.id == serieId);
  const serieIndex = series.indexOf(serieFound);

  if (serieIndex >= 0) {
    series.splice(serieIndex, 1, serieToUpdate);
    fs.writeFile(
      "./src/models/series.json",
      JSON.stringify(series),
      "utf8",
      function (err) {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          console.log("A série foi atualizada com sucesso");
          const serieUpdated = series.find((serie) => serie.id == serieId);
          res.status(200).send(serieUpdated);
        }
      }
    );
  } else {
    res
      .status(404)
      .send({ message: "A série a ser atualizada não foi encontrada!" });
  }
};

const updateLikedStatus = (req, res) => {
  try {
    const serieId = req.params.id;
    const newLiked = req.body.liked;

    const serieToUpdate = series.find((serie) => serie.id == serieId);
    const serieIndex = series.indexOf(serieToUpdate);

    if (serieIndex >= 0) {
      serieToUpdate.liked = newLiked;
      series.splice(serieIndex, 1, serieToUpdate);
      fs.writeFile(
        "./src/models/series.json",
        JSON.stringify(series),
        "utf8",
        function (err) {
          if (err) {
            res.status(500).send(err);
          } else {
            console.log("Arquivo de séries foi atualizado com sucesso!");
            const serieUpdated = series.find((serie) => serie.id == serieId);
            res.status(200).send(serieUpdated);
          }
        }
      );
    } else {
      res
        .status(404)
        .send({
          message:
            "A série cujo status 'liked' seria atualizado não foi encontrada!",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Erro na API");
  }
};

module.exports = {
  createSerie,
  getAllSeries,
  getSerieById,
  updateSerie,
  updateLikedStatus,
}