const Joi = require('joi');
const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        minlength: 1,
        maxlength: 50,
        required: true,
        trim: true
    }
});

const Director = mongoose.model('Director', directorSchema);

function validateDirector(director) {
    const schema = {
        name: Joi.string().min(1).max(50).required()
    };
    return Joi.validate(director, schema);
}

exports.directorSchema = directorSchema;
exports.Director = Director;
exports.validate = validateDirector;