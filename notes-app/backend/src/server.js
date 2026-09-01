require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const { logger } = require('./config/logger');
const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    server.on('error', (error) => {
      logger.error({ err: error }, 'Server failed to start');
      process.exit(1);
    });
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1);
  }
};

startServer();
