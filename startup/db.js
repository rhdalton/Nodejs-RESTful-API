const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config')

module.exports = function() {
    const db = config.get('db');
    // connect to MongoDB
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => winston.info(`Connected to ${db}...`));
}