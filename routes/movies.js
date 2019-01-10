const { getMovies, getMovieById, validate } = require('../models/movie');
const express = require('express');
const router = express.Router();

/** 
 * GET: List of movie id, title, year
 *  with query parameters to sort by Title, Year
 */
router.get('/', (req, res) => {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(getMovies(), null, 4));
});
/**
 * GET: Movie details by Id
 */
router.get('/:id', (req, res) => {
    let movie = getMovieById(req.params.id);
    // if movie id not found, return 404 error
    if (!movie) return res.status(404).send('Movie not found');

    // else show movie details
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(movie, null, 4));
});

/**
 * POST: Create new movie
 */
router.post('/', (req, res) => {
    // validate new movie
    // get {result, error} with object destructuring
    const { result, error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // create new movie object and add to movies
    const movie = {
        id: movies.length + 1, // this would automatically be assigned if in real db
        title: result.value.title,
        year: result.value.year,
        genre: result.value.genre,
        director: result.value.director,
        cast: result.value.cast,
        poster: result.value.poster
    }
    movies.push(movie);
});

/**
 * PUT: Update movie by Id
 */
router.put('/:id', (req, res) => {
    // look up movie to check if it exists
    let movie = getMovieById(req.params.id);

    if (!movie) return res.status(404).send('Movie not found');

    // validate movie, get {error} with object destructuring 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // update movie values
    movie.title = req.body.title;
    movie.year = req.body.year;
    movie.genre = req.body.genre;
    movie.director = req.body.director;
    movie.cast = req.body.cast;
    movie.poster = req.body.poster;
    res.send(movie);
});

/**
 * DELETE: delete movie
 */
router.delete('/:id', (req, res) => {
    // check if movie exists
    let movie = getMovieById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');

    // delete movie
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movies)
});

module.exports = router;