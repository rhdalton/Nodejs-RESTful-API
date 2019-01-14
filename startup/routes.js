
const movies = require('../routes/movies');
const people = require('../routes/people');
const users = require('../routes/users');
const genres = require('../routes/genres');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const express = require('express');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/movies', movies);
    app.use('/api/people', people);
    app.use('/api/genres', genres);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    // catch Express errors in error.js middleware
    app.use(error);
}