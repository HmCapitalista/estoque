const express = require('express');

const routes = express.Router();

const AccountController = require('./controllers/AccountController');
const StockController = require('./controllers/StockController');

routes.get('/', () => {console.log("conectado")});

routes.post('/enterProfile', AccountController.index);

routes.post('/profile', AccountController.create);

routes.get('/stock', StockController.index);

routes.post('/stock', StockController.change);

routes.delete('/stock', StockController.delete);

module.exports = routes;