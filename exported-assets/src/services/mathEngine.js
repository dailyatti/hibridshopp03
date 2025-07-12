const math = require('mathjs');
const { Matrix } = require('ml-matrix');
const ss = require('simple-statistics');
const logger = require('../utils/logger');
const sportMathModels = require('./sportMathModels');

class MathEngine {
  constructor() {
    this.precision = 15; // Decimal precision for calculations
    this.maxIterations = 1000; // Maximum iterations for iterative algorithms
    this.sportModels = sportMathModels; // Sport-specific models
  }

  /**
   * Advanced Kelly Criterion with multiple outcomes
   * @param {Array} probabilities - Array of outcome probabilities
   * @param {Array} odds - Array of corresponding odds
   * @param {number} correlation - Correlation coefficient between outcomes
   * @returns {Object} - Kelly fractions and expected growth
   */
  multiOutcomeKelly(probabilities, odds, correlation = 0) {
    try {
      if (probabilities.length !== odds.length) {
        throw new Error('Probabilities and odds arrays must have the same length');
      }

      const n = probabilities.length;
      const p = probabilities;
      const b = odds.map(o => o - 1); // Net odds

      // Create covariance matrix
      const covMatrix = Matrix.zeros(n, n);
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (i === j) {
            covMatrix.set(i, j, p[i] * (1 - p[i]));
          } else {
            covMatrix.set(i, j, correlation * Math.sqrt(p[i] * (1 - p[i]) * p[j] * (1 - p[j])));
          }
        }
      }

      // Calculate Kelly fractions using matrix operations
      const expectedReturns = p.map((prob, i) => prob * b[i] - (1 - prob));
      const kellyFractions = [];

      // Solve for optimal fractions
      for (let i = 0; i < n; i++) {
        const numerator = expectedReturns[i];
        const denominator = b[i];
        kellyFractions.push(Math.max(0, numerator / denominator));
      }

      // Calculate expected growth rate
      const expectedGrowth = this.calculateExpectedGrowth(kellyFractions, p, b);

      return {
        fractions: kellyFractions,
        expectedGrowth,
        totalFraction: kellyFractions.reduce((sum, f) => sum + f, 0),
        riskMetrics: this.calculateRiskMetrics(kellyFractions, p, b, covMatrix)
      };
    } catch (error) {
      logger.error('Multi-outcome Kelly calculation failed:', error);
      throw new Error('Failed to calculate multi-outcome Kelly criterion');
    }
  }

  /**
   * Calculate expected growth rate for Kelly strategy
   * @param {Array} fractions - Kelly fractions
   * @param {Array} probabilities - Outcome probabilities
   * @param {Array} netOdds - Net odds (odds - 1)
   * @returns {number} - Expected growth rate
   */
  calculateExpectedGrowth(fractions, probabilities, netOdds) {
    let expectedGrowth = 0;
    const numOutcomes = Math.pow(2, probabilities.length);

    for (let outcome = 0; outcome < numOutcomes; outcome++) {
      let probability = 1;
      let return_ = 1;

      for (let i = 0; i < probabilities.length; i++) {
        const bit = (outcome >> i) & 1;
        if (bit === 1) {
          probability *= probabilities[i];
          return_ *= (1 + fractions[i] * netOdds[i]);
        } else {
          probability *= (1 - probabilities[i]);
          return_ *= (1 - fractions[i]);
        }
      }

      expectedGrowth += probability * Math.log(return_);
    }

    return expectedGrowth;
  }

  /**
   * Advanced Poisson distribution with time-varying intensity
   * @param {number} lambda - Base intensity parameter
   * @param {number} time - Time parameter
   * @param {number} seasonality - Seasonality factor
   * @returns {Object} - Poisson distribution parameters and probabilities
   */
  timeVaryingPoisson(lambda, time, seasonality = 0) {
    try {
      // Adjust lambda for time and seasonality
      const adjustedLambda = lambda * (1 + seasonality * Math.sin(2 * Math.PI * time));
      
      const probabilities = [];
      const maxK = Math.max(20, Math.ceil(adjustedLambda + 5 * Math.sqrt(adjustedLambda)));
      
      for (let k = 0; k <= maxK; k++) {
        const prob = this.poissonPMF(k, adjustedLambda);
        probabilities.push({ k, probability: prob });
      }

      return {
        adjustedLambda,
        mean: adjustedLambda,
        variance: adjustedLambda,
        probabilities,
        cdf: this.poissonCDF(probabilities)
      };
    } catch (error) {
      logger.error('Time-varying Poisson calculation failed:', error);
      throw new Error('Failed to calculate time-varying Poisson distribution');
    }
  }

  /**
   * Poisson Probability Mass Function
   * @param {number} k - Number of events
   * @param {number} lambda - Rate parameter
   * @returns {number} - Probability
   */
  poissonPMF(k, lambda) {
    if (lambda <= 0) return k === 0 ? 1 : 0;
    return Math.exp(-lambda + k * Math.log(lambda) - this.logFactorial(k));
  }

  /**
   * Poisson Cumulative Distribution Function
   * @param {Array} probabilities - Array of {k, probability} objects
   * @returns {Array} - Cumulative probabilities
   */
  poissonCDF(probabilities) {
    let cumulative = 0;
    return probabilities.map(p => {
      cumulative += p.probability;
      return { k: p.k, cdf: cumulative };
    });
  }

  /**
   * Log factorial using Stirling's approximation for large numbers
   * @param {number} n - Input number
   * @returns {number} - Log factorial
   */
  logFactorial(n) {
    if (n <= 1) return 0;
    if (n <= 170) {
      // Use direct calculation for small numbers
      let result = 0;
      for (let i = 2; i <= n; i++) {
        result += Math.log(i);
      }
      return result;
    }
    // Stirling's approximation for large numbers
    return n * Math.log(n) - n + 0.5 * Math.log(2 * Math.PI * n);
  }

  /**
   * Skellam distribution for score differences
   * @param {number} mu1 - Poisson parameter for team 1
   * @param {number} mu2 - Poisson parameter for team 2
   * @param {number} maxDiff - Maximum difference to calculate
   * @returns {Object} - Skellam distribution
   */
  skellamDistribution(mu1, mu2, maxDiff = 10) {
    try {
      const probabilities = [];
      
      for (let k = -maxDiff; k <= maxDiff; k++) {
        const prob = this.skellamPMF(k, mu1, mu2);
        probabilities.push({ difference: k, probability: prob });
      }

      return {
        mu1,
        mu2,
        mean: mu1 - mu2,
        variance: mu1 + mu2,
        probabilities
      };
    } catch (error) {
      logger.error('Skellam distribution calculation failed:', error);
      throw new Error('Failed to calculate Skellam distribution');
    }
  }

  /**
   * Skellam Probability Mass Function
   * @param {number} k - Score difference
   * @param {number} mu1 - Poisson parameter 1
   * @param {number} mu2 - Poisson parameter 2
   * @returns {number} - Probability
   */
  skellamPMF(k, mu1, mu2) {
    const term = Math.exp(-(mu1 + mu2)) * Math.pow(mu1 / mu2, k / 2);
    return term * this.modifiedBesselI(Math.abs(k), 2 * Math.sqrt(mu1 * mu2));
  }

  /**
   * Modified Bessel function of the first kind
   * @param {number} n - Order
   * @param {number} x - Argument
   * @returns {number} - Bessel function value
   */
  modifiedBesselI(n, x) {
    if (x === 0) return n === 0 ? 1 : 0;
    
    const ax = Math.abs(x);
    let result = 0;
    let term = Math.pow(ax / 2, n) / this.factorial(n);
    
    for (let k = 0; k < this.maxIterations; k++) {
      result += term;
      term *= Math.pow(ax / 2, 2) / ((k + 1) * (k + n + 1));
      
      if (Math.abs(term) < 1e-15) break;
    }
    
    return result;
  }

  /**
   * Factorial function with memoization
   * @param {number} n - Input number
   * @returns {number} - Factorial
   */
  factorial(n) {
    if (n <= 1) return 1;
    if (n > 170) return Infinity; // Prevent overflow
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  /**
   * Advanced Value at Risk calculation
   * @param {Array} returns - Array of returns
   * @param {number} confidence - Confidence level (0.95, 0.99, etc.)
   * @param {string} method - Method ('historical', 'parametric', 'montecarlo')
   * @returns {Object} - VaR calculations
   */
  advancedVaR(returns, confidence = 0.95, method = 'historical') {
    try {
      const sortedReturns = returns.slice().sort((a, b) => a - b);
      const n = returns.length;
      
      let var95, var99, cvar95, cvar99;
      
      switch (method) {
        case 'historical':
          var95 = -sortedReturns[Math.floor((1 - 0.95) * n)];
          var99 = -sortedReturns[Math.floor((1 - 0.99) * n)];
          cvar95 = -ss.mean(sortedReturns.slice(0, Math.floor((1 - 0.95) * n)));
          cvar99 = -ss.mean(sortedReturns.slice(0, Math.floor((1 - 0.99) * n)));
          break;
          
        case 'parametric':
          const mean = ss.mean(returns);
          const std = ss.standardDeviation(returns);
          var95 = -(mean + std * this.normalInverse(0.05));
          var99 = -(mean + std * this.normalInverse(0.01));
          cvar95 = -(mean + std * this.normalPDF(this.normalInverse(0.05)) / 0.05);
          cvar99 = -(mean + std * this.normalPDF(this.normalInverse(0.01)) / 0.01);
          break;
          
        case 'montecarlo':
          // Monte Carlo simulation
          const simReturns = this.monteCarloSimulation(returns, 10000);
          const sortedSim = simReturns.sort((a, b) => a - b);
          var95 = -sortedSim[Math.floor(0.05 * simReturns.length)];
          var99 = -sortedSim[Math.floor(0.01 * simReturns.length)];
          cvar95 = -ss.mean(sortedSim.slice(0, Math.floor(0.05 * simReturns.length)));
          cvar99 = -ss.mean(sortedSim.slice(0, Math.floor(0.01 * simReturns.length)));
          break;
      }
      
      return {
        method,
        var95,
        var99,
        cvar95,
        cvar99,
        maxDrawdown: this.calculateMaxDrawdown(returns),
        sharpeRatio: this.calculateSharpeRatio(returns),
        sortinoRatio: this.calculateSortinoRatio(returns)
      };
    } catch (error) {
      logger.error('Advanced VaR calculation failed:', error);
      throw new Error('Failed to calculate advanced VaR');
    }
  }

  /**
   * Monte Carlo simulation for returns
   * @param {Array} historicalReturns - Historical returns data
   * @param {number} simulations - Number of simulations
   * @returns {Array} - Simulated returns
   */
  monteCarloSimulation(historicalReturns, simulations = 10000) {
    const mean = ss.mean(historicalReturns);
    const std = ss.standardDeviation(historicalReturns);
    const simulated = [];
    
    for (let i = 0; i < simulations; i++) {
      const random = this.normalRandom();
      simulated.push(mean + std * random);
    }
    
    return simulated;
  }

  /**
   * Generate random number from normal distribution
   * @returns {number} - Random number from N(0,1)
   */
  normalRandom() {
    // Box-Muller transform
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  /**
   * Normal distribution inverse (quantile function)
   * @param {number} p - Probability
   * @returns {number} - Quantile
   */
  normalInverse(p) {
    // Approximation using rational function
    const c = [2.515517, 0.802853, 0.010328];
    const d = [1.432788, 0.189269, 0.001308];
    
    if (p > 0.5) {
      return -this.normalInverse(1 - p);
    }
    
    const t = Math.sqrt(-2 * Math.log(p));
    return t - (c[0] + c[1] * t + c[2] * t * t) / (1 + d[0] * t + d[1] * t * t + d[2] * t * t * t);
  }

  /**
   * Normal distribution probability density function
   * @param {number} x - Input value
   * @returns {number} - PDF value
   */
  normalPDF(x) {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  }

  /**
   * Calculate maximum drawdown
   * @param {Array} returns - Array of returns
   * @returns {number} - Maximum drawdown
   */
  calculateMaxDrawdown(returns) {
    let peak = 0;
    let maxDrawdown = 0;
    let cumulative = 0;
    
    for (const return_ of returns) {
      cumulative += return_;
      peak = Math.max(peak, cumulative);
      const drawdown = peak - cumulative;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }
    
    return maxDrawdown;
  }

  /**
   * Calculate Sharpe ratio
   * @param {Array} returns - Array of returns
   * @param {number} riskFreeRate - Risk-free rate
   * @returns {number} - Sharpe ratio
   */
  calculateSharpeRatio(returns, riskFreeRate = 0) {
    const mean = ss.mean(returns);
    const std = ss.standardDeviation(returns);
    return std === 0 ? 0 : (mean - riskFreeRate) / std;
  }

  /**
   * Calculate Sortino ratio
   * @param {Array} returns - Array of returns
   * @param {number} targetReturn - Target return
   * @returns {number} - Sortino ratio
   */
  calculateSortinoRatio(returns, targetReturn = 0) {
    const mean = ss.mean(returns);
    const downside = returns.filter(r => r < targetReturn);
    const downsideStd = downside.length > 0 ? ss.standardDeviation(downside) : 0;
    return downsideStd === 0 ? 0 : (mean - targetReturn) / downsideStd;
  }

  /**
   * Calculate risk metrics for portfolio
   * @param {Array} fractions - Position fractions
   * @param {Array} probabilities - Outcome probabilities
   * @param {Array} netOdds - Net odds
   * @param {Matrix} covMatrix - Covariance matrix
   * @returns {Object} - Risk metrics
   */
  calculateRiskMetrics(fractions, probabilities, netOdds, covMatrix) {
    const expectedReturn = fractions.reduce((sum, f, i) => sum + f * (probabilities[i] * netOdds[i] - (1 - probabilities[i])), 0);
    
    // Calculate portfolio variance
    let portfolioVariance = 0;
    for (let i = 0; i < fractions.length; i++) {
      for (let j = 0; j < fractions.length; j++) {
        portfolioVariance += fractions[i] * fractions[j] * covMatrix.get(i, j);
      }
    }
    
    const portfolioStd = Math.sqrt(portfolioVariance);
    const sharpeRatio = portfolioStd === 0 ? 0 : expectedReturn / portfolioStd;
    
    return {
      expectedReturn,
      portfolioVariance,
      portfolioStd,
      sharpeRatio,
      diversificationRatio: this.calculateDiversificationRatio(fractions, covMatrix)
    };
  }

  /**
   * Calculate diversification ratio
   * @param {Array} fractions - Position fractions
   * @param {Matrix} covMatrix - Covariance matrix
   * @returns {number} - Diversification ratio
   */
  calculateDiversificationRatio(fractions, covMatrix) {
    const weightedAvgVol = fractions.reduce((sum, f, i) => sum + f * Math.sqrt(covMatrix.get(i, i)), 0);
    
    let portfolioVariance = 0;
    for (let i = 0; i < fractions.length; i++) {
      for (let j = 0; j < fractions.length; j++) {
        portfolioVariance += fractions[i] * fractions[j] * covMatrix.get(i, j);
      }
    }
    
    const portfolioVol = Math.sqrt(portfolioVariance);
    return portfolioVol === 0 ? 0 : weightedAvgVol / portfolioVol;
  }

  /**
   * Optimize portfolio using mean-variance optimization
   * @param {Array} expectedReturns - Expected returns for each asset
   * @param {Matrix} covMatrix - Covariance matrix
   * @param {number} targetReturn - Target return
   * @returns {Object} - Optimal portfolio weights
   */
  meanVarianceOptimization(expectedReturns, covMatrix, targetReturn = null) {
    try {
      const n = expectedReturns.length;
      const ones = Matrix.ones(n, 1);
      const mu = new Matrix([expectedReturns]).transpose();
      
      // Inverse of covariance matrix
      const invCov = covMatrix.inverse();
      
      // Calculate A, B, C for the efficient frontier
      const A = ones.transpose().mmul(invCov).mmul(ones).get(0, 0);
      const B = ones.transpose().mmul(invCov).mmul(mu).get(0, 0);
      const C = mu.transpose().mmul(invCov).mmul(mu).get(0, 0);
      
      const discriminant = A * C - B * B;
      
      if (targetReturn === null) {
        // Maximum Sharpe ratio portfolio
        const weights = invCov.mmul(mu).div(B);
        return {
          weights: weights.to1DArray(),
          expectedReturn: C / B,
          variance: 1 / B,
          sharpeRatio: Math.sqrt(C - B * B / A)
        };
      } else {
        // Portfolio for specific target return
        const lambda = (C - B * targetReturn) / discriminant;
        const gamma = (A * targetReturn - B) / discriminant;
        
        const weights = invCov.mmul(mu.mul(lambda).add(ones.mul(gamma)));
        const variance = lambda * targetReturn + gamma;
        
        return {
          weights: weights.to1DArray(),
          expectedReturn: targetReturn,
          variance,
          sharpeRatio: targetReturn / Math.sqrt(variance)
        };
      }
    } catch (error) {
      logger.error('Mean-variance optimization failed:', error);
      throw new Error('Failed to optimize portfolio');
    }
  }

  /**
   * Sport-specific probability calculations
   * @param {string} sport - Sport type
   * @param {Object} matchData - Match-specific data
   * @param {Object} weather - Weather conditions
   * @returns {Object} - Comprehensive probabilities and predictions
   */
  calculateSportProbabilities(sport, matchData, weather = {}) {
    try {
      switch (sport.toLowerCase()) {
        case 'football':
        case 'soccer':
          return this.sportModels.footballDixonColes(
            matchData.homeStats,
            matchData.awayStats,
            weather
          );
          
        case 'tennis':
          return this.sportModels.tennisMarkovChain(
            matchData.player1Stats,
            matchData.player2Stats,
            matchData.surface,
            weather
          );
          
        case 'basketball':
          return this.sportModels.basketballFourFactors(
            matchData.teamStats,
            matchData.opponentStats,
            matchData.venue
          );
          
        case 'hockey':
          return this.sportModels.hockeyAdvancedStats(
            matchData.teamStats,
            matchData.oppStats,
            matchData.goalieSave
          );
          
        case 'baseball':
          return this.sportModels.baseballSabermetrics(
            matchData.pitcherStats,
            matchData.teamStats,
            matchData.parkFactor,
            weather
          );
          
        default:
          throw new Error(`Unknown sport: ${sport}`);
      }
    } catch (error) {
      logger.error('Sport probability calculation failed:', error);
      throw error;
    }
  }

  /**
   * Enhanced Kelly Criterion for sports betting
   * @param {Object} betData - Betting data
   * @param {number} bankroll - Current bankroll
   * @param {number} kellyMultiplier - Kelly fraction multiplier (0-1)
   * @returns {Object} - Optimal stake and risk metrics
   */
  calculateOptimalStake(betData, bankroll, kellyMultiplier = 0.25) {
    const { probability, odds, confidence = 1.0 } = betData;
    
    // Adjust probability based on confidence
    const adjustedProb = probability * confidence;
    
    // Calculate Kelly fraction
    const b = odds - 1;
    const q = 1 - adjustedProb;
    const kellyFraction = (b * adjustedProb - q) / b;
    
    // Apply multiplier and constraints
    const optimalFraction = Math.max(0, kellyFraction * kellyMultiplier);
    const optimalStake = optimalFraction * bankroll;
    
    // Calculate risk metrics
    const expectedValue = optimalStake * (adjustedProb * b - q);
    const variance = optimalStake * optimalStake * adjustedProb * q * b * b;
    const stdDev = Math.sqrt(variance);
    
    // Calculate probability of ruin using Gambler's ruin formula
    const ruinProb = this.calculateRuinProbability(bankroll, optimalStake, adjustedProb, odds);
    
    return {
      optimalStake,
      fraction: optimalFraction,
      expectedValue,
      variance,
      stdDev,
      sharpeRatio: stdDev > 0 ? expectedValue / stdDev : 0,
      ruinProbability: ruinProb,
      confidence
    };
  }

  /**
   * Calculate probability of ruin
   * @param {number} bankroll - Current bankroll
   * @param {number} stake - Bet stake
   * @param {number} probability - Win probability
   * @param {number} odds - Decimal odds
   * @returns {number} - Probability of ruin
   */
  calculateRuinProbability(bankroll, stake, probability, odds) {
    if (stake >= bankroll) return 1;
    if (stake <= 0) return 0;
    
    const q = 1 - probability;
    const p = probability;
    const b = odds - 1;
    
    // Using approximation for finite bankroll
    const r = q / (p * b);
    if (r >= 1) return 1;
    
    const n = Math.floor(bankroll / stake);
    return Math.pow(r, n);
  }
}

module.exports = new MathEngine(); 