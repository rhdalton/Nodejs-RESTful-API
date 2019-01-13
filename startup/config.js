const config = require('config');

module.exports = function() {
    // Check if jwtPrivateKey is set in config dir, if not, close app
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}