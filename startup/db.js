const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config')

module.exports = function() {
    // connect to MongoDB
    mongoose.connect(config.get('MongoDBConnectionString'), { useNewUrlParser: true })
    .then(() => winston.info("Connected to MongoDB..."));
}