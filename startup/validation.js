const Joi = require('joi');

// validate objectIds
module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi);
}