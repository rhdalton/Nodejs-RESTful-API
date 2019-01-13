const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const { Person } = require('../models/person');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

// Get All Movies Sorted by Title, public access
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

// Get Movie by Id, public access
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(movie);
});

// Create New Movie, is Authenticated and is Admin
router.post('/', [auth, admin], async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send('Error validation.');

    const genreArray = [];
    var arr = req.body.genreIds;
    for (var i = 0; i < arr.length; i++) {
        var genre = await Genre.findById(arr[i]);
        if (genre) {
            genreArray.push({ _id: genre, name: genre.name });
        }
    }
    
    const directorArray = [];
    arr = req.body.directorIds;
    for (var i = 0; i < arr.length; i++) {
        var director = await Person.findById(arr[i]);
        if (director) {
            directorArray.push({ _id: director, name: director.name });
        }
    }

    const castArray = [];
    arr = req.body.actorIds;
    for (var i = 0; i < arr.length; i++) {
        var actor = await Person.findById(arr[i]);
        if (actor) {
            castArray.push({ _id: actor, name: actor.name });
        }
    }
  
    const movie = new Movie({ 
        title: req.body.title,
        year: req.body.year,        
        genres: genreArray,
        director: directorArray,
        cast: castArray
    });

    await movie.save();
    
    res.send(movie);
});
  
// Update Movie, is Authenticated and is Admin
router.put('/:id', [auth, admin], async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id, { 
        title: req.body.title,
        year: req.body.year,
        director: req.body.director,
        genres: req.body.genres,
        cast: req.body.cast
    }, {
        new: true
    });

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});
  
// Delete Movie, is Authenticated and is Admin
router.delete('/:id', [auth, admin], async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
}); 

module.exports = router;