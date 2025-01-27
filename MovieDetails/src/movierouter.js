
const express = require('express')
const router = express.Router()
const movieController = require('./moviecontroller')

router.get("/", (req, res) => {
  try {
    movieController.getMovies((err, results) => {
      if (err) {
        return res.status(400).send(err)
      }
      return res.status(200).send({ status: 'OK', data: results })
    })
  } catch (err) {
    return res.status(500).send('Unexpected system error; try again later.');
  }
});

router.get("/:movieId", (req, res) => {
  try {
    const movieId = req.params.movieId
    movieController.getMovieById(movieId, (err, results) => {
      if (err) {
        return res.status(400).send(err)
      }
      return res.status(200).send({ status: 'OK', data: results })
    });
  } catch (err) {
    return res.status(500).send('Unexpected system error; try again later.');
  }
});

router.post("/", (req, res) => {
  try {
    const movieDetails = req.body
    movieController.saveMovieDetails(movieDetails, (err, results) => {
      if (err) {
        return res.status(400).send(err)
      }
      return res.status(201).send({ status: 'OK', data: results })
    });
  } catch (err) {
    return res.status(500).send('Unexpected system error; try again later.');
  }
});

router.patch("/:movieId", (req, res) => {
  try {
    const movieId = req.params.movieId
    const movieDetails = req.body
    movieController.updateMovieDetails(movieId, movieDetails, (err, results) => {
      if (err) {
        return res.status(400).send(err)
      }
      return res.status(200).send({ status: 'OK', data: results })
    });
  } catch (err) {
    return res.status(500).send('Unexpected system error; try again later.');
  }
});

router.delete("/:movieId", (req, res) => {
  try {
    const movieId = req.params.movieId
    movieController.deleteMovieById(movieId, (err, results) => {
      if (err) {
        return res.status(400).send(err)
      }
      return res.status(200).send({ status: 'OK', data: results })
    })
  } catch (err) {
    return res.status(500).send('Unexpected system error; please try again later.')
  }
});

module.exports = router;
