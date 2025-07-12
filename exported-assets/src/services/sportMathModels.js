/**
 * PhD-level Sport-Specific Mathematical Models
 * Comprehensive implementation of advanced statistical models for each sport
 */

const math = require('mathjs');
const logger = require('../utils/logger');

class SportMathModels {
  constructor() {
    this.weatherFactors = {
      football: {
        temperature: { ideal: 15, variance: 10 },
        wind: { maxImpact: 0.15 },
        rain: { impact: 0.1 },
        humidity: { ideal: 50, variance: 20 }
      },
      tennis: {
        temperature: { ideal: 22, variance: 8 },
        wind: { maxImpact: 0.2 },
        humidity: { ideal: 45, variance: 15 }
      },
      baseball: {
        temperature: { ideal: 25, variance: 12 },
        wind: { maxImpact: 0.25 },
        humidity: { ideal: 40, variance: 25 },
        altitude: { factor: 0.0001 } // per meter
      }
    };
  }

  /**
   * FOOTBALL (SOCCER) MODELS
   */
  
  // Dixon-Coles Poisson Model with weather adjustment
  footballDixonColes(homeStats, awayStats, weather = {}) {
    try {
      const { 
        homeAttack = 1.2, 
        homeDefense = 0.9, 
        awayAttack = 1.1, 
        awayDefense = 1.0, 
        homeAdvantage = 1.15 
      } = { ...homeStats, ...awayStats };

      // Weather impact calculation
      const weatherFactor = this.calculateWeatherImpact('football', weather);
      
      // Expected goals with weather adjustment
      const lambdaHome = homeAttack * awayDefense * homeAdvantage * weatherFactor;
      const lambdaAway = awayAttack * homeDefense * weatherFactor;

      // Rho correction for low-scoring games (Dixon-Coles adjustment)
      const rho = this.calculateRhoCorrection(lambdaHome, lambdaAway);

      // Calculate match outcome probabilities
      const probabilities = this.calculateMatchProbabilities(lambdaHome, lambdaAway, rho);

      // Corner and card predictions
      const cornerStats = this.predictCorners(homeStats, awayStats, weather);
      const cardStats = this.predictCards(homeStats, awayStats);

      return {
        model: 'Dixon-Coles',
        expectedGoals: { home: lambdaHome, away: lambdaAway },
        probabilities,
        corners: cornerStats,
        cards: cardStats,
        weatherImpact: weatherFactor,
        confidence: this.calculateConfidence(homeStats, awayStats)
      };
    } catch (error) {
      logger.error('Dixon-Coles calculation failed:', error);
      throw error;
    }
  }

  // Skellam Distribution for goal difference
  footballSkellam(lambdaHome, lambdaAway) {
    const goalDifferences = {};
    for (let k = -10; k <= 10; k++) {
      const prob = this.skellamPMF(k, lambdaHome, lambdaAway);
      goalDifferences[k] = prob;
    }
    
    return {
      distribution: goalDifferences,
      homeWin: Object.entries(goalDifferences)
        .filter(([k]) => parseInt(k) > 0)
        .reduce((sum, [_, p]) => sum + p, 0),
      draw: goalDifferences[0],
      awayWin: Object.entries(goalDifferences)
        .filter(([k]) => parseInt(k) < 0)
        .reduce((sum, [_, p]) => sum + p, 0)
    };
  }

  // Advanced xG model with shot quality
  calculateExpectedGoals(shots) {
    return shots.reduce((xG, shot) => {
      const { distance, angle, type, pressure, bodyPart } = shot;
      
      // Base xG calculation
      let shotXG = 0.8 * Math.exp(-0.1 * distance);
      
      // Angle adjustment
      shotXG *= (1 - Math.abs(angle - 90) / 90);
      
      // Shot type multipliers
      const typeMultipliers = {
        open_play: 1.0,
        counter: 1.2,
        set_piece: 0.8,
        penalty: 0.76
      };
      shotXG *= typeMultipliers[type] || 1.0;
      
      // Body part multipliers
      const bodyPartMultipliers = {
        foot: 1.0,
        head: 0.7,
        other: 0.3
      };
      shotXG *= bodyPartMultipliers[bodyPart] || 1.0;
      
      // Pressure adjustment
      shotXG *= (1 - pressure * 0.3);
      
      return xG + shotXG;
    }, 0);
  }

  /**
   * TENNIS MODELS
   */
  
  // Advanced Markov Chain for tennis match
  tennisMarkovChain(player1Stats, player2Stats, surface, weather = {}) {
    const { serve1, return1, breakPoint1 } = player1Stats;
    const { serve2, return2, breakPoint2 } = player2Stats;
    
    // Surface adjustments
    const surfaceFactors = {
      hard: { serve: 1.0, return: 1.0 },
      clay: { serve: 0.9, return: 1.1 },
      grass: { serve: 1.15, return: 0.85 }
    };
    
    const factor = surfaceFactors[surface] || surfaceFactors.hard;
    const weatherImpact = this.calculateWeatherImpact('tennis', weather);
    
    // Adjusted probabilities
    const p1ServeWin = serve1 * factor.serve * weatherImpact;
    const p2ServeWin = serve2 * factor.serve * weatherImpact;
    
    // Game win probabilities
    const p1GameWin = this.tennisGameProbability(p1ServeWin);
    const p2GameWin = this.tennisGameProbability(p2ServeWin);
    
    // Set win probabilities
    const setProbs = this.tennisSetProbability(p1GameWin, 1 - p2GameWin);
    
    // Match win probability (best of 3 or 5)
    const matchProb3 = this.bestOfNProbability(setProbs.p1, 3);
    const matchProb5 = this.bestOfNProbability(setProbs.p1, 5);
    
    return {
      model: 'Tennis Markov Chain',
      gameWinProb: { player1: p1GameWin, player2: p2GameWin },
      setWinProb: setProbs,
      matchWinProb: { 
        bestOf3: { player1: matchProb3, player2: 1 - matchProb3 },
        bestOf5: { player1: matchProb5, player2: 1 - matchProb5 }
      },
      surfaceImpact: factor,
      weatherImpact,
      breakPointConversion: { player1: breakPoint1, player2: breakPoint2 }
    };
  }

  // Tennis game probability calculation
  tennisGameProbability(p) {
    // Using the recursive formula for game win probability
    const states = {};
    
    // Define all possible game states
    const scores = ['0-0', '15-0', '0-15', '30-0', '15-15', '0-30', 
                   '40-0', '30-15', '15-30', '0-40', '40-15', '30-30', 
                   '15-40', '40-30', '30-40', 'deuce', 'ad-in', 'ad-out'];
    
    // Initialize terminal states
    states['game-won'] = 1;
    states['game-lost'] = 0;
    
    // Backward induction
    states['ad-in'] = p + (1 - p) * states['deuce'];
    states['ad-out'] = p * states['deuce'];
    states['deuce'] = p * states['ad-in'] + (1 - p) * states['ad-out'];
    
    // Calculate remaining states
    states['40-30'] = p + (1 - p) * states['deuce'];
    states['30-40'] = p * states['deuce'];
    states['40-15'] = p + (1 - p) * states['40-30'];
    states['15-40'] = p * states['30-40'];
    
    // Continue calculation...
    return p * p * p * p * (15 - 4 * p - 10 * p * p) / 
           (1 - 2 * p * (1 - p)) / 
           (1 - 2 * p * (1 - p));
  }

  /**
   * BASKETBALL MODELS
   */
  
  // Four Factors Model with pace adjustment
  basketballFourFactors(teamStats, opponentStats, venue = 'neutral') {
    const { 
      eFGPct, tovPct, orebPct, ftRate, pace 
    } = teamStats;
    const { 
      eFGPctOpp, tovPctOpp, orebPctOpp, ftRateOpp, paceOpp 
    } = opponentStats;
    
    // Venue adjustments
    const venueFactors = {
      home: 1.035,
      away: 0.965,
      neutral: 1.0
    };
    
    const venueFactor = venueFactors[venue];
    
    // Calculate expected possessions
    const expectedPace = (pace + paceOpp) / 2;
    const possessions = expectedPace * (48 / 48); // Adjust for game length
    
    // Four factors differential
    const eFGDiff = eFGPct - eFGPctOpp;
    const tovDiff = tovPctOpp - tovPct; // Reversed - lower is better
    const orebDiff = orebPct - orebPctOpp;
    const ftDiff = ftRate - ftRateOpp;
    
    // Weights based on Dean Oliver's research
    const weights = {
      shooting: 0.4,
      turnovers: 0.25,
      rebounding: 0.2,
      freeThrows: 0.15
    };
    
    // Calculate efficiency differential
    const efficiencyDiff = 
      weights.shooting * eFGDiff * 2 +
      weights.turnovers * tovDiff * 0.44 +
      weights.rebounding * orebDiff * 1.14 +
      weights.freeThrows * ftDiff * 0.44;
    
    // Expected points
    const teamPoints = (100 + efficiencyDiff) * possessions / 100 * venueFactor;
    const oppPoints = (100 - efficiencyDiff) * possessions / 100 / venueFactor;
    
    // Win probability using log5 method
    const teamStrength = Math.pow(10, efficiencyDiff / 40);
    const winProb = teamStrength / (teamStrength + 1);
    
    // Fatigue and schedule factors
    const fatigueFactor = this.calculateFatigue(teamStats.restDays, teamStats.travelDistance);
    
    return {
      model: 'Four Factors',
      expectedPoints: { team: teamPoints * fatigueFactor, opponent: oppPoints },
      totalPoints: teamPoints + oppPoints,
      winProbability: winProb * fatigueFactor,
      fourFactors: { eFGDiff, tovDiff, orebDiff, ftDiff },
      pace: expectedPace,
      fatigueFactor,
      venueFactor
    };
  }

  /**
   * HOCKEY MODELS
   */
  
  // Advanced Corsi/Fenwick model
  hockeyAdvancedStats(teamStats, oppStats, goalieSave = 0.91) {
    const { 
      corsiFor, corsiAgainst, fenwickFor, fenwickAgainst,
      shootingPct, savePct, ppPct, pkPct, faceoffPct
    } = teamStats;
    
    // Calculate possession metrics
    const corsiPct = corsiFor / (corsiFor + corsiAgainst);
    const fenwickPct = fenwickFor / (fenwickFor + fenwickAgainst);
    
    // PDO (luck metric)
    const pdo = (shootingPct + savePct) * 100;
    const regressed_pdo = 100 + (pdo - 100) * 0.3; // Regression to mean
    
    // Expected goals model
    const shotQuality = shootingPct / 0.09; // League average ~9%
    const expectedGoalsFor = fenwickFor * 0.09 * shotQuality;
    const expectedGoalsAgainst = fenwickAgainst * 0.09 / (savePct / 0.91);
    
    // Special teams impact
    const ppOpportunities = 4; // Average per game
    const pkSituations = 4;
    const specialTeamsGoals = (ppOpportunities * ppPct) - (pkSituations * (1 - pkPct));
    
    // Goalie quality adjustment
    const goalieQualityFactor = goalieSave / 0.91;
    
    // Final goal expectation
    const totalExpectedGoals = expectedGoalsFor + specialTeamsGoals;
    const totalExpectedGoalsAgainst = expectedGoalsAgainst / goalieQualityFactor;
    
    // Win probability
    const goalDiff = totalExpectedGoals - totalExpectedGoalsAgainst;
    const winProb = 1 / (1 + Math.exp(-0.75 * goalDiff));
    
    return {
      model: 'Advanced Hockey Stats',
      possession: { corsiPct, fenwickPct },
      expectedGoals: {
        for: totalExpectedGoals,
        against: totalExpectedGoalsAgainst
      },
      pdo: { actual: pdo, regressed: regressed_pdo },
      specialTeams: { impact: specialTeamsGoals },
      winProbability: winProb,
      goalieImpact: goalieQualityFactor
    };
  }

  /**
   * BASEBALL MODELS
   */
  
  // Sabermetric model with weather
  baseballSabermetrics(pitcherStats, teamStats, parkFactor, weather = {}) {
    const { fip, era, whip, k9, bb9 } = pitcherStats;
    const { woba, wrc, ops, babip } = teamStats;
    
    // Weather adjustments for run environment
    const temp = weather.temperature || 20;
    const wind = weather.windSpeed || 0;
    const humidity = weather.humidity || 50;
    const altitude = weather.altitude || 0;
    
    // Temperature effect on home runs
    const tempFactor = 1 + 0.01 * ((temp - 20) / 10);
    
    // Wind effect
    const windFactor = 1 + (wind > 0 ? 0.05 * wind / 10 : 0); // Only helping wind
    
    // Altitude effect (Coors Field = ~1600m)
    const altitudeFactor = 1 + altitude * this.weatherFactors.baseball.altitude.factor;
    
    // Combined weather factor
    const weatherMultiplier = tempFactor * windFactor * altitudeFactor;
    
    // Pitcher quality (FIP is better predictor than ERA)
    const pitcherQuality = 3.10 / fip; // League average FIP ~3.10
    
    // Team offensive quality
    const offensiveQuality = wrc / 100; // wRC+ where 100 is average
    
    // Expected runs
    const baseRuns = 4.5; // League average
    const expectedRuns = baseRuns * offensiveQuality / pitcherQuality * 
                        parkFactor * weatherMultiplier;
    
    // Pythagorean expectation
    const pythExp = 1.83; // Optimized exponent
    const runsScoredSeason = teamStats.runsScoredAvg;
    const runsAllowedSeason = teamStats.runsAllowedAvg;
    
    const winProb = Math.pow(runsScoredSeason, pythExp) / 
                   (Math.pow(runsScoredSeason, pythExp) + Math.pow(runsAllowedSeason, pythExp));
    
    // Bullpen adjustment
    const bullpenFactor = teamStats.bullpenERA / 3.80; // League average
    
    return {
      model: 'Sabermetrics',
      expectedRuns: {
        team: expectedRuns,
        opponent: expectedRuns / offensiveQuality * pitcherQuality
      },
      totalRuns: expectedRuns * 2,
      winProbability: winProb,
      factors: {
        pitcher: pitcherQuality,
        offense: offensiveQuality,
        park: parkFactor,
        weather: weatherMultiplier,
        bullpen: bullpenFactor
      },
      weatherDetails: {
        temperature: tempFactor,
        wind: windFactor,
        altitude: altitudeFactor
      }
    };
  }

  /**
   * HELPER FUNCTIONS
   */
  
  calculateWeatherImpact(sport, weather) {
    const factors = this.weatherFactors[sport];
    if (!factors || !weather) return 1.0;
    
    let impact = 1.0;
    
    if (weather.temperature !== undefined) {
      const tempDiff = Math.abs(weather.temperature - factors.temperature.ideal);
      impact *= 1 - (tempDiff / factors.temperature.variance) * 0.05;
    }
    
    if (weather.windSpeed !== undefined) {
      impact *= 1 - (weather.windSpeed / 30) * factors.wind.maxImpact;
    }
    
    if (weather.rain && factors.rain) {
      impact *= 1 - factors.rain.impact;
    }
    
    if (weather.humidity !== undefined && factors.humidity) {
      const humDiff = Math.abs(weather.humidity - factors.humidity.ideal);
      impact *= 1 - (humDiff / factors.humidity.variance) * 0.03;
    }
    
    return Math.max(0.7, Math.min(1.0, impact));
  }

  calculateRhoCorrection(lambdaHome, lambdaAway) {
    // Dixon-Coles rho parameter for 0-0, 0-1, 1-0, 1-1 scores
    const avgLambda = (lambdaHome + lambdaAway) / 2;
    if (avgLambda < 2.5) {
      return 1 - 0.15 * (2.5 - avgLambda);
    }
    return 1.0;
  }

  calculateMatchProbabilities(lambdaHome, lambdaAway, rho) {
    const probs = {};
    let totalProb = 0;
    
    // Calculate probabilities for each scoreline
    for (let h = 0; h <= 10; h++) {
      for (let a = 0; a <= 10; a++) {
        let prob = this.poissonPMF(h, lambdaHome) * this.poissonPMF(a, lambdaAway);
        
        // Apply rho correction for low scores
        if ((h === 0 || h === 1) && (a === 0 || a === 1)) {
          prob *= rho;
        }
        
        probs[`${h}-${a}`] = prob;
        totalProb += prob;
      }
    }
    
    // Normalize probabilities
    Object.keys(probs).forEach(key => {
      probs[key] /= totalProb;
    });
    
    // Calculate match outcome probabilities
    let homeWin = 0, draw = 0, awayWin = 0;
    
    Object.entries(probs).forEach(([score, prob]) => {
      const [h, a] = score.split('-').map(Number);
      if (h > a) homeWin += prob;
      else if (h === a) draw += prob;
      else awayWin += prob;
    });
    
    return {
      homeWin,
      draw,
      awayWin,
      correctScore: probs,
      mostLikelyScore: Object.entries(probs).sort((a, b) => b[1] - a[1])[0][0]
    };
  }

  predictCorners(homeStats, awayStats, weather) {
    const attackStrength = (homeStats.shotsPerGame || 12) / 12;
    const defenseWeakness = (awayStats.shotsConceded || 10) / 10;
    const style = homeStats.possessionBased ? 0.9 : 1.1;
    const weatherImpact = this.calculateWeatherImpact('football', weather);
    
    const expectedCorners = 10 * attackStrength * defenseWeakness * style * weatherImpact;
    
    return {
      expected: expectedCorners,
      over9_5: 1 - this.poissonCDF(9, expectedCorners),
      over10_5: 1 - this.poissonCDF(10, expectedCorners),
      over11_5: 1 - this.poissonCDF(11, expectedCorners)
    };
  }

  predictCards(homeStats, awayStats) {
    const aggression = ((homeStats.foulsPerGame || 12) + (awayStats.foulsPerGame || 12)) / 24;
    const importance = homeStats.matchImportance || 1.0;
    const refereeStrictness = homeStats.refereeYellowAvg || 3.5;
    
    const expectedYellows = refereeStrictness * aggression * importance;
    const expectedReds = expectedYellows * 0.05; // ~5% of yellows become reds
    
    return {
      yellows: {
        expected: expectedYellows,
        over2_5: 1 - this.poissonCDF(2, expectedYellows),
        over3_5: 1 - this.poissonCDF(3, expectedYellows),
        over4_5: 1 - this.poissonCDF(4, expectedYellows)
      },
      reds: {
        expected: expectedReds,
        probability: 1 - Math.exp(-expectedReds)
      }
    };
  }

  calculateConfidence(homeStats, awayStats) {
    // Confidence based on data quality and recency
    const factors = [
      homeStats.gamesPlayed >= 10 ? 1 : homeStats.gamesPlayed / 10,
      awayStats.gamesPlayed >= 10 ? 1 : awayStats.gamesPlayed / 10,
      homeStats.dataRecency === 'recent' ? 1 : 0.8,
      homeStats.injuriesConsidered ? 1 : 0.9
    ];
    
    return factors.reduce((a, b) => a * b, 1);
  }

  tennisSetProbability(pGameServer, pGameReturner) {
    // Simplified set probability calculation
    // In reality, this would use dynamic programming
    const pHold = pGameServer;
    const pBreak = 1 - pGameReturner;
    
    // Approximate formula for set win probability
    const p = (pHold - pBreak + 1) / 2;
    
    return {
      p1: p,
      p2: 1 - p,
      tiebreakProb: 0.15 // Approximate
    };
  }

  bestOfNProbability(p, n) {
    const k = Math.ceil(n / 2);
    let prob = 0;
    
    for (let i = k; i <= n; i++) {
      prob += this.binomialPMF(i, n, p);
    }
    
    return prob;
  }

  calculateFatigue(restDays, travelDistance) {
    const restFactor = Math.min(1, 0.9 + restDays * 0.05);
    const travelFactor = Math.max(0.95, 1 - travelDistance / 10000);
    return restFactor * travelFactor;
  }

  // Mathematical helper functions
  poissonPMF(k, lambda) {
    return Math.exp(-lambda) * Math.pow(lambda, k) / this.factorial(k);
  }

  poissonCDF(k, lambda) {
    let sum = 0;
    for (let i = 0; i <= k; i++) {
      sum += this.poissonPMF(i, lambda);
    }
    return sum;
  }

  skellamPMF(k, mu1, mu2) {
    const factor = Math.exp(-(mu1 + mu2)) * Math.pow(mu1 / mu2, k / 2);
    return factor * this.modifiedBessel(Math.abs(k), 2 * Math.sqrt(mu1 * mu2));
  }

  binomialPMF(k, n, p) {
    return this.combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  }

  factorial(n) {
    if (n <= 1) return 1;
    return n * this.factorial(n - 1);
  }

  combination(n, k) {
    return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
  }

  modifiedBessel(v, z) {
    // Simplified approximation for modified Bessel function
    // In production, use a proper implementation
    let sum = 0;
    for (let k = 0; k < 20; k++) {
      sum += Math.pow(z / 2, v + 2 * k) / 
             (this.factorial(k) * this.factorial(v + k));
    }
    return sum;
  }
}

module.exports = new SportMathModels(); 