const winston = require('winston');
const path = require('path');
require('express-async-errors');

const log_path = path.join(path.dirname(require.main.filename), 'logs');

module.exports = function() {

    // Non-production environment, log info to console
    if (process.env.NODE_ENV !== 'production') {
        winston.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }

    // Catch and log any uncaught exceptions
    winston.handleExceptions(new winston.transports.File({ filename: path.join(log_path, 'uncaughtExceptions.log') }));

    // Catch and log any unhandled promise rejection
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    // Log Express module errors to file
    winston.add(winston.transports.File, { filename: path.join(log_path, 'logfile.log') });
    // Log Express module errors to MongoDB
    winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/moviesapp', level: 'info' });
}