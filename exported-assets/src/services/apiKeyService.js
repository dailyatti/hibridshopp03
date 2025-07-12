const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');
const { ApiKey } = require('../models');
const { redisClient } = require('../config/redis');

class ApiKeyService {
  constructor() {
    this.encryptionKey = process.env.ENCRYPTION_KEY;
    this.encryptionIV = process.env.ENCRYPTION_IV;
    
    if (!this.encryptionKey || !this.encryptionIV) {
      throw new Error('Encryption key and IV must be set in environment variables');
    }
  }

  /**
   * Encrypt sensitive API key data
   * @param {string} text - Text to encrypt
   * @returns {string} - Encrypted text
   */
  encrypt(text) {
    try {
      const cipher = crypto.createCipher('aes-256-cbc', this.encryptionKey);
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    } catch (error) {
      logger.error('Encryption failed:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  /**
   * Decrypt sensitive API key data
   * @param {string} encryptedText - Encrypted text
   * @returns {string} - Decrypted text
   */
  decrypt(encryptedText) {
    try {
      const decipher = crypto.createDecipher('aes-256-cbc', this.encryptionKey);
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (error) {
      logger.error('Decryption failed:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  /**
   * Generate a secure API key
   * @param {string} prefix - Key prefix (e.g., 'pb_live_', 'pb_test_')
   * @returns {string} - Generated API key
   */
  generateApiKey(prefix = 'pb_') {
    const randomBytes = crypto.randomBytes(32);
    const timestamp = Date.now().toString(36);
    const random = randomBytes.toString('hex');
    return `${prefix}${timestamp}_${random}`;
  }

  /**
   * Hash API key for storage
   * @param {string} apiKey - API key to hash
   * @returns {string} - Hashed API key
   */
  async hashApiKey(apiKey) {
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    return await bcrypt.hash(apiKey, saltRounds);
  }

  /**
   * Verify API key against hash
   * @param {string} apiKey - API key to verify
   * @param {string} hashedKey - Hashed key to compare against
   * @returns {boolean} - Verification result
   */
  async verifyApiKey(apiKey, hashedKey) {
    return await bcrypt.compare(apiKey, hashedKey);
  }

  /**
   * Create new API key for user
   * @param {number} userId - User ID
   * @param {string} name - Key name/description
   * @param {Array} permissions - Array of permissions
   * @param {string} environment - 'development' or 'production'
   * @returns {Object} - Created API key info
   */
  async createApiKey(userId, name, permissions = [], environment = 'development') {
    try {
      const prefix = environment === 'production' ? 'pb_live_' : 'pb_test_';
      const apiKey = this.generateApiKey(prefix);
      const hashedKey = await this.hashApiKey(apiKey);
      
      const keyData = await ApiKey.create({
        id: uuidv4(),
        userId,
        name,
        keyHash: hashedKey,
        permissions: JSON.stringify(permissions),
        environment,
        isActive: true,
        lastUsed: null,
        usageCount: 0,
        rateLimit: environment === 'production' ? 1000 : 100, // requests per hour
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
      });

      // Store in Redis for fast lookup
      await this.cacheApiKey(apiKey, keyData);

      logger.info(`API key created for user ${userId}`, {
        keyId: keyData.id,
        name,
        environment
      });

      return {
        id: keyData.id,
        key: apiKey, // Only return the actual key once during creation
        name,
        permissions,
        environment,
        rateLimit: keyData.rateLimit,
        createdAt: keyData.createdAt,
        expiresAt: keyData.expiresAt
      };
    } catch (error) {
      logger.error('Failed to create API key:', error);
      throw new Error('Failed to create API key');
    }
  }

  /**
   * Cache API key data in Redis
   * @param {string} apiKey - API key
   * @param {Object} keyData - Key data to cache
   */
  async cacheApiKey(apiKey, keyData) {
    const cacheKey = `api_key:${apiKey}`;
    const cacheData = {
      id: keyData.id,
      userId: keyData.userId,
      permissions: keyData.permissions,
      environment: keyData.environment,
      isActive: keyData.isActive,
      rateLimit: keyData.rateLimit,
      expiresAt: keyData.expiresAt
    };
    
    await redisClient.setex(cacheKey, 3600, JSON.stringify(cacheData)); // Cache for 1 hour
  }

  /**
   * Validate API key
   * @param {string} apiKey - API key to validate
   * @returns {Object|null} - Key data if valid, null if invalid
   */
  async validateApiKey(apiKey) {
    try {
      // Check cache first
      const cacheKey = `api_key:${apiKey}`;
      const cached = await redisClient.get(cacheKey);
      
      if (cached) {
        const keyData = JSON.parse(cached);
        
        // Check if key is expired
        if (new Date(keyData.expiresAt) < new Date()) {
          await redisClient.del(cacheKey);
          return null;
        }
        
        // Check if key is active
        if (!keyData.isActive) {
          return null;
        }
        
        return keyData;
      }

      // If not in cache, check database
      const keyRecords = await ApiKey.findAll({
        where: { isActive: true }
      });

      for (const record of keyRecords) {
        const isValid = await this.verifyApiKey(apiKey, record.keyHash);
        if (isValid) {
          // Check if key is expired
          if (new Date(record.expiresAt) < new Date()) {
            await record.update({ isActive: false });
            return null;
          }

          // Update usage statistics
          await record.update({
            lastUsed: new Date(),
            usageCount: record.usageCount + 1
          });

          // Cache the key
          await this.cacheApiKey(apiKey, record);

          return {
            id: record.id,
            userId: record.userId,
            permissions: JSON.parse(record.permissions),
            environment: record.environment,
            isActive: record.isActive,
            rateLimit: record.rateLimit,
            expiresAt: record.expiresAt
          };
        }
      }

      return null;
    } catch (error) {
      logger.error('API key validation failed:', error);
      return null;
    }
  }

  /**
   * Check rate limit for API key
   * @param {string} apiKey - API key
   * @param {number} rateLimit - Rate limit per hour
   * @returns {boolean} - Whether request is within rate limit
   */
  async checkRateLimit(apiKey, rateLimit) {
    const rateLimitKey = `rate_limit:${apiKey}`;
    const current = await redisClient.get(rateLimitKey);
    
    if (!current) {
      await redisClient.setex(rateLimitKey, 3600, '1'); // Set for 1 hour
      return true;
    }
    
    const currentCount = parseInt(current);
    if (currentCount >= rateLimit) {
      return false;
    }
    
    await redisClient.incr(rateLimitKey);
    return true;
  }

  /**
   * Get API key usage statistics
   * @param {string} keyId - API key ID
   * @returns {Object} - Usage statistics
   */
  async getApiKeyStats(keyId) {
    try {
      const keyData = await ApiKey.findByPk(keyId);
      if (!keyData) {
        throw new Error('API key not found');
      }

      const rateLimitKey = `rate_limit:${keyId}`;
      const currentUsage = await redisClient.get(rateLimitKey) || 0;

      return {
        id: keyData.id,
        name: keyData.name,
        environment: keyData.environment,
        totalUsage: keyData.usageCount,
        currentHourUsage: parseInt(currentUsage),
        rateLimit: keyData.rateLimit,
        lastUsed: keyData.lastUsed,
        createdAt: keyData.createdAt,
        expiresAt: keyData.expiresAt,
        isActive: keyData.isActive
      };
    } catch (error) {
      logger.error('Failed to get API key stats:', error);
      throw new Error('Failed to get API key statistics');
    }
  }

  /**
   * Revoke API key
   * @param {string} keyId - API key ID
   * @param {number} userId - User ID (for authorization)
   */
  async revokeApiKey(keyId, userId) {
    try {
      const keyData = await ApiKey.findOne({
        where: { id: keyId, userId }
      });

      if (!keyData) {
        throw new Error('API key not found or unauthorized');
      }

      await keyData.update({ isActive: false });
      
      // Remove from cache
      const cachePattern = `api_key:*`;
      const keys = await redisClient.keys(cachePattern);
      
      for (const key of keys) {
        const cached = await redisClient.get(key);
        if (cached) {
          const data = JSON.parse(cached);
          if (data.id === keyId) {
            await redisClient.del(key);
            break;
          }
        }
      }

      logger.info(`API key revoked`, { keyId, userId });
    } catch (error) {
      logger.error('Failed to revoke API key:', error);
      throw new Error('Failed to revoke API key');
    }
  }

  /**
   * List user's API keys
   * @param {number} userId - User ID
   * @returns {Array} - List of API keys (without actual keys)
   */
  async listApiKeys(userId) {
    try {
      const keys = await ApiKey.findAll({
        where: { userId },
        attributes: ['id', 'name', 'environment', 'isActive', 'lastUsed', 'usageCount', 'rateLimit', 'createdAt', 'expiresAt'],
        order: [['createdAt', 'DESC']]
      });

      return keys.map(key => ({
        id: key.id,
        name: key.name,
        environment: key.environment,
        isActive: key.isActive,
        lastUsed: key.lastUsed,
        usageCount: key.usageCount,
        rateLimit: key.rateLimit,
        createdAt: key.createdAt,
        expiresAt: key.expiresAt,
        permissions: JSON.parse(key.permissions || '[]')
      }));
    } catch (error) {
      logger.error('Failed to list API keys:', error);
      throw new Error('Failed to list API keys');
    }
  }

  /**
   * Rotate API key (generate new key, keep same permissions)
   * @param {string} keyId - API key ID
   * @param {number} userId - User ID
   * @returns {Object} - New API key info
   */
  async rotateApiKey(keyId, userId) {
    try {
      const existingKey = await ApiKey.findOne({
        where: { id: keyId, userId }
      });

      if (!existingKey) {
        throw new Error('API key not found or unauthorized');
      }

      // Create new key with same permissions
      const permissions = JSON.parse(existingKey.permissions || '[]');
      const newKey = await this.createApiKey(
        userId,
        existingKey.name,
        permissions,
        existingKey.environment
      );

      // Deactivate old key
      await existingKey.update({ isActive: false });

      logger.info(`API key rotated`, { oldKeyId: keyId, newKeyId: newKey.id, userId });

      return newKey;
    } catch (error) {
      logger.error('Failed to rotate API key:', error);
      throw new Error('Failed to rotate API key');
    }
  }
}

module.exports = new ApiKeyService(); 