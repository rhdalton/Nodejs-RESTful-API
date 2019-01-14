const { Genre, validate } = require('../models/genre'); 
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Get All Genres, public access
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

// Get Genre by Id, public access
router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('Genre with given Id not found.');

    res.send(genre);
});

// Add new Genre, is Authenticated and is Admin
router.post('/', [auth, admin], async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({ 
        name: req.body.name,
    });
    await genre.save();
    
    res.send(genre);
});

// Update Genre, is Authenticated and is Admin
router.put('/:id', [auth, admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id,
    { 
        name: req.body.name,
    }, { new: true });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

// Delete Genre, is Authenticated and is Admin
router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

module.exports = router; 