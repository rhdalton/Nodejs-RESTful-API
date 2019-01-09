/**
 * This is a basic example of a RESTful API in Node.js
 * 
 * Uses the Node.js Express web application framework
 * Handles standard HTTP GET, POST, PUT, DELETE requests
 * This example app interacts with a json object, but can be changed to access a MongoDB 
 * For this example the db object is a directory of Movies
 */
const func = require('./functions');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// express middleware express.json()
app.use(express.json());

/** 
 * GET: List of movie id, title, year
 *  with query parameters to sort by Title, Year
 */
app.get('/api/movies', (req, res) => {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(func.getMovies(), null, 4));
});
/**
 * GET: Movie details by Id
 */
app.get('/api/movies/:id', (req, res) => {
    let movie = func.getMovieById(req.params.id);
    // if movie id not found, return 404 error
    if (!movie) return res.status(404).send('Movie not found');

    // else show movie details
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(movie, null, 4));
});

/**
 * POST: Create new movie
 */
app.post('/api/movies', (req, res) => {
    // validate new movie
    // get {result, error} with object destructuring
    const { result, error } = func.validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // create new movie object and add to movies
    const movie = {
        id: movies.length + 1, // this would automatically be assigned if in real db
        title: result.value.title,
        year: result.value.year,
        director: result.value.director,
        cast: result.value.cast,
        poster: result.value.poster
    }
    movies.push(movie);
});

/**
 * PUT: Update movie by Id
 */
app.put('/api/movies/:id', (req, res) => {
    // look up movie to check if it exists
    let movie = func.getMovieById(req.params.id);

    if (!movie) return res.status(404).send('Movie not found');

    // validate movie, get {error} with object destructuring 
    const { error } = func.validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // update movie values
    movie.title = req.body.title;
    movie.year = req.body.year;
    movie.director = req.body.director;
    movie.cast = req.body.cast;
    movie.poster = req.body.poster;
    res.send(movie);
});

/**
 * DELETE: delete movie
 */
app.delete('/api/movies/:id', (req, res) => {
    // check if movie exists
    let movie = func.getMovieById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');

    // delete movie
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movies)
});

app.listen(port, () => console.log(`Listening on port ${port}...`));