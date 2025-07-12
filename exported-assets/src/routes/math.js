const express = require('express');
const router = express.Router();
const mathEngine = require('../services/mathEngine');

// Kelly Criterion calculation
router.post('/kelly', (req, res) => {
  try {
    const { probabilities, odds, correlation = 0 } = req.body;
    
    if (!probabilities || !odds || probabilities.length !== odds.length) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Probabilities and odds arrays must have the same length'
        }
      });
    }
    
    const result = mathEngine.multiOutcomeKelly(probabilities, odds, correlation);
    
    res.json({
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        calculation: 'kelly_criterion'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        code: 'CALCULATION_ERROR',
        message: error.message
      }
    });
  }
});

// Poisson distribution calculation
router.post('/poisson', (req, res) => {
  try {
    const { lambda, time = 0, seasonality = 0 } = req.body;
    
    if (!lambda || lambda <= 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Lambda must be a positive number'
        }
      });
    }
    
    const result = mathEngine.timeVaryingPoisson(lambda, time, seasonality);
    
    res.json({
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        calculation: 'poisson_distribution'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        code: 'CALCULATION_ERROR',
        message: error.message
      }
    });
  }
});

// Skellam distribution calculation
router.post('/skellam', (req, res) => {
  try {
    const { mu1, mu2, maxDiff = 10 } = req.body;
    
    if (!mu1 || !mu2 || mu1 <= 0 || mu2 <= 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'mu1 and mu2 must be positive numbers'
        }
      });
    }
    
    const result = mathEngine.skellamDistribution(mu1, mu2, maxDiff);
    
    res.json({
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        calculation: 'skellam_distribution'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        code: 'CALCULATION_ERROR',
        message: error.message
      }
    });
  }
});

// Risk analysis calculation
router.post('/risk', (req, res) => {
  try {
    const { returns, method = 'historical', confidence = 0.95 } = req.body;
    
    if (!returns || !Array.isArray(returns) || returns.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Returns must be a non-empty array'
        }
      });
    }
    
    const result = mathEngine.advancedVaR(returns, confidence, method);
    
    res.json({
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        calculation: 'risk_analysis'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        code: 'CALCULATION_ERROR',
        message: error.message
      }
    });
  }
});

// Portfolio optimization
router.post('/optimize', (req, res) => {
  try {
    const { expectedReturns, covarianceMatrix, targetReturn = null } = req.body;
    
    if (!expectedReturns || !covarianceMatrix) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Expected returns and covariance matrix are required'
        }
      });
    }
    
    // Convert covariance matrix to Matrix object
    const { Matrix } = require('ml-matrix');
    const covMatrix = new Matrix(covarianceMatrix);
    
    const result = mathEngine.meanVarianceOptimization(expectedReturns, covMatrix, targetReturn);
    
    res.json({
      success: true,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        calculation: 'portfolio_optimization'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: {
        code: 'CALCULATION_ERROR',
        message: error.message
      }
    });
  }
});

module.exports = router; 