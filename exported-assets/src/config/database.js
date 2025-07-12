const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'probet_pro',
  process.env.DB_USERNAME || 'postgres',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    
    // Connection pool configuration
    pool: {
      max: 20,
      min: 0,
      acquire: 60000,
      idle: 10000
    },
    
    // Logging configuration
    logging: process.env.NODE_ENV === 'development' ? 
      (msg) => logger.debug(msg) : false,
    
    // Security settings
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    
    // Query timeout
    query: {
      timeout: 30000
    },
    
    // Timezone
    timezone: '+00:00',
    
    // Define options
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true, // Soft deletes
      freezeTableName: true
    },
    
    // Retry configuration
    retry: {
      max: 3,
      timeout: 5000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully');
    
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      logger.info('Database synchronized');
    }
    
    return sequelize;
  } catch (error) {
    logger.error('Unable to connect to database:', error);
    throw error;
  }
};

const closeDB = async () => {
  try {
    await sequelize.close();
    logger.info('Database connection closed');
  } catch (error) {
    logger.error('Error closing database connection:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  connectDB,
  closeDB
}; 