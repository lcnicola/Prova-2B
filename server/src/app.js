const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

app.use(cors({ origin: true }));
app.use(express.json());
app.use('/', routes);

module.exports = app;