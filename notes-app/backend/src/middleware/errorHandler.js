const { logger } = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message =
    statusCode >= 500 ? 'Internal Server Error' : err.message || 'Request failed';

  if (statusCode >= 500) {
    logger.error({ err }, message);
  } else {
    logger.warn({ err }, message);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
