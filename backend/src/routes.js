const express = require('express');
const path = require('path');

const routes = express.Router();

const AccountController = require('./controllers/AccountController');
const StockController = require('./controllers/StockController');
const EntriesAndExitsController = require('./controllers/EntriesAndExitsController');

routes.get('/', (request, response) => {response.sendFile(path.join(__dirname, '../build/index.html'))});

routes.get('/user', (request, response) => {response.sendFile(path.join(__dirname, '../build/index.html'))});

routes.get('/adm', (request, response) => {response.sendFile(path.join(__dirname, '../build/index.html'))});

routes.get('/adm/addItens', (request, response) => {response.sendFile(path.join(__dirname, '../build/index.html'))});

routes.get('/adm/requests', (request, response) => {response.sendFile(path.join(__dirname, '../build/index.html'))});

routes.get('/adm/entriesAndExits', (request, response) => {response.sendFile(path.join(__dirname, '../build/index.html'))});

routes.post('/enterProfile', AccountController.index);

routes.post('/enterProfileById', AccountController.indexById);

routes.post('/profile', AccountController.create);

routes.post('/createStock', StockController.create);

routes.get('/stock', StockController.index);

routes.post('/stock', StockController.change);

routes.delete('/stock/:id', StockController.delete);

routes.get('/GETALLACCOUNTS', AccountController.indexAll);

routes.get('/getEntriesExits', EntriesAndExitsController.index);

routes.post('/createEntrieOrExit', EntriesAndExitsController.create);

module.exports = routes;