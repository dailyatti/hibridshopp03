const redis = require('redis');
const logger = require('../utils/logger');

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  keepAlive: 30000,
  family: 4, // IPv4
  
  // Connection pool settings
  connectTimeout: 10000,
  commandTimeout: 5000,
  
  // Retry strategy
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
};

// Create Redis client
const redisClient = redis.createClient(redisConfig);

// Error handling
redisClient.on('error', (error) => {
  logger.error('Redis Client Error:', error);
});

redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('ready', () => {
  logger.info('Redis client ready');
});

redisClient.on('end', () => {
  logger.warn('Redis client connection ended');
});

redisClient.on('reconnecting', () => {
  logger.info('Redis client reconnecting');
});

// Connect to Redis
const connectRedis = async () => {
  try {
    await redisClient.connect();
    
    // Test connection
    await redisClient.ping();
    logger.info('Redis connection established successfully');
    
    return redisClient;
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    throw error;
  }
};

// Disconnect from Redis
const disconnectRedis = async () => {
  try {
    await redisClient.quit();
    logger.info('Redis connection closed');
  } catch (error) {
    logger.error('Error closing Redis connection:', error);
    throw error;
  }
};

// Redis utility functions
const redisUtils = {
  // Set with expiration
  setex: async (key, seconds, value) => {
    try {
      await redisClient.setEx(key, seconds, JSON.stringify(value));
    } catch (error) {
      logger.error(`Redis SETEX error for key ${key}:`, error);
      throw error;
    }
  },

  // Get and parse JSON
  get: async (key) => {
    try {
      const value = await redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error(`Redis GET error for key ${key}:`, error);
      return null;
    }
  },

  // Delete key
  del: async (key) => {
    try {
      await redisClient.del(key);
    } catch (error) {
      logger.error(`Redis DEL error for key ${key}:`, error);
      throw error;
    }
  },

  // Check if key exists
  exists: async (key) => {
    try {
      const result = await redisClient.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`Redis EXISTS error for key ${key}:`, error);
      return false;
    }
  },

  // Increment counter
  incr: async (key) => {
    try {
      return await redisClient.incr(key);
    } catch (error) {
      logger.error(`Redis INCR error for key ${key}:`, error);
      throw error;
    }
  },

  // Set expiration
  expire: async (key, seconds) => {
    try {
      await redisClient.expire(key, seconds);
    } catch (error) {
      logger.error(`Redis EXPIRE error for key ${key}:`, error);
      throw error;
    }
  },

  // Get keys matching pattern
  keys: async (pattern) => {
    try {
      return await redisClient.keys(pattern);
    } catch (error) {
      logger.error(`Redis KEYS error for pattern ${pattern}:`, error);
      return [];
    }
  },

  // Hash operations
  hset: async (key, field, value) => {
    try {
      await redisClient.hSet(key, field, JSON.stringify(value));
    } catch (error) {
      logger.error(`Redis HSET error for key ${key}, field ${field}:`, error);
      throw error;
    }
  },

  hget: async (key, field) => {
    try {
      const value = await redisClient.hGet(key, field);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error(`Redis HGET error for key ${key}, field ${field}:`, error);
      return null;
    }
  },

  hgetall: async (key) => {
    try {
      const hash = await redisClient.hGetAll(key);
      const result = {};
      for (const [field, value] of Object.entries(hash)) {
        try {
          result[field] = JSON.parse(value);
        } catch {
          result[field] = value;
        }
      }
      return result;
    } catch (error) {
      logger.error(`Redis HGETALL error for key ${key}:`, error);
      return {};
    }
  },

  hdel: async (key, field) => {
    try {
      await redisClient.hDel(key, field);
    } catch (error) {
      logger.error(`Redis HDEL error for key ${key}, field ${field}:`, error);
      throw error;
    }
  },

  // List operations
  lpush: async (key, ...values) => {
    try {
      const serializedValues = values.map(v => JSON.stringify(v));
      return await redisClient.lPush(key, serializedValues);
    } catch (error) {
      logger.error(`Redis LPUSH error for key ${key}:`, error);
      throw error;
    }
  },

  rpop: async (key) => {
    try {
      const value = await redisClient.rPop(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error(`Redis RPOP error for key ${key}:`, error);
      return null;
    }
  },

  lrange: async (key, start, stop) => {
    try {
      const values = await redisClient.lRange(key, start, stop);
      return values.map(v => {
        try {
          return JSON.parse(v);
        } catch {
          return v;
        }
      });
    } catch (error) {
      logger.error(`Redis LRANGE error for key ${key}:`, error);
      return [];
    }
  },

  // Set operations
  sadd: async (key, ...members) => {
    try {
      const serializedMembers = members.map(m => JSON.stringify(m));
      return await redisClient.sAdd(key, serializedMembers);
    } catch (error) {
      logger.error(`Redis SADD error for key ${key}:`, error);
      throw error;
    }
  },

  smembers: async (key) => {
    try {
      const members = await redisClient.sMembers(key);
      return members.map(m => {
        try {
          return JSON.parse(m);
        } catch {
          return m;
        }
      });
    } catch (error) {
      logger.error(`Redis SMEMBERS error for key ${key}:`, error);
      return [];
    }
  },

  sismember: async (key, member) => {
    try {
      const result = await redisClient.sIsMember(key, JSON.stringify(member));
      return result === 1;
    } catch (error) {
      logger.error(`Redis SISMEMBER error for key ${key}:`, error);
      return false;
    }
  },

  // Cache with automatic JSON serialization
  cache: {
    set: async (key, value, ttl = 3600) => {
      await redisUtils.setex(key, ttl, value);
    },

    get: async (key) => {
      return await redisUtils.get(key);
    },

    invalidate: async (pattern) => {
      const keys = await redisUtils.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
    }
  }
};

module.exports = {
  redisClient,
  connectRedis,
  disconnectRedis,
  ...redisUtils
}; 