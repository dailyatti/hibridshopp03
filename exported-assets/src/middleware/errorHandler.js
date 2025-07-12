const logger = require('../utils/logger');

// Custom error classes
class AppError extends Error {
  constructor(message, statusCode, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

class AuthorizationError extends AppError {
  constructor(message = 'Access denied') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND_ERROR');
  }
}

class RateLimitError extends AppError {
  constructor(message = 'Rate limit exceeded') {
    super(message, 429, 'RATE_LIMIT_ERROR');
  }
}

class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR');
  }
}

class ExternalServiceError extends AppError {
  constructor(message = 'External service unavailable') {
    super(message, 503, 'EXTERNAL_SERVICE_ERROR');
  }
}

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error details
  logger.logError(err, {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.id,
    apiKey: req.apiKey?.id
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new NotFoundError(message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate value for field: ${field}`;
    error = new ValidationError(message, { field, value: err.keyValue[field] });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message,
      value: val.value
    }));
    const message = 'Validation failed';
    error = new ValidationError(message, errors);
  }

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message,
      value: e.value
    }));
    const message = 'Validation failed';
    error = new ValidationError(message, errors);
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'unknown';
    const message = `Duplicate value for field: ${field}`;
    error = new ValidationError(message, { field, value: err.errors[0]?.value });
  }

  // Sequelize foreign key constraint error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    const message = 'Invalid reference to related resource';
    error = new ValidationError(message, { field: err.index });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new AuthenticationError(message);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = new AuthenticationError(message);
  }

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File too large';
    error = new ValidationError(message, { maxSize: err.limit });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message = 'Unexpected file field';
    error = new ValidationError(message, { field: err.field });
  }

  // Redis errors
  if (err.code === 'ECONNREFUSED' && err.address) {
    const message = 'Cache service unavailable';
    error = new ExternalServiceError(message);
  }

  // Database connection errors
  if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
    const message = 'Database connection failed';
    error = new DatabaseError(message);
  }

  // Rate limiting errors
  if (err.type === 'entity.too.large') {
    const message = 'Request entity too large';
    error = new ValidationError(message, { limit: err.limit });
  }

  // Default to 500 server error
  if (!error.isOperational) {
    error = new AppError('Something went wrong', 500, 'INTERNAL_ERROR');
  }

  // Send error response
  sendErrorResponse(error, req, res);
};

// Send formatted error response
const sendErrorResponse = (err, req, res) => {
  const response = {
    success: false,
    error: {
      code: err.code || 'UNKNOWN_ERROR',
      message: err.message
    },
    meta: {
      timestamp: new Date().toISOString(),
      requestId: req.id || generateRequestId(),
      path: req.originalUrl,
      method: req.method
    }
  };

  // Add error details for validation errors
  if (err.details) {
    response.error.details = err.details;
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }

  // Add rate limit info for rate limit errors
  if (err.code === 'RATE_LIMIT_ERROR' && req.rateLimit) {
    response.meta.rateLimit = {
      limit: req.rateLimit.limit,
      remaining: req.rateLimit.remaining,
      reset: req.rateLimit.reset
    };
  }

  // Security: Don't leak sensitive information
  if (err.code === 'DATABASE_ERROR' && process.env.NODE_ENV === 'production') {
    response.error.message = 'Internal server error';
  }

  res.status(err.statusCode || 500).json(response);
};

// Generate unique request ID
const generateRequestId = () => {
  return 'req_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Async error wrapper
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler for undefined routes
const notFoundHandler = (req, res, next) => {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
};

// Validation error helper
const createValidationError = (message, field, value) => {
  return new ValidationError(message, { field, value });
};

// Security error helper
const createSecurityError = (message, details = {}) => {
  logger.logSecurity('security_violation', {
    message,
    details,
    ip: details.ip,
    userAgent: details.userAgent
  });
  return new AuthorizationError(message);
};

module.exports = {
  errorHandler,
  asyncHandler,
  notFoundHandler,
  createValidationError,
  createSecurityError,
  
  // Error classes
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  RateLimitError,
  DatabaseError,
  ExternalServiceError
}; 