const Joi = require('joi');
const { genreSchema } = require('./genre');
const { directorSchema } = require('./director');
const { castSchema } = require('./cast');

const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2100
    },
    genres: {
        type: [genreSchema],
        required: true
    },
    director: {
        type: [directorSchema],
        required: true
    },    
    cast: {
        type: [castSchema],
        required: true
    }
}));

function validateMovie(movie) {
    // use joi to validate fields
    const schema = {
        title: Joi.string().min(1).max(50).required(),
        year: Joi.number().integer().min(1900).max(2100).required(),
        genreIds: Joi.array().items(Joi.objectId()).required(),
        directorIds: Joi.array().items(Joi.objectId()).required(),        
        actorIds: Joi.array().items(Joi.objectId()).required()
    }
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;