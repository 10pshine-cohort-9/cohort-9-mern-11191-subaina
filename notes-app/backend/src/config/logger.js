const pino = require('pino');
const pinoHttp = require('pino-http');

const isProduction = process.env.NODE_ENV == 'production';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isProduction
    ? undefined
    : {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
});

const httpLogger = pinoHttp({ logger });

module.exports = { logger, httpLogger };
