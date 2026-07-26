
const express = require('express');
const cors = require('cors');
const { httpLogger } = require('./config/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
