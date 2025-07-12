const express = require('express');
const router = express.Router();
const mathEngine = require('../services/mathEngine');

// Create a new bet
router.post('/bets', (req, res) => {
  try {
    const { sport, homeTeam, awayTeam, odds, probability, stake } = req.body;
    
    // Calculate Kelly fraction
    const kellyFraction = mathEngine.multiOutcomeKelly([probability], [odds]);
    const expectedValue = stake * (probability * odds - 1);
    
    const bet = {
      id: Date.now(),
      sport,
      homeTeam,
      awayTeam,
      odds,
      probability,
      stake,
      kellyFraction: kellyFraction.fractions[0],
      expectedValue,
      result: 'pending',
      createdAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: bet,
      message: 'Bet created successfully'
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

// Get user's bets
router.get('/bets', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'No bets found'
  });
});

// Get portfolio analysis
router.get('/portfolio', (req, res) => {
  res.json({
    success: true,
    data: {
      totalStake: 0,
      totalExpectedValue: 0,
      activeBets: 0,
      winRate: 0,
      roi: 0
    }
  });
});

module.exports = router; 