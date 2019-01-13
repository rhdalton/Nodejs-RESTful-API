const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        min: 3,
        max: 200,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    // use joi to validate fields
    const schema = {
        name: Joi.string().min(3).max(200).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;