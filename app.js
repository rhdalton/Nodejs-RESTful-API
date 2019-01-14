/**
 * This is an example Nodejs RESTful API App
 * 
 * Uses the Node.js Express application framework
 */
const winston = require('winston');
const express = require('express');
const app = express();

// load startup modules
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;