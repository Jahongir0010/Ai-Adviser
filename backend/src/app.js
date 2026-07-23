const path = require('path');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { requestLogger } = require('./utils/logger');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/static', express.static(path.join(__dirname, '..', 'public')));

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
