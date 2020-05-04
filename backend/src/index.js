const express = require('express');
const port = process.env.port || 3000;
const routes = require('./routes');

const app = express();


app.use(express.json());
app.use(routes);


console.log("Application is running in port: " + String(port));
app.listen(port);