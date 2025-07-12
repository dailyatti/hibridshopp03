/**
 * Language Pack Module - Tiszta és Professzionális
 * Többnyelvű támogatás könnyen bővíthető struktúrával
 * Alapértelmezett nyelv: Angol
 * Kiválasztott nyelv tárolása localStorage-ban
 */

class LanguagePack {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'en';
        this.languages = {
            en: {
                // === HEADER & NAVIGATION ===
                title: 'Advanced Sports Betting Analyzer',
                subtitle: 'Professional Multi-Sport AI Analysis',
                navSettings: 'API Settings',
                navTips: 'Image Collection',
                navCalculator: 'Analysis & Data Processing',
                navPortfolio: 'Results',
                navMath: 'Mathematics',
                navGuide: 'Guide',

                // === API CONFIGURATION ===
                apiConfigTitle: 'OpenAI API Configuration',
                apiKeyLabel: 'OpenAI API Key (GPT-4o Vision)',
                apiKeyPlaceholder: 'sk-proj-...',
                testApiButton: 'Test API Connection',
                apiStatusText: 'API status...',
                testingInProgress: 'Testing in progress...',
                testingApiConnection: 'Testing API connection...',
                apiConnectionSuccess: 'API connection successful',
                apiConnectionFailed: 'API connection failed',
                
                // === AI MODEL SELECTION ===
                aiModelTitle: 'AI Model Selection',
                aiModelInfoTitle: 'Advanced AI Analysis:',
                aiModelInfoText: 'Select an AI model for complex text analysis (weather conditions, player injuries, tactical analysis). This is optional and enhances the mathematical calculations.',
                aiModelLabel: 'AI Model for Complex Analysis (Optional)',
                aiModelNone: 'None (Basic Analysis Only)',
                aiModelChatGPT: 'ChatGPT-4o',
                aiModelDeepSeek: 'DeepSeek',
                aiModelPerplexity: 'Perplexity',
                aiModelGemini: 'Google Gemini',
                aiModelHint: 'Advanced models can analyze weather, injuries, and tactical factors for more accurate predictions.',
                aiApiKeyLabel: 'AI Model API Key (Optional)',
                aiApiKeyPlaceholder: 'Enter API key for automated analysis...',
                aiApiKeyHint: 'Required only for automated analysis. Leave empty for manual prompts.',
                autoProcessingTitle: 'Automatic Processing:',
                autoProcessingText: 'If you provide an AI model and API key, the program will automatically process the prompt response and load the results. Without an AI model, you need to manually paste the JSON response.',
                autoProcessButton: 'Auto Process',
                autoProcessingPrompt: 'Auto Processing Prompt',
                autoProcessingData: 'Auto processing data with {model}...',
                postAnalysisSearch: 'Post-Analysis Comprehensive Search',
                postAnalysisSearchDescription: 'Performing comprehensive data search for all mathematical formulas...',
                notificationPostAnalysisSearchComplete: 'Post-analysis comprehensive search completed successfully',
                notificationPostAnalysisSearchError: 'Post-analysis search failed: {error}',
                downloadComplete: 'Download completed: {filename}',
                downloadPortfolioSummary: 'Portfolio Summary',
                downloadCalculationDetails: 'Mathematical Calculations', 
                downloadDataSources: 'Data Sources & Verification',
                downloadPerplexityResults: 'Perplexity AI Search Results',
                downloadPerplexitySearchTitle: 'PERPLEXITY AI AUTOMATIC DATA SEARCH RESULTS:',
                downloadPerplexitySearchIntro: 'Perplexity AI automatically searched the internet for the following information:',
                downloadPerplexitySearchResult: 'SEARCH RESULT',
                downloadPerplexityQuery: 'Search Query',
                downloadPerplexityTimestamp: 'Timestamp',
                downloadPerplexityInfo: 'FOUND INFORMATION',
                downloadPerplexitySources: 'SOURCES',
                downloadPerplexityReliability: 'RELIABILITY',
                downloadPerplexitySummary: 'PERPLEXITY SEARCH SUMMARY',
                downloadPerplexityTotalSearches: 'Total Searches',
                downloadPerplexityAvgReliability: 'Average Reliability',
                downloadPerplexityLastUpdate: 'Last Update',
                downloadPerplexityDisclaimer: 'IMPORTANT: This data was automatically collected by Perplexity AI. Please verify the reliability of sources and accuracy of information!',
                longTermProfitability: 'Long-term Profitability Analysis',
                expectedProfit: 'Expected Profit',
                winRate: 'Win Rate',
                longTermROI: 'Long-term ROI',
                maxDrawdown: 'Max Drawdown',
                profitablePortfolio: '✅ LONG-TERM PROFITABLE',
                unprofitablePortfolio: '❌ LONG-TERM UNPROFITABLE',
                confidence: 'Confidence',
                
                // === BANKROLL MANAGEMENT ===
                bankrollTitle: 'Bankroll Management',
                capitalLabel: 'Available Capital (EUR)',
                maxRiskLabel: 'Maximum Portfolio Risk (%)',
                maxRiskHint: 'Recommended: max 15% for conservative approach',
                kellyModifierSingleLabel: 'Kelly Modifier (Single)',
                kellyModifierSingleHint: 'Conservative Kelly applied to single bets',
                kellyModifierParlayLabel: 'Kelly Modifier (Parlay)',
                kellyModifierParlayHint: 'Extra conservative Kelly applied to parlay bets',
                comboStrategyLabel: 'Parlay Strategy',
                comboStrategyHighProb: 'High Probability Parlays',
                comboStrategyHighEV: 'High EV Parlays',
                comboStrategyHint: 'Choose whether probability or expected value should be the primary focus when generating parlays.',
                
                // === DATA INPUT MODES ===
                dataInputTitle: 'Multi-Sport Data Collection',
                imageInputMode: 'Image Upload',
                textInputMode: 'Text Input',
                textInputInfoTitle: 'Paste betting information:',
                textInputInfoText: '• Copy and paste from betting websites, forums, or tipster messages\n• Include match names, odds, markets, and any additional context\n• AI will extract all relevant information automatically',
                bettingTextLabel: 'Betting Information (Text)',
                bettingTextPlaceholder: 'Paste betting information here...\n\nExample:\nManchester City vs Arsenal\nHome Win: 2.10\nDraw: 3.40\nAway Win: 3.20\nOver 2.5 Goals: 1.85\nUnder 2.5 Goals: 1.95\n\nWeather: Light rain expected\nInjuries: Haaland questionable',
                processTextButton: 'Process Text Data',
                
                // === IMAGE UPLOAD ===
                imageUploadTitle: 'Multi-Sport Image Collection',
                uploadInfoTitle: 'Upload all relevant screenshots:',
                uploadInfoList: '• Multiple sports simultaneously (football, tennis, basketball, hockey)\n• Various markets (match results, goals, points, games)\n• Multiple bookmaker images for comparison\n• Statistical page images for detailed analysis (You can also paste with Ctrl+V!)',
                imageUploadAreaTitle: 'Sports Betting Image Upload',
                imageUploadAreaText: 'Drag files here, click the button, or paste from clipboard (Ctrl+V)',
                selectImagesButton: 'Select Images',
                initialAnalysisButton: 'Initial GPT-4o Analysis',
                deleteImagesButton: 'Delete Images Only',
                clearAllDataButton: 'Clear All Data',
                
                // === ANALYSIS & DATA PROCESSING ===
                analysisTitle: 'Analysis & Data Processing',
                analysisInfo: 'Image analysis results and data retrieval prompts will appear here.',
                retrievedDataLabel: 'Inserted Data (JSON response from LLM)',
                retrievedDataPlaceholder: 'Paste the complete, structured JSON response from large language models here...',
                processDataButton: 'Process All Data and Generate Recommendations',
                testJsonRepair: 'Test JSON Repair',
                enableAutoDataSearchLabel: '🔍 Automatic Data Search (Perplexity API)',
                autoDataSearchHint: 'If enabled, the program will automatically search the internet for all necessary data for each match. Perplexity API key required.',
                enablePostAnalysisSearchLabel: '🤖 Post-GPT Analysis Auto-Search',
                postAnalysisSearchHint: 'If enabled, after GPT image analysis completes, automatic comprehensive data search will start for all complex data. Perplexity API key required.',
                
                // === RESULTS ===
                resultsTitle: 'Portfolio Results',
                resultsInfo: 'Recommendations will appear after all data has been processed.',
                singleRecommendations: 'Single Bet Recommendations',
                parlayRecommendations: 'Parlay Recommendations',
                parlayBet: 'Parlay Bet',

                // === PORTFOLIO METRICS ===
                totalCapital: 'Total Capital',
                totalStake: 'Total Stake',
                remainingCapital: 'Remaining Capital',
                expectedProfit: 'Expected Profit',
                potentialWinnings: 'Potential Winnings',
                totalReturn: 'Total Return',
                expectedROI: 'Expected ROI',
                potentialMaxCapital: 'Potential Max Capital',
                potentialMaxCapitalHint: 'If all bets win: capital + all winnings',
                
                // === PORTFOLIO ANALYSIS ===
                capitalUtilization: 'capital utilization',
                ifAllWin: 'If all win',
                portfolioAnalysis: 'Portfolio Analysis',
                totalBets: 'Total Bets',
                singles: 'singles',
                parlays: 'parlays',
                avgBetSize: 'Average bet size',
                expectedProfitMargin: 'Expected profit margin',
                riskCategory: 'Risk category',
                riskHigh: 'High',
                riskMedium: 'Medium',
                riskLow: 'Low',
                professionalAdvice: 'Professional Advice',
                excellentPortfolio: 'Excellent portfolio with high expected return.',
                goodPortfolio: 'Good portfolio with appropriate risk-reward ratio.',
                conservativePortfolio: 'Conservative portfolio with low risk.',
                considerReducingRisk: 'Consider reducing risk.',

                // === BET DETAILS ===
                matchInfo: 'Match',
                betType: 'Bet Type',
                selection: 'Selection',
                vs: 'vs',
                confidence: 'Confidence',
                tipOdds: 'Odds',
                ourProbability: 'Our Probability',
                impliedProbability: 'Bookmaker\'s Implied',
                valueEdge: 'Value Edge',
                recommendedStake: 'Recommended Stake',
                grossReturn: 'Gross Return (if win)',
                expectedValue: 'Expected Value (EV)',
                detailedAnalysis: 'Detailed Analysis',
                mathematicalFoundation: 'Mathematical Foundation',
                profitIfWin: 'Profit if Win',

                // === COMPREHENSIVE MATH SECTION ===
                mathTitle: '📐 Mathematics Behind the Scenes',
                mathInfo: 'Below you will find all the formulas and their explanations that the program uses to calculate sports betting recommendations. Every calculation is transparent and mathematically sound.',
                
                // === BASIC MATHEMATICAL FORMULAS ===
                basicFormulasTitle: '🔢 Basic Mathematical Formulas',
                
                // 1. Edge (Advantage)
                mathEdgeTitle: '💰 1. Edge (Advantage)',
                mathFormulaLabel: '📊 Formula:',
                mathExplanationLabel: '📝 Explanation:',
                mathEdgeFormula: 'Edge = (Our Probability × Odds) - 1',
                mathEdgeExplanation: 'Edge shows how much "better" a bet is based on your probability estimate compared to what the bookmaker\'s odds suggest. A positive value indicates a potentially profitable bet in the long run. For example, if you estimate 60% probability and the odds are 2.00, your edge is (0.60 × 2.00) - 1 = 0.20 or 20%.',
                mathEdgeExample: '🎯 Example: P = 60%, Odds = 2.00 → Edge = (0.60 × 2.00) - 1 = 0.20 = 20%',
                
                // 2. Kelly Criterion
                mathKellyTitle: '🎯 2. Kelly Criterion (Optimal Stake Ratio)',
                mathKellyFormula: 'Kelly = (bp - q) / b',
                mathWhereLabel: '📋 Where:',
                mathKellyWhere: 'b = odds - 1 (decimal odds minus 1)\np = our probability\nq = 1 - p (losing probability)',
                mathKellyExplanation: 'The Kelly Criterion shows what percentage of your capital you should bet to maximize expected logarithmic growth. The program applies a conservative Kelly modifier (0.25-0.5) to reduce risk and avoid over-betting.',
                mathKellyExample: '🎯 Example: P = 60%, Odds = 2.00 → Kelly = (1.00 × 0.60 - 0.40) / 1.00 = 0.20 = 20%',
                mathKellyModifier: '⚠️ Conservative Modifier: Final stake = Kelly × Modifier (0.25 for singles, 0.15 for parlays)',
                
                // 3. Implied Probability
                mathImpliedTitle: '🎲 3. Implied Probability',
                mathImpliedFormula: 'Implied Probability = 1 / Decimal Odds',
                mathImpliedExplanation: 'This shows what probability the bookmaker\'s odds suggest. If your estimated probability is higher than this, the bet has positive expected value.',
                mathImpliedExample: '🎯 Example: Odds = 2.50 → Implied Probability = 1 / 2.50 = 0.40 = 40%',
                
                // 4. Expected Value (EV)
                mathEVTitle: '💎 4. Expected Value (EV)',
                mathEVFormula: 'EV = (Probability × Profit) - (1 - Probability) × Stake',
                mathEVExplanation: 'Expected value shows how much profit you can expect from a bet in the long run. Positive EV indicates a profitable bet over time.',
                mathEVExample: '🎯 Example: P = 60%, Stake = €100, Odds = 2.00 → EV = (0.60 × €100) - (0.40 × €100) = €20',
                
                // 5. ROI (Return on Investment)
                mathROITitle: '📈 5. ROI (Return on Investment)',
                mathROIFormula: 'ROI = (Expected Value / Stake) × 100%',
                mathROIExplanation: 'ROI shows the expected return as a percentage of your stake. Higher ROI indicates better value.',
                mathROIExample: '🎯 Example: EV = €20, Stake = €100 → ROI = (€20 / €100) × 100% = 20%',
                
                // 6. Parlay Calculations
                mathParlayTitle: '🎰 6. Parlay (Combination) Bets',
                mathParlayProbLabel: '🎲 Parlay probability:',
                mathParlayProbFormula: 'P_parlay = P₁ × P₂ × P₃ × ... × Pₙ',
                mathParlayOddsLabel: '💰 Parlay odds:',
                mathParlayOddsFormula: 'Odds_parlay = Odds₁ × Odds₂ × Odds₃ × ... × Oddsₙ',
                mathParlayExplanation: 'For combination bets, the total probability and odds are the product of the participating events. Kelly and edge calculations work the same as for single bets, but risk is significantly higher due to the multiplicative nature.',
                mathParlayExample: '🎯 Example: 3-leg parlay with 60%, 70%, 80% → P_parlay = 0.60 × 0.70 × 0.80 = 33.6%',
                
                // 7. Risk Management
                mathRiskTitle: '⚠️ 7. Risk Management Indicators',
                mathRiskPortfolioLabel: '📊 Portfolio risk:',
                mathRiskPortfolioFormula: 'Portfolio Risk = Σ(Individual Bet Stakes) / Total Capital',
                mathMinStakeLabel: '💰 Minimum stake:',
                mathMinStakeFormula: 'Min Stake = max(€5, 0.1% × Capital)',
                mathMaxRiskLabel: '🛡️ Maximum risk per bet:',
                mathMaxRiskFormula: 'Max Risk = min(Kelly × Modifier, 5% × Capital)',
                mathRiskExplanation: 'Risk management ensures no single bet can severely damage your bankroll. The system enforces minimum stakes for meaningful bets and maximum stakes to prevent over-exposure.',
                
                // === ADVANCED MATHEMATICAL MODELS ===
                advancedModelsTitle: '🧮 Advanced Mathematical Models',
                advancedModelsInfo: 'The system employs sophisticated statistical models for each sport to enhance prediction accuracy beyond simple probability estimates.',
                
                // === SPORT-SPECIFIC MODELS ===
                sportModelsTitle: '⚽ Sport-Specific Mathematical Models',
                sportModelsInfo: 'The following section details the statistical/probabilistic models applied by the system for different sports to refine probability estimates. These models provide a more accurate picture than simple statistics.',
                
                // Football ⚽
                footballTitle: '⚽ Football (Soccer)',
                footballDixonColes: '🎯 Dixon-Coles Poisson Model for Goal Prediction',
                footballDixonColesFormula: 'P(X=x, Y=y) = τ(x,y) × e^(-λ) × λˣ/x! × e^(-μ) × μʸ/y!',
                footballDixonColesExplanation: 'Advanced Poisson model that accounts for low-scoring nature of football. Includes correlation parameter τ(x,y) for score combinations like 0-0, 1-0, 0-1, 1-1 to better reflect real match dynamics.',
                footballSkellam: '📊 Skellam Distribution for Goal Difference',
                footballSkellamFormula: 'P(X-Y = k) = e^(-(λ+μ)) × (λ/μ)^(k/2) × I_k(2√(λμ))',
                footballSkellamExplanation: 'Models the goal difference between teams. Essential for Asian handicap and spread betting markets.',
                footballCornersModel: '🚩 Corners & Cards Mathematical Model',
                footballCornersFormula: 'E[Corners] = α × (Attacking_Strength × Defensive_Weakness) + β × Game_State',
                footballCornersExplanation: 'Predicts corner kicks and cards based on team playing styles, referee tendencies, and match context.',
                football1x2Model: '🏆 1X2 Market Probability Model',
                football1x2Formula: 'P(Home) = λ^h × e^(-λ) / (λ^h × e^(-λ) + Draw_Factor + μ^a × e^(-μ))',
                football1x2Explanation: 'Converts goal expectation into match result probabilities using Poisson distribution with draw bias correction.',
                
                // Tennis 🎾
                tennisTitle: '🎾 Tennis',
                tennisMarkov: '🔄 Markov Chain Model for Service Games',
                tennisMarkovFormula: 'P(Game) = p^4 × Σ(combinatorial_factors)',
                tennisMarkovExplanation: 'The model views a tennis match as a series of states (points, games, sets). Weather conditions significantly affect serve accuracy and ball trajectory. Surface type (clay, grass, hard) dramatically impacts bounce and player performance.',
                tennisEloModel: '📈 Advanced Elo-Based Point Prediction',
                tennisEloFormula: 'P(A beats B) = 1 / (1 + 10^((Rating_B - Rating_A)/400))',
                tennisEloExplanation: 'Dynamic rating system that adjusts for surface specialization, recent form, and head-to-head records.',
                tennisSurfaceModel: '🏟️ Surface-Specific Performance Model',
                tennisSurfaceFormula: 'Surface_Adjustment = Base_Rating × Surface_Multiplier × Weather_Factor',
                tennisSurfaceExplanation: 'Accounts for player specialization on different surfaces. Clay favors baseline players, grass favors serve-and-volley, hard courts are neutral.',
                
                // Basketball 🏀
                basketballTitle: '🏀 Basketball',
                basketballFourFactors: '🎯 Four Factors Model',
                basketballFourFactorsFormula: 'Win% = 0.4×eFG% + 0.25×TOV% + 0.2×ORB% + 0.15×FT/FGA',
                basketballFourFactorsExplanation: 'Dean Oliver\'s Four Factors: Effective Field Goal %, Turnover Rate, Offensive Rebounding %, Free Throw Rate. These four statistics explain ~95% of team success.',
                basketballAdvancedPossession: '⚡ Advanced Possession-Based Model',
                basketballPossessionFormula: 'Possessions = FGA + 0.44×FTA - ORB + TOV',
                basketballPossessionExplanation: 'Calculates true possessions to normalize for pace. Essential for accurate per-possession statistics.',
                basketballFatigueModel: '😴 Fatigue and Schedule Impact Model',
                basketballFatigueFormula: 'Fatigue_Factor = Days_Rest^(-0.3) × Travel_Distance^(-0.1)',
                basketballFatigueExplanation: 'Models impact of rest days, travel distance, and back-to-back games on team performance.',
                
                // Hockey 🏒
                hockeyTitle: '🏒 Hockey',
                hockeyAdvancedCorsi: '📊 Advanced Corsi/Fenwick Model',
                hockeyCorsiFormula: 'Corsi% = Shot_Attempts_For / (Shot_Attempts_For + Shot_Attempts_Against)',
                hockeyCorsiExplanation: 'Measures puck possession and territorial control. Better predictor of future success than goals/assists.',
                hockeyGoaltenderPerformance: '🥅 Goaltender Performance Model',
                hockeyGoalieFormula: 'Save% = (Shots_Against - Goals_Against) / Shots_Against',
                hockeyGoalieExplanation: 'Goaltender performance has 50-70% impact on game outcomes. Model accounts for shot quality, defensive support, and recent form.',
                hockeySpecialTeams: '⚡ Special Teams Advanced Model',
                hockeySpecialTeamsFormula: 'PP_Goal_Probability = PP% × (Opponent_PK% × Strength_Differential)',
                hockeySpecialTeamsExplanation: 'Power play and penalty kill efficiency often determines close games. Model includes man-advantage situations.',
                
                // Baseball ⚾
                baseballTitle: '⚾ Baseball',
                baseballSabermetric: '📊 Sabermetric Advanced Model',
                baseballSabermetricFormula: 'wOBA = (0.69×BB + 0.72×HBP + 0.89×1B + 1.27×2B + 1.62×3B + 2.10×HR) / PA',
                baseballSabermetricExplanation: 'Weighted On-Base Average (wOBA) provides comprehensive offensive evaluation. Accounts for all offensive contributions with proper weighting.',
                baseballPythagoreanEnhanced: '🏆 Pythagorean Expectation Enhanced',
                baseballPythagoreanFormula: 'Win% = Runs_Scored^x / (Runs_Scored^x + Runs_Allowed^x)',
                baseballPythagoreanExplanation: 'Predicts winning percentage based on runs scored vs allowed. Exponent x varies by league (typically 1.83 for MLB).',
                baseballStartingPitcher: '🎯 Starting Pitcher Impact Model',
                baseballPitcherFormula: 'ERA+ = (League_ERA / Player_ERA) × 100',
                baseballPitcherExplanation: 'Starting pitcher has 60-80% impact on game outcome. Model includes ERA+, WHIP, K/9, BB/9, and recent form.',
                baseballWeatherImpact: '🌤️ Weather Impact Comprehensive Model',
                baseballWeatherFormula: 'Weather_Factor = 1 + α×|T-21°C| + β×Wind_Speed + γ×Humidity + δ×Altitude',
                baseballWeatherExplanation: 'Wind direction/speed, temperature, humidity, and altitude significantly affect ball trajectory and scoring. Optimal conditions: 21°C, 40% humidity, <15km/h wind.',
                
                // Enhanced Weather and Player Impact Models
                weatherImpactTitle: '🌤️ Enhanced Weather Impact Model',
                weatherImpactFormula: 'W_factor = 1 + α×|T-T_opt| + β×Wind_Speed + γ×Precipitation + δ×Humidity + ε×Playing_Style',
                weatherImpactExplanation: 'Comprehensive weather model considering temperature deviation from optimal, wind effects, precipitation impact on ball control, humidity effects, and team playing style adaptation.',
                weatherOptimalTemps: '🌡️ Optimal Temperatures: Football 19°C, Baseball 21°C, Tennis 22°C',
                weatherPrecipitationImpact: '🌧️ Precipitation severely affects precision-based teams (short passing, technical play) with γ=0.3 penalty factor',
                
                keyPlayerImpactTitle: '👤 Critical Key Player Impact Model',
                keyPlayerImpactFormula: 'J_factor = ∏(1 - I_i × K_i × P_i)',
                keyPlayerImpactExplanation: 'Enhanced model accounting for player importance (I), key player multiplier (K), and position criticality (P). Key players now have 2.5× impact vs 1.5× previously.',
                keyPlayerPositionWeights: '🎯 Position Weights: Goalkeeper/Pitcher: 3.0, Playmaker: 2.8, Star Player: 2.5, Regular: 1.5',
                keyPlayerCriticalPositions: '⚠️ Critical positions (goalkeepers, pitchers, playmakers) can single-handedly determine match outcomes',
                
                // === INTEGRATED MATHEMATICAL ENGINE ===
                integratedEngineTitle: '🔧 Integrated Mathematical Engine',
                integratedEngineInfo: 'The system combines all mathematical models into a unified scoring system for optimal decision-making.',
                
                // Multi-Factor Scoring
                multiFactorTitle: '⚖️ Multi-Factor Scoring System',
                multiFactorFormula: 'Final_Score = 0.40×EV + 0.25×Kelly + 0.20×Confidence + 0.10×Sport_Specific + 0.05×Risk_Adjusted',
                multiFactorExplanation: 'Comprehensive scoring that balances expected value, optimal staking, confidence levels, sport-specific factors, and risk management.',
                
                // Long-term Profitability
                longTermTitle: '📈 Long-term Profitability Analysis',
                longTermFormula: 'Profit_Simulation = Monte_Carlo(1000_iterations, Portfolio_Composition)',
                longTermExplanation: 'Monte Carlo simulation with 1000 iterations to predict long-term profitability, maximum drawdown, and risk-adjusted returns.',
                
                // Professional Betting Criteria
                professionalCriteriaTitle: '💼 Professional Betting Criteria',
                professionalCriteriaList: '• Minimum Edge: 5% for singles, 8% for parlays\n• Maximum Kelly: 5% of bankroll per bet\n• Portfolio Risk: Maximum 15% total exposure\n• Minimum Odds: 1.50 for value consideration\n• Confidence Threshold: 70% for automated recommendations',
                
                // === GUIDE SECTION ===
                guideTitle: '📚 Professional User Guide',
                guideIntro: 'Complete step-by-step guide to maximize your betting analysis efficiency and profitability.',
                
                guideApiConfigTitle: '🔧 1. API Configuration',
                guideApiConfigText: 'Add your valid OpenAI API key in the 🔧 API Settings tab, then click the Test API Connection button. After successful connection, you can proceed to the next step.',
                guideApiConfigDetails: '• OpenAI API Key: Get your key from https://platform.openai.com/api-keys\n• Required for GPT-4o Vision image analysis\n• Costs approximately $0.01-0.03 per image depending on complexity\n• Keep your API key secure and never share it publicly',
                guideApiKeySources: '🔑 API Key Sources:',
                guideAutoAnalysisTitle: '🤖 Automatic Analysis Feature:',
                guideAutoAnalysisText: 'If you configure the Perplexity API key, the system will automatically perform comprehensive data analysis after image processing. This eliminates the need for manual prompt copying and JSON pasting - the entire analysis process becomes fully automated!',
                
                guideAiModelTitle: '🤖 2. AI Model Selection (Optional)',
                guideAiModelText: 'For advanced automated analysis, select an AI model and provide the corresponding API key. This enables automatic processing of complex betting data.',
                guideAiModelDetails: '• ChatGPT-4o: Get API key from https://platform.openai.com/api-keys\n• Perplexity: Get API key from https://www.perplexity.ai/account/api/keys\n• Google Gemini: Get API key from https://makersuite.google.com/app/apikey\n• DeepSeek: Get API key from https://platform.deepseek.com/api_keys\n• Without AI model: Manual JSON response required',
                
                guideImageUploadTitle: '📸 3. Image Upload',
                guideImageUploadText: 'On the 📸 Image Collection tab, drag in or select screenshots from bookmaker and statistical pages. The system recognizes multiple sports and markets simultaneously.',
                guideImageUploadDetails: '• Supported formats: JPG, PNG, WebP, GIF\n• Multiple sports: Football, Tennis, Basketball, Hockey, Baseball\n• Various markets: 1X2, Over/Under, Handicap, Corners, Cards\n• Tip: Paste images directly from clipboard using Ctrl+V\n• Quality: Clear, readable text and odds for best results',
                
                guideInitialAnalysisTitle: '🚀 4. Initial AI Analysis',
                guideInitialAnalysisText: 'Once images are uploaded, start the 🚀 Initial GPT-4o Analysis process. Image status updates in real-time (Waiting → Analyzing → Complete).',
                guideInitialAnalysisDetails: '• Processing time: 10-30 seconds per image\n• Extracts: Match names, odds, markets, bookmaker info\n• Recognizes: Multiple sports simultaneously\n• Error handling: Automatic retry for failed analyses\n• Progress tracking: Real-time status updates',
                
                guideDataRetrievalTitle: '🔍 5. Data Retrieval & Processing',
                guideDataRetrievalText: 'After initial analysis, a comprehensive prompt appears in the 🔍 Analysis & Data Processing tab. Copy this prompt and run it in your chosen AI model.',
                guideDataRetrievalDetails: '• Prompt includes: All extracted match data, statistical requirements\n• AI models: ChatGPT, Claude, Gemini, or any advanced LLM\n• Expected response: Structured JSON with probabilities and analysis\n• Automatic processing: Available if AI model and API key provided\n• Manual processing: Paste JSON response into the text area',
                
                guideDataProcessingTitle: '🔄 6. Final Data Processing',
                guideDataProcessingText: 'Paste the complete JSON response from your AI model into the text area, then click 🔄 Process All Data. This performs all mathematical calculations.',
                guideDataProcessingDetails: '• JSON validation: Automatic error detection and repair\n• Calculations: Kelly criterion, Expected Value, Risk assessment\n• Portfolio optimization: Automatic stake sizing and combination generation\n• Risk management: Enforces maximum exposure limits\n• Quality control: Filters out low-confidence recommendations',
                
                guideResultsTitle: '💎 7. Review Results',
                guideResultsText: 'Recommendations appear in the 💎 Results tab. The system generates optimal single bets and high-value parlay combinations based on your selected strategy.',
                guideResultsDetails: '• Single bets: Highest EV opportunities with optimal stakes\n• Parlay combinations: 2-4 leg combinations with risk consideration\n• Sorting: Automatically ordered by expected value\n• Details: Complete mathematical breakdown for each recommendation\n• Downloads: Portfolio summary, calculations, and data sources available',
                
                guideMathTitle: '📐 8. Understanding the Mathematics',
                guideMathText: 'The 📐 Mathematics tab explains all formulas used, from basic expected value calculations to advanced sport-specific models. This ensures complete transparency.',
                guideMathDetails: '• Basic formulas: Edge, Kelly, EV, ROI calculations\n• Sport-specific models: Dixon-Coles, Markov chains, Sabermetrics\n• Risk management: Portfolio optimization and drawdown protection\n• Long-term analysis: Monte Carlo simulations for profitability\n• Professional criteria: Industry-standard thresholds and limits',
                
                guideAdvancedTitle: '🎯 9. Advanced Features',
                guideAdvancedText: 'Leverage advanced features for maximum efficiency and profitability.',
                guideAdvancedDetails: '• Automatic data search: Perplexity API integration for real-time data\n• Post-analysis search: Comprehensive data validation after GPT analysis\n• Multi-language support: Hungarian and English interfaces\n• Export functionality: Detailed reports and calculations\n• Long-term tracking: Profitability analysis and risk assessment',
                
                guideTipsTitle: '💡 10. Professional Tips',
                guideTipsText: 'Expert recommendations for optimal betting analysis and bankroll management.',
                guideTipsDetails: '• Start conservative: Use 0.25 Kelly modifier initially\n• Diversify sports: Don\'t focus on single sport or league\n• Track results: Monitor actual vs predicted outcomes\n• Bankroll management: Never risk more than 15% of total capital\n• Continuous learning: Analyze both wins and losses for improvement\n• Market timing: Place bets close to match start for best odds\n• Value hunting: Focus on positive EV rather than win probability',

                // === PROMPTS ===
                promptCopyButton: 'Copy',
                promptTitle: 'Master Analysis Prompt',
                promptDescription: 'Copy this comprehensive prompt and paste it into a large language model (e.g., ChatGPT, Claude, etc.).',
                
                // Single prompt functionality
                singlePromptInfo: 'This comprehensive prompt handles all sports and matches in one request for maximum efficiency.',

                // === STATUS MESSAGES ===
                statusWaiting: 'Waiting',
                statusAnalyzing: 'Analyzing...',
                statusComplete: 'Complete',
                statusError: 'Error',
                statusUnknown: 'Unknown',

                // === LOADING MESSAGES ===
                loadingTitle: 'GPT-4o Vision Analysis',
                loadingMessage: 'Processing images...',
                loadingInitialAnalysis: 'Initial GPT-4o analysis',
                loadingMultiSportAnalysis: 'Multi-sport image analysis starting...',
                loadingAnalyzingImage: 'Analyzing image {index}/{total}: {name}',
                loadingPortfolioBuilder: 'Building portfolio',
                loadingGeneratingRecommendations: 'Generating single and parlay recommendations...',
                loadingTextAnalysis: 'Text Analysis',
                loadingExtractingBettingData: 'Extracting betting data from text...',
                
                // Enhanced Loading Steps
                loadingStep1: '🔍 Analyzing images',
                loadingStep2: '🤖 Processing with AI',
                loadingStep3: '📊 Extracting data',
                loadingStep4: '🧮 Calculating probabilities',
                loadingStep5: '✅ Finalizing results',
                loadingInitializing: 'Initializing...',
                loadingAnalyzing: 'Analyzing images...',
                loadingProcessing: 'Processing with AI...',
                loadingExtracting: 'Extracting data...',
                loadingCalculating: 'Calculating probabilities...',
                loadingFinalizing: 'Finalizing results...',

                // === MODAL MESSAGES ===
                modalTitle: 'Confirmation',
                modalDeleteImages: 'Are you sure you want to delete all images? (Extracted data will be preserved)',
                modalClearAllData: 'Are you sure you want to clear ALL data including matches and odds? This cannot be undone.',
                modalDeleteButton: 'Delete',
                modalCancelButton: 'Cancel',

                // === NOTIFICATIONS ===
                notificationApiConnected: 'API connection successful - GPT-4o Vision available!',
                notificationApiError: 'API connection failed: {error}',
                notificationDataSaveError: 'Error saving data',
                notificationInitialAnalysisComplete: 'Initial analysis complete',
                notificationEmptyDataField: 'Please enter data in the field',
                notificationDataLoaded: 'Data loaded successfully',
                notificationJsonError: 'JSON error: {error}',
                notificationImagesFromClipboard: '{count} images added from clipboard',
                notificationSetupApiFirst: 'Please configure API first',
                notificationImagesDeleted: 'All images deleted (data preserved)',
                notificationAllDataCleared: 'All data cleared completely',
                notificationDataLoadError: 'Error loading data: {error}',
                notificationDataMerged: 'Data merged successfully! Total: {total}, Added: {added}',
                notificationAllPromptsComplete: 'Analysis completed! Generating portfolio...',
                notificationSinglePromptComplete: 'Master prompt analysis completed successfully!',
                notificationCopiedToClipboard: 'Copied to clipboard',
                notificationEmptyTextInput: 'Please enter betting information in the text field',
                notificationTextProcessed: 'Text data processed successfully',
                notificationTextProcessingError: 'Error processing text: {error}',
                notificationNoAiModelSelected: 'Please select an AI model and enter API key for automatic processing',
                notificationNoPromptContent: 'No prompt content found',
                notificationAutoProcessingComplete: 'Automatic processing completed successfully',
                notificationAutoProcessingError: 'Automatic processing error: {error}',
                emergencyJsonRepair: 'Emergency JSON repair activated',
                intelligentDataRepair: 'Intelligent data repair in progress',
                emergencyExtractionSuccess: 'Emergency extraction successful',
                jsonRepairFallback: 'Using fallback data extraction method',

                // === ERROR MESSAGES ===
                errorMessage: 'Error: {error}',
                unknownError: 'Unknown error',
                errorElementNotFound: 'Element not found',
                errorNoTextToCopy: 'No text to copy',
                errorCopyFailed: 'Failed to copy to clipboard',
                errorSaving: 'Error saving data',
                errorLoading: 'Error loading data',
                errorNoJsonFound: 'No JSON found in the text',
                errorInvalidJsonStructure: 'Invalid JSON structure',
                errorNoSportsDetected: 'No sports detected in uploaded images',
                fillFields: 'Please fill in all fields correctly.',
                invalidProbability: 'Probability must be between 0.1% and 99.9%.',
                invalidOdds: 'Odds must be greater than 1.01.',
                invalidCapital: 'Capital must be greater than 0.',
                invalidKellyModifier: 'Kelly modifier must be between 0.01 and 1.0.',
                calculationError: 'Error occurred during calculation.',
                negativeEdge: 'Negative edge - bet not recommended',
                belowMinStake: 'Stake too low - below minimum',

                // === UI LABELS ===
                sizeLabel: 'Size',
                deleteImageLabel: 'Delete image',
                uploadedImagesLabel: 'Uploaded Images',
                recognizedSportsLabel: 'Recognized Sports'
            },
            
            hu: {
                // === FEJLÉC & NAVIGÁCIÓ ===
                title: 'Fejlett Sportfogadási Analizátor',
                subtitle: 'Professzionális Többsportos AI Elemzés',
                navSettings: 'API Beállítás',
                navTips: 'Képgyűjtés',
                navCalculator: 'Elemzés & Adatfeldolgozás',
                navPortfolio: 'Eredmények',
                navMath: 'Matematika',
                navGuide: 'Útmutató',

                // === API KONFIGURÁCIÓ ===
                apiConfigTitle: 'OpenAI API Konfiguráció',
                apiKeyLabel: 'OpenAI API Kulcs (GPT-4o Vision)',
                apiKeyPlaceholder: 'sk-proj-...',
                testApiButton: 'API Kapcsolat Tesztelése',
                apiStatusText: 'API állapot...',
                testingInProgress: 'Tesztelés folyamatban...',
                testingApiConnection: 'API kapcsolat tesztelése...',
                apiConnectionSuccess: 'API kapcsolat sikeres',
                apiConnectionFailed: 'API kapcsolat sikertelen',
                
                // === AI MODELL KIVÁLASZTÁS ===
                aiModelTitle: 'AI Modell Kiválasztás',
                aiModelInfoTitle: 'Fejlett AI Elemzés:',
                aiModelInfoText: 'Válassz AI modellt komplex szövegelemzéshez (időjárási körülmények, játékos sérülések, taktikai elemzés). Ez opcionális és javítja a matematikai számításokat.',
                aiModelLabel: 'AI Modell Komplex Elemzéshez (Opcionális)',
                aiModelNone: 'Nincs (Csak Alap Elemzés)',
                aiModelChatGPT: 'ChatGPT-4o',
                aiModelDeepSeek: 'DeepSeek',
                aiModelPerplexity: 'Perplexity',
                aiModelGemini: 'Google Gemini',
                aiModelHint: 'A fejlett modellek elemezni tudják az időjárást, sérüléseket és taktikai tényezőket pontosabb előrejelzésekért.',
                aiApiKeyLabel: 'AI Modell API Kulcs (Opcionális)',
                aiApiKeyPlaceholder: 'Add meg az API kulcsot automatikus elemzéshez...',
                aiApiKeyHint: 'Csak automatikus elemzéshez szükséges. Hagyd üresen kézi promptokhoz.',
                autoProcessingTitle: 'Automatikus feldolgozás:',
                autoProcessingText: 'Ha megadsz AI modellt és API kulcsot, a program automatikusan feldolgozza a prompt válaszát és betölti az eredményeket. Ha nincs AI modell, manuálisan kell beillesztened a JSON választ.',
                autoProcessButton: 'Auto Feldolgozás',
                autoProcessingPrompt: 'Automatikus Prompt Feldolgozás',
                autoProcessingData: 'Automatikus adatfeldolgozás {model} modellel...',
                postAnalysisSearch: 'Elemzés Utáni Teljes Adatkeresés',
                postAnalysisSearchDescription: 'Minden matematikai képlethez szükséges adat teljes keresése folyamatban...',
                notificationPostAnalysisSearchComplete: 'Elemzés utáni teljes adatkeresés sikeresen befejezve',
                notificationPostAnalysisSearchError: 'Elemzés utáni adatkeresés sikertelen: {error}',
                downloadComplete: 'Letöltés befejezve: {filename}',
                downloadPortfolioSummary: 'Portfólió Összefoglaló',
                downloadCalculationDetails: 'Matematikai Számítások',
                downloadDataSources: 'Adatforrások & Ellenőrzés',
                downloadPerplexityResults: 'Perplexity AI Keresési Eredmények',
                downloadPerplexitySearchTitle: 'PERPLEXITY AI AUTOMATIKUS ADATKERESÉS EREDMÉNYEI:',
                downloadPerplexitySearchIntro: 'A Perplexity AI automatikusan megkereste az interneten az alábbi információkat:',
                downloadPerplexitySearchResult: 'KERESÉSI EREDMÉNY',
                downloadPerplexityQuery: 'Keresési kérdés',
                downloadPerplexityTimestamp: 'Időpont',
                downloadPerplexityInfo: 'TALÁLT INFORMÁCIÓK',
                downloadPerplexitySources: 'FORRÁSOK',
                downloadPerplexityReliability: 'MEGBÍZHATÓSÁG',
                downloadPerplexitySummary: 'PERPLEXITY KERESÉS ÖSSZEFOGLALÁSA',
                downloadPerplexityTotalSearches: 'Összes keresés',
                downloadPerplexityAvgReliability: 'Átlagos megbízhatóság',
                downloadPerplexityLastUpdate: 'Legutóbbi frissítés',
                downloadPerplexityDisclaimer: 'FONTOS: Ezek az adatok automatikusan kerültek összegyűjtésre a Perplexity AI által. Kérjük, ellenőrizze a források megbízhatóságát és az információk pontosságát!',
                longTermProfitability: 'Hosszútávú Nyereségességi Elemzés',
                expectedProfit: 'Várható Nyereség',
                winRate: 'Nyerési Arány',
                longTermROI: 'Hosszútávú ROI',
                maxDrawdown: 'Max Drawdown',
                profitablePortfolio: '✅ HOSSZÚTÁVON NYERESÉGES',
                unprofitablePortfolio: '❌ HOSSZÚTÁVON VESZTESÉGES',
                confidence: 'Megbízhatóság',
                
                // === BANKROLL MENEDZSMENT ===
                bankrollTitle: 'Bankroll Menedzsment',
                capitalLabel: 'Rendelkezésre Álló Tőke (EUR)',
                maxRiskLabel: 'Maximum Portfólió Kockázat (%)',
                maxRiskHint: 'Ajánlott: max 15% konzervatív megközelítéshez',
                kellyModifierSingleLabel: 'Kelly Módosító (Egyes)',
                kellyModifierSingleHint: 'Konzervatív Kelly alkalmazva egyes fogadásokra',
                kellyModifierParlayLabel: 'Kelly Módosító (Kombi)',
                kellyModifierParlayHint: 'Extra konzervatív Kelly alkalmazva kombi fogadásokra',
                comboStrategyLabel: 'Kombi Stratégia',
                comboStrategyHighProb: 'Magas Valószínűségű Kombik',
                comboStrategyHighEV: 'Magas EV Kombik',
                comboStrategyHint: 'Válaszd ki, hogy a valószínűség vagy a várható érték legyen-e az elsődleges szempont a kombik generálásakor.',
                
                // === ADATBEVITEL MÓDOK ===
                dataInputTitle: 'Többsportos Adatgyűjtés',
                imageInputMode: 'Kép Feltöltés',
                textInputMode: 'Szöveg Bevitel',
                textInputInfoTitle: 'Fogadási információk beillesztése:',
                textInputInfoText: '• Másold és illeszd be fogadási weboldalakról, fórumokról vagy tipster üzenetekből\n• Tartalmazza a meccs neveket, szorzókat, piacokat és bármilyen további kontextust\n• Az AI automatikusan kinyeri az összes releváns információt',
                bettingTextLabel: 'Fogadási Információk (Szöveg)',
                bettingTextPlaceholder: 'Illeszd be a fogadási információkat ide...\n\nPélda:\nManchester City vs Arsenal\nHazai Győzelem: 2.10\nDöntetlen: 3.40\nVendég Győzelem: 3.20\nFelett 2.5 Gól: 1.85\nAlatt 2.5 Gól: 1.95\n\nIdőjárás: Enyhe eső várható\nSérülések: Haaland kérdéses',
                processTextButton: 'Szöveg Adatok Feldolgozása',
                
                // === KÉP FELTÖLTÉS ===
                imageUploadTitle: 'Többsportos Képgyűjtemény',
                uploadInfoTitle: 'Tölts fel minden releváns képernyőképet:',
                uploadInfoList: '• Több sport egyszerre (labdarúgás, tenisz, kosárlabda, jégkorong)\n• Különböző piacok (meccs eredmények, gólok, pontok, játékok)\n• Több fogadóiroda képei összehasonlításhoz\n• Statisztikai oldal képek részletes elemzéshez (Ctrl+V-vel is beillesztheted!)',
                imageUploadAreaTitle: 'Sportfogadási Kép Feltöltés',
                imageUploadAreaText: 'Húzd ide a fájlokat, kattints a gombra, vagy illeszd be a vágólapról (Ctrl+V)',
                selectImagesButton: 'Képek Kiválasztása',
                initialAnalysisButton: 'Kezdeti GPT-4o Elemzés',
                deleteImagesButton: 'Csak Képek Törlése',
                clearAllDataButton: 'Minden Adat Törlése',
                
                // === ELEMZÉS & ADATFELDOLGOZÁS ===
                analysisTitle: 'Elemzés & Adatfeldolgozás',
                analysisInfo: 'A képelemzés eredményei és adatlekérési promptok itt jelennek meg.',
                retrievedDataLabel: 'Beillesztett Adatok (JSON válasz LLM-től)',
                retrievedDataPlaceholder: 'Illeszd be ide a teljes, strukturált JSON választ a nagy nyelvi modellektől...',
                processDataButton: 'Minden Adat Feldolgozása és Ajánlások Generálása',
                testJsonRepair: 'JSON Javítás Teszt',
                enableAutoDataSearchLabel: '🔍 Automatikus Adatkeresés (Perplexity API)',
                autoDataSearchHint: 'Ha bekapcsolod, a program automatikusan megkeresi az interneten az összes szükséges adatot minden meccshez. Perplexity API kulcs szükséges.',
                enablePostAnalysisSearchLabel: '🤖 GPT Elemzés Után Auto-Adatkeresés',
                postAnalysisSearchHint: 'Ha bekapcsolod, a GPT képelemzés befejezése után automatikusan elindul a teljes adatkeresés minden bonyolult adattal. Perplexity API kulcs szükséges.',
                
                // === EREDMÉNYEK ===
                resultsTitle: 'Portfólió Eredmények',
                resultsInfo: 'Az ajánlások az összes adat feldolgozása után jelennek meg.',
                singleRecommendations: 'Egyes Fogadási Ajánlások',
                parlayRecommendations: 'Kombi Ajánlások',
                parlayBet: 'Kombi Fogadás',

                // === PORTFÓLIÓ MUTATÓK ===
                totalCapital: 'Teljes Tőke',
                totalStake: 'Teljes Tét',
                remainingCapital: 'Maradó Tőke',
                expectedProfit: 'Várható Nyereség',
                potentialWinnings: 'Potenciális Nyeremény',
                totalReturn: 'Teljes Hozam',
                expectedROI: 'Várható ROI',
                potentialMaxCapital: 'Potenciális Max Tőke',
                potentialMaxCapitalHint: 'Ha minden fogadás nyer: tőke + összes nyeremény',
                
                // === PORTFÓLIÓ ELEMZÉS ===
                capitalUtilization: 'tőke kihasználás',
                ifAllWin: 'Ha minden nyer',
                portfolioAnalysis: 'Portfólió Elemzés',
                totalBets: 'Összes Fogadás',
                singles: 'egyes',
                parlays: 'kombi',
                avgBetSize: 'Átlagos tétméret',
                expectedProfitMargin: 'Várható profitmargin',
                riskCategory: 'Kockázati kategória',
                riskHigh: 'Magas',
                riskMedium: 'Közepes',
                riskLow: 'Alacsony',
                professionalAdvice: 'Szakmai Tanács',
                excellentPortfolio: 'Kiváló portfólió magas várható hozammal.',
                goodPortfolio: 'Jó portfólió megfelelő kockázat-hozam aránnyal.',
                conservativePortfolio: 'Konzervatív portfólió alacsony kockázattal.',
                considerReducingRisk: 'Fontold meg a kockázat csökkentését.',

                // === FOGADÁS RÉSZLETEK ===
                matchInfo: 'Meccs',
                betType: 'Fogadás Típusa',
                selection: 'Kiválasztás',
                vs: 'vs',
                confidence: 'Bizalom',
                tipOdds: 'Szorzó',
                ourProbability: 'Saját Valószínűség',
                impliedProbability: 'Fogadóiroda Implikált',
                valueEdge: 'Érték Előny',
                recommendedStake: 'Ajánlott Tét',
                grossReturn: 'Bruttó Hozam (ha nyer)',
                expectedValue: 'Várható Érték (EV)',
                detailedAnalysis: 'Részletes Elemzés',
                mathematicalFoundation: 'Matematikai Alapok',
                profitIfWin: 'Nyereség Ha Nyer',

                // === ÁTFOGÓ MATEMATIKA RÉSZ ===
                mathTitle: '📐 Matematika a Háttérben',
                mathInfo: 'Alább megtalálod az összes képletet és magyarázatot, amelyeket a program használ a sportfogadási ajánlások kiszámításához. Minden számítás átlátható és matematikailag megalapozott.',
                
                // === ALAP MATEMATIKAI KÉPLETEK ===
                basicFormulasTitle: '🔢 Alap Matematikai Képletek',
                
                // 1. Előny (Edge)
                mathEdgeTitle: '💰 1. Előny (Edge)',
                mathFormulaLabel: '📊 Képlet:',
                mathExplanationLabel: '📝 Magyarázat:',
                mathEdgeFormula: 'Előny = (Saját Valószínűség × Szorzó) - 1',
                mathEdgeExplanation: 'Az előny mutatja, hogy mennyivel "jobb" egy fogadás a valószínűségi becslésed alapján ahhoz képest, amit a fogadóiroda szorzói sugallnak. Pozitív érték hosszú távon potenciálisan nyereséges fogadást jelez. Például, ha 60% valószínűséget becsülsz és a szorzó 2.00, akkor az előnyöd (0.60 × 2.00) - 1 = 0.20 vagy 20%.',
                mathEdgeExample: '🎯 Példa: P = 60%, Szorzó = 2.00 → Előny = (0.60 × 2.00) - 1 = 0.20 = 20%',
                
                // 2. Kelly Kritérium
                mathKellyTitle: '🎯 2. Kelly Kritérium (Optimális Tétarány)',
                mathKellyFormula: 'Kelly = (bp - q) / b',
                mathWhereLabel: '📋 Ahol:',
                mathKellyWhere: 'b = szorzó - 1 (decimális szorzó mínusz 1)\np = saját valószínűség\nq = 1 - p (vesztési valószínűség)',
                mathKellyExplanation: 'A Kelly Kritérium mutatja, hogy a tőkéd hány százalékát kell fogadnod a várható logaritmikus növekedés maximalizálásához. A program konzervatív Kelly módosítót alkalmaz (0.25-0.5) a kockázat csökkentéséhez és a túlfogadás elkerüléséhez.',
                mathKellyExample: '🎯 Példa: P = 60%, Szorzó = 2.00 → Kelly = (1.00 × 0.60 - 0.40) / 1.00 = 0.20 = 20%',
                mathKellyModifier: '⚠️ Konzervatív Módosító: Végső tét = Kelly × Módosító (0.25 egyeseknél, 0.15 kombiknál)',
                
                // 3. Implikált Valószínűség
                mathImpliedTitle: '🎲 3. Implikált Valószínűség',
                mathImpliedFormula: 'Implikált Valószínűség = 1 / Decimális Szorzó',
                mathImpliedExplanation: 'Ez mutatja, hogy milyen valószínűséget sugallnak a fogadóiroda szorzói. Ha a becsült valószínűséged magasabb ennél, a fogadásnak pozitív várható értéke van.',
                mathImpliedExample: '🎯 Példa: Szorzó = 2.50 → Implikált Valószínűség = 1 / 2.50 = 0.40 = 40%',
                
                // 4. Várható Érték (EV)
                mathEVTitle: '💎 4. Várható Érték (EV)',
                mathEVFormula: 'EV = (Valószínűség × Nyereség) - (1 - Valószínűség) × Tét',
                mathEVExplanation: 'A várható érték mutatja, hogy mennyi nyereséget várhatsz egy fogadástól hosszú távon. Pozitív EV idővel nyereséges fogadást jelez.',
                mathEVExample: '🎯 Példa: P = 60%, Tét = 100€, Szorzó = 2.00 → EV = (0.60 × 100€) - (0.40 × 100€) = 20€',
                
                // 5. ROI (Befektetés Megtérülése)
                mathROITitle: '📈 5. ROI (Befektetés Megtérülése)',
                mathROIFormula: 'ROI = (Várható Érték / Tét) × 100%',
                mathROIExplanation: 'A ROI a várható hozamot mutatja a tét százalékában. Magasabb ROI jobb értéket jelent.',
                mathROIExample: '🎯 Példa: EV = 20€, Tét = 100€ → ROI = (20€ / 100€) × 100% = 20%',
                
                // 6. Kombi Számítások
                mathParlayTitle: '🎰 6. Kombi (Kombinált) Fogadások',
                mathParlayProbLabel: '🎲 Kombi valószínűség:',
                mathParlayProbFormula: 'P_kombi = P₁ × P₂ × P₃ × ... × Pₙ',
                mathParlayOddsLabel: '💰 Kombi szorzók:',
                mathParlayOddsFormula: 'Szorzó_kombi = Szorzó₁ × Szorzó₂ × Szorzó₃ × ... × Szorzóₙ',
                mathParlayExplanation: 'Kombinált fogadásoknál a teljes valószínűség és szorzó a résztvevő események szorzata. A Kelly és edge számítások ugyanúgy működnek, mint egyes fogadásoknál, de a kockázat jelentősen magasabb a multiplikatív természet miatt.',
                mathParlayExample: '🎯 Példa: 3 láb kombi 60%, 70%, 80% → P_kombi = 0.60 × 0.70 × 0.80 = 33.6%',
                
                // 7. Kockázatkezelés
                mathRiskTitle: '⚠️ 7. Kockázatkezelési Mutatók',
                mathRiskPortfolioLabel: '📊 Portfólió kockázat:',
                mathRiskPortfolioFormula: 'Portfólió Kockázat = Σ(Egyedi Fogadási Tétek) / Teljes Tőke',
                mathMinStakeLabel: '💰 Minimum tét:',
                mathMinStakeFormula: 'Min Tét = max(5€, 0.1% × Tőke)',
                mathMaxRiskLabel: '🛡️ Maximum kockázat fogadásonként:',
                mathMaxRiskFormula: 'Max Kockázat = min(Kelly × Módosító, 5% × Tőke)',
                mathRiskExplanation: 'A kockázatkezelés biztosítja, hogy egyetlen fogadás sem károsíthatja súlyosan a bankrollodat. A rendszer enforces minimum stakes for meaningful bets and maximum stakes to prevent over-exposure.',
                
                // === FEJLETT MATEMATIKAI MODELLEK ===
                advancedModelsTitle: '🧮 Fejlett Matematikai Modellek',
                advancedModelsInfo: 'A rendszer kifinomult statisztikai modelleket alkalmaz minden sportnál az előrejelzési pontosság javítására az egyszerű valószínűségi becsléseken túl.',
                
                // === SPORT-SPECIFIKUS MODELLEK ===
                sportModelsTitle: '⚽ Sport-Specifikus Matematikai Modellek',
                sportModelsInfo: 'A következő rész részletezi a rendszer által különböző sportokra alkalmazott statisztikai/valószínűségi modelleket a valószínűségi becslések finomítására. Ezek a modellek pontosabb képet adnak, mint az egyszerű statisztikák.',
                
                // Labdarúgás ⚽
                footballTitle: '⚽ Labdarúgás',
                footballDixonColes: '🎯 Dixon-Coles Poisson Modell Gól Előrejelzéshez',
                footballDixonColesFormula: 'P(X=x, Y=y) = τ(x,y) × e^(-λ) × λˣ/x! × e^(-μ) × μʸ/y!',
                footballDixonColesExplanation: 'Fejlett Poisson modell, amely figyelembe veszi a labdarúgás alacsony gólszámú természetét. Tartalmaz korrelációs paramétert τ(x,y) az eredmény kombinációkhoz mint 0-0, 1-0, 0-1, 1-1 a valós meccs dinamika jobb tükrözéséhez.',
                footballSkellam: '📊 Skellam Eloszlás Gólkülönbséghez',
                footballSkellamFormula: 'P(X-Y = k) = e^(-(λ+μ)) × (λ/μ)^(k/2) × I_k(2√(λμ))',
                footballSkellamExplanation: 'Modellezi a csapatok közötti gólkülönbséget. Elengedhetetlen az ázsiai handicap és spread fogadási piacokhoz.',
                footballCornersModel: '🚩 Szögletek és Lapok Matematikai Modell',
                footballCornersFormula: 'E[Szögletek] = α × (Támadó_Erő × Védő_Gyengeség) + β × Játék_Állapot',
                footballCornersExplanation: 'Prediktálja a szögleteket és lapokat a csapatok játékstílusa, bírói tendenciák és meccs kontextus alapján.',
                football1x2Model: '🏆 1X2 Piaci Valószínűségi Modell',
                football1x2Formula: 'P(Hazai) = λ^h × e^(-λ) / (λ^h × e^(-λ) + Döntetlen_Faktor + μ^v × e^(-μ))',
                football1x2Explanation: 'Konvertálja a gólvárakozást meccs eredmény valószínűségekké Poisson eloszlás használatával döntetlen bias korrekcióval.',
                
                // Tenisz 🎾
                tennisTitle: '🎾 Tenisz',
                tennisMarkov: '🔄 Markov Lánc Modell Szolgálat Játékokhoz',
                tennisMarkovFormula: 'P(Játék) = p^4 × Σ(kombinatorikus_tényezők)',
                tennisMarkovExplanation: 'A modell a teniszmeccset állapotok sorozataként kezeli (pontok, játékok, szettek). Az időjárási körülmények jelentősen befolyásolják a szerva pontosságát és a labda röppályáját. A pálya típus (salak, fű, kemény) drámaian befolyásolja a pattanást és a játékos teljesítményt.',
                tennisEloModel: '📈 Fejlett Elo-alapú Pont Előrejelzés',
                tennisEloFormula: 'P(A legyőzi B-t) = 1 / (1 + 10^((Rating_B - Rating_A)/400))',
                tennisEloExplanation: 'Dinamikus értékelési rendszer, amely alkalmazkodik a pálya specializációhoz, jelenlegi formához és egymás elleni rekordokhoz.',
                tennisSurfaceModel: '🏟️ Pálya-specifikus Teljesítmény Modell',
                tennisSurfaceFormula: 'Pálya_Kiigazítás = Alap_Értékelés × Pálya_Szorzó × Időjárás_Faktor',
                tennisSurfaceExplanation: 'Figyelembe veszi a játékosok specializációját különböző pályákon. A salak az alapvonaljátékosokat kedvezi, a fű a szerva-volé stílust, a kemény pályák semlegesek.',
                
                // Kosárlabda 🏀
                basketballTitle: '🏀 Kosárlabda',
                basketballFourFactors: '🎯 Négy Faktor Modell',
                basketballFourFactorsFormula: 'Nyerés% = 0.4×eFG% + 0.25×TOV% + 0.2×ORB% + 0.15×FT/FGA',
                basketballFourFactorsExplanation: 'Dean Oliver Négy Faktora: Effektív Mezőny Gól %, Labdavesztés Arány, Támadó Lepattanó %, Büntető Dobás Arány. Ez a négy statisztika a csapat sikerének ~95%-át magyarázza.',
                basketballAdvancedPossession: '⚡ Fejlett Birtoklás-alapú Modell',
                basketballPossessionFormula: 'Birtoklások = FGA + 0.44×FTA - ORB + TOV',
                basketballPossessionExplanation: 'Kiszámítja a valós birtoklásokat a tempó normalizálásához. Elengedhetetlen a pontos per-birtoklás statisztikákhoz.',
                basketballFatigueModel: '😴 Fáradtság és Menetrend Hatás Modell',
                basketballFatigueFormula: 'Fáradtság_Faktor = Pihenő_Napok^(-0.3) × Utazási_Távolság^(-0.1)',
                basketballFatigueExplanation: 'Modellezi a pihenőnapok, utazási távolság és egymás utáni meccsek hatását a csapat teljesítményére.',
                
                // Jégkorong 🏒
                hockeyTitle: '🏒 Jégkorong',
                hockeyAdvancedCorsi: '📊 Fejlett Corsi/Fenwick Modell',
                hockeyCorsiFormula: 'Corsi% = Lövés_Kísérletek_Mellette / (Lövés_Kísérletek_Mellette + Lövés_Kísérletek_Ellene)',
                hockeyCorsiExplanation: 'Méri a korong birtoklást és területi kontrollt. Jobb előrejelzője a jövőbeli sikernek, mint a gólok/gólpasszok.',
                hockeyGoaltenderPerformance: '🥅 Kapus Teljesítmény Modell',
                hockeyGoalieFormula: 'Védés% = (Lövések_Ellene - Gólok_Ellene) / Lövések_Ellene',
                hockeyGoalieExplanation: 'A kapus teljesítménye 50-70% hatással van a meccs kimenetelére. A modell figyelembe veszi a lövés minőségét, védő támogatást és jelenlegi formát.',
                hockeySpecialTeams: '⚡ Special Teams Advanced Model',
                hockeySpecialTeamsFormula: 'PP_Goal_Probability = PP% × (Ellenfél_PK% × Erő_Különbség)',
                hockeySpecialTeamsExplanation: 'Power play and penalty kill efficiency often determines close games. Model includes man-advantage situations.',
                
                // Baseball ⚾
                baseballTitle: '⚾ Baseball',
                baseballSabermetric: '📊 Sabermetric Fejlett Modell',
                baseballSabermetricFormula: 'wOBA = (0.69×BB + 0.72×HBP + 0.89×1B + 1.27×2B + 1.62×3B + 2.10×HR) / PA',
                baseballSabermetricExplanation: 'Súlyozott Bázis Átlag (wOBA) átfogó támadó értékelést nyújt. Figyelembe veszi az összes támadó hozzájárulást megfelelő súlyozással.',
                baseballPythagoreanEnhanced: '🏆 Fejlett Pitagorasz Várható Érték',
                baseballPythagoreanFormula: 'Nyerés% = Futás_Szerzett^x / (Futás_Szerzett^x + Futás_Kapott^x)',
                baseballPythagoreanExplanation: 'Prediktálja a nyerési százalékot a szerzett vs kapott futások alapján. Az x exponens ligánként változik (jellemzően 1.83 az MLB-ben).',
                baseballStartingPitcher: '🎯 Kezdő Dobó Hatás Modell',
                baseballPitcherFormula: 'ERA+ = (Liga_ERA / Player_ERA) × 100',
                baseballPitcherExplanation: 'A kezdő dobó 60-80% hatással van a meccs kimenetelére. A modell tartalmazza az ERA+, WHIP, K/9, BB/9 és jelenlegi formát.',
                baseballWeatherImpact: '🌤️ Időjárás Hatás Átfogó Modell',
                baseballWeatherFormula: 'Időjárás_Faktor = 1 + α×|T-21°C| + β×Szélsebesség + γ×Páratartalom + δ×Tengerszint',
                baseballWeatherExplanation: 'A szél iránya/sebessége, hőmérséklet, páratartalom és tengerszint feletti magasság jelentősen befolyásolja a labda röppályáját és a pontszerzést. Optimális feltételek: 21°C, 40% páratartalom, <15km/h szél.',
                
                // Fejlett Időjárási és Játékos Hatás Modellek
                weatherImpactTitle: '🌤️ Fejlett Időjárási Hatás Modell',
                weatherImpactFormula: 'W_faktor = 1 + α×|T-T_opt| + β×Szélsebesség + γ×Csapadék + δ×Páratartalom + ε×Játékstílus',
                weatherImpactExplanation: 'Átfogó időjárási modell figyelembe véve a hőmérséklet eltérését az optimálistól, szél hatásokat, csapadék hatást a labdakontrollra, páratartalom hatásokat és csapat játékstílus alkalmazkodást.',
                weatherOptimalTemps: '🌡️ Optimális Hőmérsékletek: Labdarúgás 19°C, Baseball 21°C, Tenisz 22°C',
                weatherPrecipitationImpact: '🌧️ Csapadék súlyosan befolyásolja a precíziós csapatokat (rövid passzok, technikai játék) γ=0.3 büntetés faktorral',
                
                keyPlayerImpactTitle: '👤 Kritikus Kulcsjátékos Hatás Modell',
                keyPlayerImpactFormula: 'J_faktor = ∏(1 - I_i × K_i × P_i)',
                keyPlayerImpactExplanation: 'Fejlett modell figyelembe véve a játékos fontosságát (I), kulcsjátékos szorzót (K), és pozíció kritikusságot (P). Kulcsjátékosok most 2.5× hatással vs korábban 1.5×.',
                keyPlayerPositionWeights: '🎯 Pozíció Súlyok: Kapus/Dobó: 3.0, Playmaker: 2.8, Csillagjátékos: 2.5, Alapember: 1.5',
                keyPlayerCriticalPositions: '⚠️ Kritikus pozíciók (kapusok, dobók, playmaker-ek) egyedül is meghatározhatják a meccs kimenetelét',
                
                // === INTEGRÁLT MATEMATIKAI MOTOR ===
                integratedEngineTitle: '🔧 Integrált Matematikai Motor',
                integratedEngineInfo: 'A rendszer minden matematikai modellt egyesít egy egységes pontozási rendszerbe az optimális döntéshozatalhoz.',
                
                // Multi-Faktor Pontozás
                multiFactorTitle: '⚖️ Multi-Faktor Pontozási Rendszer',
                multiFactorFormula: 'Végső_Pontszám = 0.40×EV + 0.25×Kelly + 0.20×Bizalom + 0.10×Sport_Specifikus + 0.05×Kockázat_Kiigazított',
                multiFactorExplanation: 'Átfogó pontozás, amely egyensúlyba hozza a várható értéket, optimális tétezést, bizalmi szinteket, sport-specifikus tényezőket és kockázatkezelést.',
                
                // Hosszútávú Nyereségességi
                longTermTitle: '📈 Hosszútávú Nyereségességi Elemzés',
                longTermFormula: 'Nyereség_Szimuláció = Monte_Carlo(1000_iteráció, Portfólió_Összetétel)',
                longTermExplanation: 'Monte Carlo szimuláció 1000 iterációval a hosszútávú nyereségességi, maximális drawdown és kockázat-korrigált hozamok előrejelzésére.',
                
                // Professzionális Fogadási Kritériumok
                professionalCriteriaTitle: '💼 Professzionális Fogadási Kritériumok',
                professionalCriteriaList: '• Minimum Előny: 5% egyeseknél, 8% kombiknál\n• Maximum Kelly: 5% bankrollból fogadásonként\n• Portfólió Kockázat: Maximum 15% teljes kitettség\n• Minimum Szorzók: 1.50 érték megfontoláshoz\n• Bizalmi Küszöb: 70% automatikus ajánlásokhoz',
                
                // === ÚTMUTATÓ RÉSZ ===
                guideTitle: '📚 Professzionális Felhasználói Útmutató',
                guideIntro: 'Teljes lépésről lépésre útmutató a fogadási elemzési hatékonyság és nyereségességi maximalizálásához.',
                
                guideApiConfigTitle: '🔧 1. API Konfiguráció',
                guideApiConfigText: 'Add meg az érvényes OpenAI API kulcsot a 🔧 API Beállítás fülön, majd kattints az API Kapcsolat Tesztelése gombra. A sikeres kapcsolat után folytathatod a következő lépéssel.',
                guideApiConfigDetails: '• OpenAI API Kulcs: Szerezd be a kulcsot a https://platform.openai.com/api-keys oldalról\n• Szükséges a GPT-4o Vision képelemzéshez\n• Költség körülbelül 0.01-0.03€ képenként a komplexitástól függően\n• Tartsd biztonságban az API kulcsot és soha ne oszd meg nyilvánosan',
                guideApiKeySources: '🔑 API Kulcs Források:',
                guideAutoAnalysisTitle: '🤖 Automatikus Elemzés Funkció:',
                guideAutoAnalysisText: 'Ha beállítod a Perplexity API kulcsot, a rendszer automatikusan elvégzi a teljes adatelemzést a képfeldolgozás után. Ez megszünteti a manuális prompt másolás és JSON beillesztés szükségességét - az egész elemzési folyamat teljesen automatizálttá válik!',
                
                guideAiModelTitle: '🤖 2. AI Modell Kiválasztás (Opcionális)',
                guideAiModelText: 'Fejlett automatikus elemzéshez válassz AI modellt és add meg a megfelelő API kulcsot. Ez lehetővé teszi a komplex fogadási adatok automatikus feldolgozását.',
                guideAiModelDetails: '• ChatGPT-4o: API kulcs a https://platform.openai.com/api-keys oldalról\n• Perplexity: API kulcs a https://www.perplexity.ai/account/api/keys oldalról\n• Google Gemini: API kulcs a https://makersuite.google.com/app/apikey oldalról\n• DeepSeek: API kulcs a https://platform.deepseek.com/api_keys oldalról\n• AI modell nélkül: Manuális JSON válasz szükséges',
                
                guideImageUploadTitle: '📸 3. Kép Feltöltés',
                guideImageUploadText: 'A 📸 Képgyűjtés fülön húzd be vagy válaszd ki a képernyőképeket fogadóirodák és statisztikai oldalakról. A rendszer egyszerre több sportot és piacot is felismer.',
                guideImageUploadDetails: '• Támogatott formátumok: JPG, PNG, WebP, GIF\n• Több sport: Labdarúgás, Tenisz, Kosárlabda, Jégkorong, Baseball\n• Különböző piacok: 1X2, Felett/Alatt, Handicap, Szögletek, Lapok\n• Tipp: Közvetlenül a vágólapról illeszd be a képeket Ctrl+V-vel\n• Minőség: Tiszta, olvasható szöveg és szorzók a legjobb eredményekhez',
                
                guideInitialAnalysisTitle: '🚀 4. Kezdeti AI Elemzés',
                guideInitialAnalysisText: 'Amint legalább egy kép elérhető, indítsd el a 🚀 Kezdeti GPT-4o Elemzés folyamatot. A kép állapota valós időben frissül (Várakozik → Elemez → Kész).',
                guideInitialAnalysisDetails: '• Feldolgozási idő: 10-30 másodperc képenként\n• Kinyeri: Meccs neveket, szorzókat, piacokat, fogadóiroda infót\n• Felismeri: Több sportot egyszerre\n• Hibakezelés: Automatikus újrapróbálkozás sikertelen elemzéseknél\n• Haladás követése: Valós idejű állapot frissítések',
                
                guideDataRetrievalTitle: '🔍 5. Adatlekérés és Feldolgozás',
                guideDataRetrievalText: 'A kezdeti elemzés után egy átfogó prompt jelenik meg az 🔍 Elemzés & Adatfeldolgozás fülön. Másold ki ezt a promptot és futtasd a választott AI modellben.',
                guideDataRetrievalDetails: '• Prompt tartalmaz: Minden kinyert meccs adatot, statisztikai követelményeket\n• AI modellek: ChatGPT, Claude, Gemini, vagy bármilyen fejlett LLM\n• Várható válasz: Strukturált JSON valószínűségekkel és elemzéssel\n• Automatikus feldolgozás: Elérhető, ha AI modell és API kulcs megadva\n• Manuális feldolgozás: Paste JSON válasz beillesztése a szövegmezőbe',
                
                guideDataProcessingTitle: '🔄 6. Végső Adatfeldolgozás',
                guideDataProcessingText: 'Illeszd be a teljes JSON választ az AI modelltől a szövegmezőbe, majd kattints a 🔄 Minden Adat Feldolgozása gombra. Ez elvégzi az összes matematikai számítást.',
                guideDataProcessingDetails: '• JSON validáció: Automatic error detection and repair\n• Calculations: Kelly criterion, Expected Value, Risk assessment\n• Portfolio optimization: Automatic stake sizing and combination generation\n• Risk management: Enforces maximum exposure limits\n• Quality control: Filters out low-confidence recommendations',
                
                guideResultsTitle: '💎 7. Eredmények Áttekintése',
                guideResultsText: 'Az ajánlások a 💎 Eredmények fülön jelennek meg. A rendszer optimális egyes fogadásokat és magas értékű kombi kombinációkat generál a kiválasztott stratégia alapján.',
                guideResultsDetails: '• Egyes fogadások: Legmagasabb EV lehetőségek optimális tétekkel\n• Kombi kombinációk: 2-4 lábas kombinációk kockázat megfontolással\n• Rendezés: Automatically ordered by expected value\n• Részletek: Complete mathematical breakdown for each recommendation\n• Letöltések: Portfolio summary, calculations, and data sources available',
                
                guideMathTitle: '📐 8. A Matematika Megértése',
                guideMathText: 'A 📐 Matematika fül magyarázza az összes használt képletet, az alap várható érték számításoktól a fejlett sport-specifikus modellekig. Ez teljes átláthatóságot biztosít.',
                guideMathDetails: '• Alapképletek: Előny, Kelly, EV, ROI számítások\n• Sport-specifikus modellek: Dixon-Coles, Markov láncok, Sabermetrics\n• Kockázatkezelés: Portfólió optimalizálás és drawdown védelem\n• Hosszútávú elemzés: Monte Carlo szimulációk nyereségességhez\n• Professzionális kritériumok: Iparági szabványos küszöbök és limitek',
                
                guideAdvancedTitle: '🎯 9. Fejlett Funkciók',
                guideAdvancedText: 'Használd ki a fejlett funkciókat a maximális hatékonyság és nyereségességi érdekében.',
                guideAdvancedDetails: '• Automatic data search: Perplexity API integration for real-time data\n• Post-analysis search: Comprehensive data validation after GPT analysis\n• Multi-language support: Hungarian and English interfaces\n• Export functionality: Detailed reports and calculations\n• Long-term tracking: Profitability analysis and risk assessment',
                
                guideTipsTitle: '💡 10. Professzionális Tippek',
                guideTipsText: 'Szakértői ajánlások az optimális fogadási elemzéshez és bankroll menedzsmenthez.',
                guideTipsDetails: '• Kezdj konzervatívan: Használj 0.25 Kelly módosítót kezdetben\n• Diverzifikálj sportokban: Ne koncentrálj egyetlen sportra vagy ligára\n• Követd az eredményeket: Monitorozd a tényleges vs előrejelzett kimeneteleket\n• Bankroll menedzsment: Soha ne kockáztass 15%-nál többet a teljes tőkéből\n• Folyamatos tanulás: Elemezd a nyerő és vesztes fogadásokat egyaránt\n• Piaci időzítés: Tedd le a fogadásokat közel a meccs kezdetéhez a legjobb szorzókért\n• Érték vadászat: Koncentrálj a pozitív EV-re, ne a nyerési valószínűségre',

                // === PROMPTOK ===
                promptCopyButton: 'Másolás',
                promptTitle: 'Mester Elemzési Prompt',
                promptDescription: 'Másold ki ezt az átfogó promptot és illeszd be egy nagy nyelvi modellbe (pl. ChatGPT, Claude, stb.).',
                
                // Egyetlen prompt funkció
                singlePromptInfo: 'Ez az átfogó prompt minden sportot és meccset egy kérésben kezel a maximális hatékonyság érdekében.',

                // === ÁLLAPOT ÜZENETEK ===
                statusWaiting: 'Várakozik',
                statusAnalyzing: 'Elemez...',
                statusComplete: 'Kész',
                statusError: 'Hiba',
                statusUnknown: 'Ismeretlen',

                // === BETÖLTÉSI ÜZENETEK ===
                loadingTitle: 'GPT-4o Vision Elemzés',
                loadingMessage: 'Képek feldolgozása...',
                loadingInitialAnalysis: 'Kezdeti GPT-4o elemzés',
                loadingMultiSportAnalysis: 'Többsportos képelemzés indítása...',
                loadingAnalyzingImage: 'Kép elemzése {index}/{total}: {name}',
                loadingPortfolioBuilder: 'Portfólió építése',
                loadingGeneratingRecommendations: 'Egyes és kombi ajánlások generálása...',
                loadingTextAnalysis: 'Szöveg Elemzés',
                loadingExtractingBettingData: 'Fogadási adatok kinyerése szövegből...',
                
                // Fejlett Betöltési Lépések
                loadingStep1: '🔍 Képek elemzése',
                loadingStep2: '🤖 AI feldolgozás',
                loadingStep3: '📊 Adatok kinyerése',
                loadingStep4: '🧮 Valószínűségek számítása',
                loadingStep5: '✅ Eredmények véglegesítése',
                loadingInitializing: 'Inicializálás...',
                loadingAnalyzing: 'Képek elemzése...',
                loadingProcessing: 'AI feldolgozás...',
                loadingExtracting: 'Adatok kinyerése...',
                loadingCalculating: 'Valószínűségek számítása...',
                loadingFinalizing: 'Eredmények véglegesítése...',

                // === MODAL ÜZENETEK ===
                modalTitle: 'Megerősítés',
                modalDeleteImages: 'Biztosan törölni szeretnéd az összes képet? (A kinyert adatok megmaradnak)',
                modalClearAllData: 'Biztosan törölni szeretnéd az ÖSSZES adatot, beleértve a meccseket és szorzókat? Ez nem vonható vissza.',
                modalDeleteButton: 'Törlés',
                modalCancelButton: 'Mégse',

                // === ÉRTESÍTÉSEK ===
                notificationApiConnected: 'API kapcsolat sikeres - GPT-4o Vision elérhető!',
                notificationApiError: 'API kapcsolat sikertelen: {error}',
                notificationDataSaveError: 'Hiba az adatok mentésekor',
                notificationInitialAnalysisComplete: 'Kezdeti elemzés befejezve',
                notificationEmptyDataField: 'Kérjük, adj meg adatokat a mezőben',
                notificationDataLoaded: 'Adatok sikeresen betöltve',
                notificationJsonError: 'JSON hiba: {error}',
                notificationImagesFromClipboard: '{count} kép hozzáadva a vágólapról',
                notificationSetupApiFirst: 'Kérjük, először konfiguráld az API-t',
                notificationImagesDeleted: 'Összes kép törölve (adatok megőrizve)',
                notificationAllDataCleared: 'Minden adat teljesen törölve',
                notificationDataLoadError: 'Hiba az adatok betöltésekor: {error}',
                notificationDataMerged: 'Adatok sikeresen egyesítve! Összesen: {total}, Hozzáadva: {added}',
                notificationAllPromptsComplete: 'Elemzés befejezve! Portfólió generálása...',
                notificationSinglePromptComplete: 'Mester prompt elemzés sikeresen befejezve!',
                notificationCopiedToClipboard: 'Vágólapra másolva',
                notificationEmptyTextInput: 'Kérjük, adj meg fogadási információkat a szövegmezőben',
                notificationTextProcessed: 'Szöveg adatok sikeresen feldolgozva',
                notificationTextProcessingError: 'Hiba a szöveg feldolgozásakor: {error}',
                notificationNoAiModelSelected: 'Kérlek válassz AI modellt és add meg az API kulcsot az automatikus feldolgozáshoz',
                notificationNoPromptContent: 'Nincs prompt tartalom',
                notificationAutoProcessingComplete: 'Automatikus feldolgozás sikeresen befejezve',
                notificationAutoProcessingError: 'Automatikus feldolgozási hiba: {error}',
                emergencyJsonRepair: 'Vészhelyzeti JSON javítás aktiválva',
                intelligentDataRepair: 'Intelligens adatjavítás folyamatban',
                emergencyExtractionSuccess: 'Vészhelyzeti adatkinyerés sikeres',
                jsonRepairFallback: 'Tartalék adatkinyerési módszer használata',

                // === HIBAÜZENETEK ===
                errorMessage: 'Hiba: {error}',
                unknownError: 'Ismeretlen hiba',
                errorElementNotFound: 'Elem nem található',
                errorNoTextToCopy: 'Nincs másolandó szöveg',
                errorCopyFailed: 'Vágólapra másolás sikertelen',
                errorSaving: 'Hiba az adatok mentésekor',
                errorLoading: 'Hiba az adatok betöltésekor',
                errorNoJsonFound: 'Nem található JSON a szövegben',
                errorInvalidJsonStructure: 'Érvénytelen JSON struktúra',
                errorNoSportsDetected: 'Nem észlelhetők sportok a feltöltött képekben',
                fillFields: 'Kérjük, töltsd ki helyesen az összes mezőt.',
                invalidProbability: 'A valószínűségnek 0.1% és 99.9% között kell lennie.',
                invalidOdds: 'A szorzónak 1.01-nél nagyobbnak kell lennie.',
                invalidCapital: 'A tőkének 0-nál nagyobbnak kell lennie.',
                invalidKellyModifier: 'A Kelly módosítónak 0.01 és 1.0 között kell lennie.',
                calculationError: 'Hiba történt a számítás során.',
                negativeEdge: 'Negatív előny - fogadás nem ajánlott',
                belowMinStake: 'Tét túl alacsony - minimum alatt',

                // === UI CÍMKÉK ===
                sizeLabel: 'Méret',
                deleteImageLabel: 'Kép törlése',
                uploadedImagesLabel: 'Feltöltött Képek',
                recognizedSportsLabel: 'Felismert Sportok'
            }
        };
        
        // Initialize after construction
        this.init();
    }
    
    init() {
        // Automatikus inicializálás
        if (typeof window !== 'undefined') {
        this.applyLanguage(this.currentLanguage);
        this.setupLanguageSelector();
        }
    }
    
    getStoredLanguage() {
        try {
            return localStorage.getItem('preferred_language');
        } catch (e) {
            console.warn('LocalStorage nem elérhető:', e);
            return null;
        }
    }
    
    storeLanguage(language) {
        try {
            localStorage.setItem('preferred_language', language);
        } catch (e) {
            console.warn('Nem sikerült menteni a nyelvet:', e);
        }
    }

    getText(key) {
        const lang = this.languages[this.currentLanguage];
        if (lang && lang[key]) {
            return lang[key];
        }
        
        // Fallback angol nyelvre
        const fallback = this.languages['en'];
        if (fallback && fallback[key]) {
            console.warn(`Hiányzó fordítás: ${key} a(z) ${this.currentLanguage} nyelvhez`);
            return fallback[key];
        }
        
        console.error(`Hiányzó kulcs: ${key}`);
        return `[${key}]`;
    }

    applyLanguage(languageCode) {
        if (!this.isLanguageSupported(languageCode)) {
            console.warn(`Nem támogatott nyelv: ${languageCode}. Visszaváltás angolra.`);
            languageCode = 'en';
        }
        
        this.currentLanguage = languageCode;
        this.storeLanguage(languageCode);
        
        if (typeof window !== 'undefined') {
        this.updateAllTexts();
        }
    }

    updateAllTexts() {
        // Statikus szövegek frissítése
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            element.textContent = this.getText(key);
        });
        
        // Placeholder szövegek frissítése
        document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
            const key = element.getAttribute('data-lang-placeholder');
            element.setAttribute('placeholder', this.getText(key));
        });
        
        this.updateNavigation();
        this.updateSectionTitles();
        this.updateFormElements();
    }
    
    updateNavigation() {
        // Navigációs elemek frissítése
        const navElements = {
            '[data-tab="setup"]': 'navSettings',
            '[data-tab="upload"]': 'navTips',
            '[data-tab="analysis"]': 'navCalculator',
            '[data-tab="results"]': 'navPortfolio',
            '[data-tab="math"]': 'navMath',
            '[data-tab="guide"]': 'navGuide'
        };
        
        Object.entries(navElements).forEach(([selector, key]) => {
            const element = document.querySelector(selector);
            if (element && !element.hasAttribute('data-lang')) {
                element.textContent = this.getText(key);
            }
        });
    }
    
    updateSectionTitles() {
        // Szekció címek dinamikus frissítése
        const titles = document.querySelectorAll('h1, h2, h3');
        titles.forEach(title => {
            const key = title.getAttribute('data-lang');
            if (key) {
                title.textContent = this.getText(key);
            }
        });
    }
    
    updateFormElements() {
        // Form elemek címkéinek frissítése
        const labels = document.querySelectorAll('label[data-lang]');
        labels.forEach(label => {
            const key = label.getAttribute('data-lang');
            label.textContent = this.getText(key);
        });
    }

    setupLanguageSelector() {
        const languageButtons = document.querySelectorAll('.lang-btn');
        languageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const newLang = e.target.dataset.lang;
                if (newLang && this.isLanguageSupported(newLang)) {
                    this.applyLanguage(newLang);
                    this.updateLanguageButtons();
                }
            });
        });
        
        this.updateLanguageButtons();
    }

    updateLanguageButtons() {
        const languageButtons = document.querySelectorAll('.lang-btn');
        languageButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
        });
    }

    addLanguage(languageCode, translations) {
        if (typeof translations === 'object' && translations !== null) {
        this.languages[languageCode] = translations;
            console.info(`Nyelv hozzáadva: ${languageCode}`);
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    getAvailableLanguages() {
        return Object.keys(this.languages);
    }
    
    isLanguageSupported(languageCode) {
        return this.languages.hasOwnProperty(languageCode);
    }
}

// Globális példány létrehozása
if (typeof window !== 'undefined') {
window.languagePack = new LanguagePack();
} else {
    module.exports = LanguagePack;
} 