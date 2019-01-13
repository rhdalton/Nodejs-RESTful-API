const Joi = require('joi');
const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: { 
        type: String, 
        minlength: 1,
        maxlength: 50,
        required: true,
        trim: true
    }
});

const Cast = mongoose.model('Cast', castSchema);

function validateCast(cast) {
    const schema = {
        name: Joi.string().min(1).max(50).required()
    };
    return Joi.validate(cast, schema);
}

exports.castSchema = castSchema;
exports.Cast = Cast;
exports.validate = validateCast;