
const express = require('express');
const cors = require('cors');
const { httpLogger } = require('./config/logger');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.disable('x-powered-by');

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(httpLogger);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
