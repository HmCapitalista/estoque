const express = require('express');
const cors = require('cors');
const port = process.env.port || 3000;
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('../../frontend/estoque/build'));
app.use(routes);


console.log("Application is running in port: " + String(port));
app.listen(port);