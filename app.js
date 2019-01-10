/**
 * This is a basic example of a RESTful API in Node.js
 * 
 * Uses the Node.js Express web application framework
 * Handles standard HTTP GET, POST, PUT, DELETE requests
 * This example app interacts with a json object, but can be changed to access a MongoDB 
 * For this example the db object is a directory of Movies
 */
const helmet = require('helmet');
const movies = require('./routes/movies');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// format body as json
app.use(express.json());
// helmet to ensure proper headers are passed
// app.use(helmet());

/**
 * Set /api/movies resource to movies router
 * GET /api/movies          returns all movies in db
 * GET /api/movies/id       return details of single movie
 * POST /api/movies         add new movie to db
 * PUT /api/movies/id       update single movie
 * DELETE /api/movies/id    delete single movie from db
 */
app.use('/api/movies', movies)

app.listen(port, () => console.log(`Listening on port ${port}...`));