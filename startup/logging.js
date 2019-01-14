const winston = require('winston');
const path = require('path');
//require('winston-mongodb');

// Handle async errors in Express routes
require('express-async-errors');

module.exports = function() {
    // define logs path for winston.transports
    const log_path = path.join(path.dirname(require.main.filename), 'logs');

    // Non-production environment, log info to console 
    /*  
    if (process.env.NODE_ENV !== 'production') {
        winston.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }*/

    // Catch and log any uncaught exceptions
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: path.join(log_path, 'uncaughtExceptions.log') })
    );

    // Catch and log any unhandled promise rejection
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    // Log Express module actions to log 
    winston.add(winston.transports.File, { filename: path.join(log_path, 'full.log') });

    // Log Express module errors to MongoDB
    //winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/moviesapp', level: 'info' });
}