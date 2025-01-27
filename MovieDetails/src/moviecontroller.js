const movieService = require('./movieservice')

const getMovies = (done) => {
  movieService.getMovies(done)
}

const getMovieById = (movieId, done) => {
  movieService.getMovieById(movieId, done)
}

const saveMovieDetails = (movieDetails, done) => {
  movieService.saveMovieDetails(movieDetails, done)
}

const updateMovieDetails = (movieId, movieDetails, done) => {
  movieService.updateMovieDetails(movieId, movieDetails, done)
}

const deleteMovieById = (movieId, done) => {
  movieService.deleteMovieById(movieId, done)
}

module.exports = {
  getMovies, getMovieById, saveMovieDetails, updateMovieDetails, deleteMovieById
}
