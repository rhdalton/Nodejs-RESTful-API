const Joi = require('joi');
const mongoose = require('mongoose');

const peopleProfessions = ['Actor', 'Director', 'Producer', 'Writer'];

const personSchema = new mongoose.Schema({
    name: { 
        type: String, 
        minlength: 1,
        maxlength: 50,
        required: true
    },
    profession: {
        type: String,
        required: true,
        enum: peopleProfessions
    }
});

const Person = mongoose.model('Person', personSchema);

function validatePerson(person) {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
        profession: Joi.string().required()
    };
    return Joi.validate(person, schema);
}

exports.personSchema = personSchema;
exports.Person = Person;
exports.validate = validatePerson;