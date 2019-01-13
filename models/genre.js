const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).max(100).required()
    };
    return Joi.validate(genre, schema);
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;