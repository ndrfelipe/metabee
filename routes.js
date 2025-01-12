const express = require("express");
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


// Routes da Home
route.get('/', homeController.index);

// rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.get('/login/logar', loginController.logar)
route.post('/login/login', loginController.login)

module.exports = route;