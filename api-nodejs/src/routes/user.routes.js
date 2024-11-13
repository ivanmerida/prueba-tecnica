const { Router } = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/authenticate');
const routes = Router();

// rutas publicas de usuario
routes.post('/login', userController.login);
routes.post('/register', userController.register);

module.exports = routes;