const axios = require('axios');
const BASE_URL = "http://localhost:3000/movies";

const getMovies = (done) => {
  axios.get(BASE_URL)
    .then((response) => {
      done(null, response.data);
    })
    .catch((error) => {
      done(error);
    });
};

const getMovieById = (movieId, done) => {
  axios.get(`${BASE_URL}/${movieId}`)
    .then((response) => {
      done(null, response.data);
    })
    .catch((error) => {
      done(error);
    });
};

const saveMovieDetails = (movieDetails, done) => {
  axios.post(BASE_URL, movieDetails)
    .then((response) => {
      done(null, response.data);
    })
    .catch((error) => {
      done(error);
    });
};

const updateMovieDetails = (movieId, movieDetails, done) => {
  axios.patch(`${BASE_URL}/${movieId}`, movieDetails)
    .then((response) => {
      done(null, response.data);
    })
    .catch((error) => {
      done(error);
    });
};

const deleteMovieById = (movieId, done) => {
  axios.delete(`${BASE_URL}/${movieId}`)
    .then((response) => {
      done(null, { message: 'Movie deleted successfully', data: response.data });
    })
    .catch((error) => {
      done(error);
    });
};

module.exports = {
  getMovies,
  getMovieById,
  saveMovieDetails,
  deleteMovieById,
  updateMovieDetails
};