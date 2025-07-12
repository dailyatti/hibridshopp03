const express = require('express');
const router = express.Router();
const apiKeyService = require('../services/apiKeyService');

// Create new API key
router.post('/', async (req, res) => {
  try {
    const { name, permissions = [], environment = 'development' } = req.body;
    const userId = req.user?.id || 1; // Placeholder user ID
    
    if (!name) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'API key name is required'
        }
      });
    }
    
    const apiKey = await apiKeyService.createApiKey(userId, name, permissions, environment);
    
    res.status(201).json({
      success: true,
      data: apiKey,
      message: 'API key created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'CREATION_ERROR',
        message: error.message
      }
    });
  }
});

// List user's API keys
router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id || 1; // Placeholder user ID
    const apiKeys = await apiKeyService.listApiKeys(userId);
    
    res.json({
      success: true,
      data: apiKeys
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'FETCH_ERROR',
        message: error.message
      }
    });
  }
});

// Get API key statistics
router.get('/:keyId/stats', async (req, res) => {
  try {
    const { keyId } = req.params;
    const stats = await apiKeyService.getApiKeyStats(keyId);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'FETCH_ERROR',
        message: error.message
      }
    });
  }
});

// Revoke API key
router.delete('/:keyId', async (req, res) => {
  try {
    const { keyId } = req.params;
    const userId = req.user?.id || 1; // Placeholder user ID
    
    await apiKeyService.revokeApiKey(keyId, userId);
    
    res.json({
      success: true,
      message: 'API key revoked successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'REVOCATION_ERROR',
        message: error.message
      }
    });
  }
});

// Rotate API key
router.post('/:keyId/rotate', async (req, res) => {
  try {
    const { keyId } = req.params;
    const userId = req.user?.id || 1; // Placeholder user ID
    
    const newApiKey = await apiKeyService.rotateApiKey(keyId, userId);
    
    res.json({
      success: true,
      data: newApiKey,
      message: 'API key rotated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'ROTATION_ERROR',
        message: error.message
      }
    });
  }
});

module.exports = router; 