const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

genreSchema.methods.getGenres = function(arr) {
    var gArray = [];
    for (var i = 0; i < arr.length; i++) {
        var genre = await this.findById(arr[i]);
        if (genre) {
            gArray.push({ _id: genre, name: genre.name });
        }
    }
    return gArray;
}

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).max(50).required()
    };
    return Joi.validate(genre, schema);
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;