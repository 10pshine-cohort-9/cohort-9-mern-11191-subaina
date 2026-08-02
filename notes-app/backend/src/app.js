
const express = require('express');
const cors = require('cors');
const { httpLogger } = require('./config/logger');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
