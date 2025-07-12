const winston = require('winston');
const path = require('path');

// Define log levels and colors
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

winston.addColors(colors);

// Define log format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define log transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }),
  
  // File transport for all logs
  new winston.transports.File({
    filename: path.join('logs', 'app.log'),
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    maxsize: 5242880, // 5MB
    maxFiles: 5
  }),
  
  // File transport for error logs only
  new winston.transports.File({
    level: 'error',
    filename: path.join('logs', 'error.log'),
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    maxsize: 5242880, // 5MB
    maxFiles: 5
  })
];

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format,
  transports,
  exceptionHandlers: [
    new winston.transports.File({ 
      filename: path.join('logs', 'exceptions.log'),
      maxsize: 5242880,
      maxFiles: 5
    })
  ],
  rejectionHandlers: [
    new winston.transports.File({ 
      filename: path.join('logs', 'rejections.log'),
      maxsize: 5242880,
      maxFiles: 5
    })
  ],
  exitOnError: false
});

// Create logs directory if it doesn't exist
const fs = require('fs');
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Add HTTP request logging
logger.http = (message, meta = {}) => {
  logger.log('http', message, meta);
};

// Add structured logging methods
logger.logRequest = (req, res, duration) => {
  const logData = {
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    duration: `${duration}ms`,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  };
  
  if (res.statusCode >= 400) {
    logger.warn('HTTP Request', logData);
  } else {
    logger.http('HTTP Request', logData);
  }
};

logger.logError = (error, context = {}) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    code: error.code,
    context,
    timestamp: new Date().toISOString()
  };
  
  logger.error('Application Error', errorData);
};

logger.logSecurity = (event, details = {}) => {
  const securityData = {
    event,
    details,
    timestamp: new Date().toISOString(),
    severity: 'security'
  };
  
  logger.warn('Security Event', securityData);
};

logger.logPerformance = (operation, duration, metadata = {}) => {
  const perfData = {
    operation,
    duration: `${duration}ms`,
    metadata,
    timestamp: new Date().toISOString()
  };
  
  if (duration > 1000) {
    logger.warn('Slow Operation', perfData);
  } else {
    logger.info('Performance', perfData);
  }
};

logger.logDatabase = (query, duration, error = null) => {
  const dbData = {
    query: query.replace(/\s+/g, ' ').trim(),
    duration: `${duration}ms`,
    timestamp: new Date().toISOString()
  };
  
  if (error) {
    dbData.error = error.message;
    logger.error('Database Error', dbData);
  } else if (duration > 500) {
    logger.warn('Slow Query', dbData);
  } else {
    logger.debug('Database Query', dbData);
  }
};

logger.logApiKey = (action, keyId, userId, details = {}) => {
  const apiKeyData = {
    action,
    keyId,
    userId,
    details,
    timestamp: new Date().toISOString()
  };
  
  logger.info('API Key Action', apiKeyData);
};

logger.logMath = (operation, parameters, result, duration) => {
  const mathData = {
    operation,
    parameters: JSON.stringify(parameters),
    result: typeof result === 'object' ? JSON.stringify(result) : result,
    duration: `${duration}ms`,
    timestamp: new Date().toISOString()
  };
  
  logger.debug('Math Operation', mathData);
};

// Environment-specific configuration
if (process.env.NODE_ENV === 'production') {
  // In production, reduce console logging
  logger.remove(winston.transports.Console);
  logger.add(new winston.transports.Console({
    level: 'warn',
    format: winston.format.simple()
  }));
} else if (process.env.NODE_ENV === 'test') {
  // In test environment, suppress most logging
  logger.transports.forEach(transport => {
    transport.silent = true;
  });
}

module.exports = logger; 