const express = require('express');
const path = require('path');

const api = require('./services/api')

const routes = express.Router();

const AccountController = require('./controllers/AccountController');
const StockController = require('./controllers/StockController');

routes.get('/', (request, response) => {response.sendFile(path.join(__dirname, '../../frontend/estoque/build/index.html'))});

routes.get('/user', async () => {try {await api.get('/')} catch(err) {}});

routes.get('/adm', async () => {try {await api.get('/')} catch(err) {}});

routes.get('/addItens', async () => {try {await api.get('/')} catch(err) {}});

routes.post('/enterProfile', AccountController.index);

routes.post('/enterProfileById', AccountController.indexById);

routes.post('/profile', AccountController.create);

routes.post('/createStock', StockController.create);

routes.get('/stock', StockController.index);

routes.post('/stock', StockController.change);

routes.delete('/stock/:id', StockController.delete);

module.exports = routes;