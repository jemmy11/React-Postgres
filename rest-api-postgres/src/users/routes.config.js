const UsersController = require('./controllers/users.controller');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.insert
    ]);
    app.get('/user', [
        ValidationMiddleware.validJWTNeeded,
        UsersController.getByToken
    ]);
};
