
/**
 * If unable to use express-async-errors module, async.js middleware required for try/catch error handling
 */
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (ex) {
            next(ex);
        }
    }    
}