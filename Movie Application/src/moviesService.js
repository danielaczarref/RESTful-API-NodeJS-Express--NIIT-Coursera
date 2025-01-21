const lodash = require("lodash");
const movieList = require('../data/movies.json').movies;

const getMovies = (done) => {
  return done(null, JSON.stringify(movieList))
}

const getMoviesById = (movieId, done) => {
  const movie = lodash.find(movieList, { id: parseInt(movieId) });
    if (movie) {
      return done(null, JSON.stringify(movie));
    } else {
      return done("Movie not found", null);
    }
}

const saveMovie = function (newMovie, done) {
  if (!newMovie.id || lodash.find(movieList, { id: newMovie.id })) {
      return done(`Movie already exists with id ${newMovie.id}`, null);
    }
    movieList.push(newMovie);
    return done(null, JSON.stringify(movieList));
  }

const updateMovie = function (movieId, updateData, done) {
 const index = lodash.findIndex(movieList, { id: parseInt(movieId) });
   if (index === -1) {
     return done("Requested movie doesn't exist.", null);
   }
   lodash.merge(movieList[index], updateData);
   return done(null, JSON.stringify(movieList));
}

const deleteMovieById = function (movieId, done) {
  const index = lodash.findIndex(movieList, { id: parseInt(movieId) });
    if (index === -1) {
      return done("Requested movie doesn't exist.", null);
    }
    movieList.splice(index, 1);
    return done(null, JSON.stringify(movieList));
}



module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
