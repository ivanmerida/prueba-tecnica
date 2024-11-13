const { Router } = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/authenticate');
const routes = Router();

// const { validateLogin, validateCreate, validateUpdate } = require('../validators/users');


// routes.get('/getUser/:id', auth.auth, userController.getUser);
routes.post('/login', userController.login);
routes.post('/register', userController.register);

module.exports = routes;