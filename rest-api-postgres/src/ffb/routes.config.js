const FFBController = require('./controllers/ffbs.controller');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

exports.routesConfig = function (app) {
    app.get('/ffb/search', [
        ValidationMiddleware.validJWTNeeded,
        FFBController.findByFilter
    ]);
};
