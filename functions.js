
// basic functions for this API
const Joi = require('joi');

// get movie by id from db
function getMovieById(id) {
    return movieList.find(m => m.id === parseInt(id));
}

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required(),
        year: Joi.number().integer().min(1900).max(2100).required(),
        director: Joi.string().required(),
        cast: Joi.array().items(Joi.string()),
        poster: Joi.string()
    }
    return Joi.validate(movie, schema);
}

function getMovies() {
    return movieList;
}

module.exports = {
    getMovies,
    getMovieById,
    validateMovie
}


// This would normally be an object from MongoDB, but for this example, I created a basic Json object to work with.
const movieList = [
    {
        id: 1,
        title: "The Dark Knight",
        year: 2008,
        genre: ["Action","Thriller"],
        director: "Christopher Nolan",
        cast: ["Christian Bale", "Aaron Eckhart", "Heath Ledger"],
        poster: "top-gun.png"
    },
    {
        id: 2,
        title: "Titanic",
        year: 1997,
        genre: ["Drama", "Romance"],
        director: "James Cameron",
        cast: ["Leonardo DiCaprio", "Kate Winslet"],
        poster: "titanic.png"
    },
    {
        id: 3,
        title: "The Avengers",
        year: 2012,
        genre: ["Fantasy", "Science Fiction"],
        director: "Joss Whedon",
        cast: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth"],
        poster: "the-avengers.png"
    },
]