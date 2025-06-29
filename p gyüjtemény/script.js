document.addEventListener('DOMContentLoaded', () => {

    // --- CONSTANTS & CONFIG ---
    const defaultSportsData = {
        football: { name: "Foci", icon: '⚽', category: 'traditional', title: "Professzionális Foci Elemzési Prompt", prompt: "Keresd meg a mai focimérkőzéseket minden ligából (Premier League, La Liga, Serie A, Bundesliga, Ligue 1, MLS, Copa Libertadores, Championship, magyar NB1, stb.), és nézd át a sportfogadó irodákat is az oddsok alapján. Nézd meg más tippadók véleményét is — csak olyan tippeket adj, amelyek ma lesznek, és az odds meghaladja az 1.90-et. A válaszodat gondold át alaposan, és indokold meg részletesen. Adj single és kombi tippeket is. Gondolkodj úgy, mint egy sportfogadó szakember, aki 20 éve ebből él, és focira specializálódott. Vizsgáld meg a csapatok formájától kezdve az időjáráson át a hiányzó játékosokig minden tényezőt. Elemezd a csapatok xG/xGA (Expected Goals) és xPTS (Expected Points) mutatóit, npxG (non-penalty xG) értékeit, Big Chances Created/Conceded statisztikáit, possession %-et, PPDA-t (passes per defensive action), progressive pass & carry számokat, deep completions-t, set piece efficiency-t, pressing intensity zones-okat, defensive line height-et és field tilt arányt. Figyelj a nemzetközi kupamérkőzésekre, barátságos meccsekre és kvalifikációs mérkőzésekre is. Gondold végig, melyik lehet a legjobb értékfogadás, amelynek legalább 50% feletti a valószínűsége. Ne feledd: te egy profi szakember vagy, akinek mindenre kiterjed a figyelme, még azokra is, amiket a bukmékerek esetleg nem vesznek észre. A válaszaidat jól indokold meg, és a végén írd le rendes tipp formába is. Nagyon fontos, hogy több csoportot és kommentet is vizsgálj át, különösen azokat, ahol a fogadási értékről beszélnek, és ahol több ember is értékfogadást lát — például hiányzó kulcsjátékos vagy más olyan tényező, amely elkerüli a bukik figyelmét. A lényeg: a tippeket tipp formába írd le a végén.", specificMatchPrompt: "🎯 KONKRÉT MÉRKŐZÉS ELEMZÉS: {MATCH} {DATE}\n\nMélyedj el részletesen a megadott mérkőzés elemzésében profi szinten. Vizsgáld meg mindkét csapat:\n\n📊 FORM & STATISZTIKÁK (utolsó 10 meccs):\n- xG/xGA (Expected Goals) és tényleges gól arány\n- Possession %, PPDA, progressive passes\n- Set piece hatékonyság (szabadrúgás, szöglet, büntető)\n- Big chances created/conceded\n- Védekező/támadó third teljesítmény\n\n🔍 HEAD-TO-HEAD ANALÍZIS:\n- Utolsó 5 mérkőzés mérleg és gólok\n- Hazai/vendég formák egymás ellen\n- Taktikai matchup előzmények\n- Pszichológiai előnyök\n\n⚠️ CSAPAT HELYZET:\n- Sérültek/eltiltottak listája (TransferMarkt/Sofascore)\n- Edzői taktika változások\n- Motivációs tényezők (bajnoki cím, kiesés, kupameccs)\n- Keretrotáció tervek (Európa-liga hatás)\n\n🌡️ KÖRNYEZETI FAKTOROK:\n- Időjárás előrejelzés (szél, eső, hőmérséklet)\n- Pálya állapot (fű magasság, kemény/lágy talaj)\n- Közönség hatás (hazai/vendég szurkolók száma)\n\n💰 BUKMÉKER & ÉRTÉK ELEMZÉS:\n- Odds összehasonlítás 8+ bukis (Bet365, Unibet, Betfair, Pinnacle)\n- Closing line movement és éles pénz nyomon követés\n- Insider tippek és panel vélemények\n- Public % vs sharp money eloszlás\n\n🎯 KONKRÉT TIPP JAVASLATOK:\n1. 1X2 & dupla esély (indoklással)\n2. Over/Under gólok (2.5, 3.5) + BTTS\n3. Handicap fogadások (AH -1, -1.5)\n4. Player propok (gólok, lövések, passzok)\n5. Első/utolsó gól ideje, félszakasz eredmények\n\nVárható értékfogadások minimum 53% valószínűséggel, statisztikákkal és insider info alapján alátámasztva!" },
        basketball: { name: "Kosárlabda", icon: '🏀', category: 'traditional', title: "Stratégiai Kosárlabda Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy profi kosárlabda elemző, aki 15+ éve követi a nemzetközi és hazai bajnokságokat. Keress mai kosárlabda mérkőzéseket minimum 1.90-es oddsokkal minden elérhető ligából (NBA, EuroLeague, Nemzeti bajnokságok). Vizsgáld meg részletesen a csapatok offensive/defensive ratingjeit, pace factort, rebounding percentageket, és az utóbbi 10 meccs formáját. Kiemelt figyelmet fordíts a key players sérüléseire, back-to-back meccsek hatására, és a home/away form különbségeire. Kutass kosárlabda fórumokon, Reddit NBA/EuroLeague subredditekben, Twitter kosárlabda szakértők posztjaiban, és nézd át az insider információkat - például load management döntések, rookie vs veteran matchupok, vagy utolsó pillanatban kidőlt játékosok. Keress érték fogadásokat, ahol a valós valószínűség legalább 55%-ra becsülhető. Koncentrálj player props-ra (points, rebounds, assists), team totals-ra, quarter/half betting-re, és spread piacokra. Különösen figyelj a revenge game faktorokra, playoff positioning motivációra, és clutch time statisztikákra. A végén adj konkrét single és kombi tippeket tiszta indoklással.", specificMatchPrompt: "🏀 KONKRÉT KOSÁR MÉRKŐZÉS: {MATCH} {DATE}\n\nProfi szintű elemzés a megadott mérkőzésre:\n\n📊 CSAPAT ANALYTICS (utolsó 15 meccs):\n- Offensive/Defensive Rating + Net Rating\n- Pace Factor és possessions/game\n- Effective FG%, True Shooting%, AST/TO ratio\n- Rebounds (OFF/DEF %), Second Chance pontok\n- Paint vs 3PT pontok megoszlás\n\n👥 PLAYER MATCHUPS & PROPS:\n- Starting 5 vs Bench production\n- Usage Rate és PER főbb játékosoknál\n- Injury report és probable/questionable státusz\n- Rest advantage (back-to-back, travel)\n- Head-to-head player battle history\n\n🎯 TAKTIKAI ELEMZÉS:\n- Coaching schemes (motion vs iso offense)\n- Defensive style (switch, drop, hedge)\n- Small ball vs traditional lineup effectiveness\n- Clutch time performance (5 perc < 5 pont)\n- Home court vs road split differenciák\n\n🔍 ADVANCED INSIGHTS:\n- Line movement és sharp money tracking\n- Public betting % vs professional szöjött\n- Weather (outdoor courts), altitude effects\n- Ref crew assignment és calling tendencies\n- Motivation factors (playoff race, revenge games)\n\n💰 BETTING OPPORTUNITIES:\n- Spread analysis (csapat vs public perception)\n- Total points O/U (pace-adjusted)\n- Player props: PRA, 3PT made, R+A, Double-Double\n- Quarter/Half betting (slow/fast starts)\n- Team props: FG%, TO count, made 3s\n\nVárható value bets 54%+ valószínűséggel, insider info és advanced metrics alapján!" },
        tennis: { name: "Tenisz", icon: '🎾', category: 'traditional', title: "Professzionális Tenisz Elemzési Prompt", prompt: "Viselkedj úgy, mint egy 20 éves tapasztalattal rendelkező tenisz szakértő és értékfogadás specialista. Keress mai tenisz mérkőzéseket minimum 1.90-es oddsokkal minden major turnirról (ATP, WTA, Challenger, ITF). Elemezd részletesen a játékosok felszín preferenciáját (salak/fű/kemény), head-to-head mérlegét, recent form-ot, és az utóbbi 5 meccs serve/return statisztikáit. Kutass tenisz fórumokon (TennisWorld, MTF), social media posztokban, TennisTV kommentekben olyan rejtett információkért, mint kisebb sérülések, coaching changes, personal issues, vagy travel fatigue. Különös figyelmet fordíts a weather conditions hatására, jet lag-re, tournament progression-re, és playing style matchupokra (baseliner vs serve&volley). Keress érték fogadásokat, ahol a bookmaker odds nem tükrözi pontosan a valós esélyeket - minimum 52% becsült valószínűséggel. Koncentrálj match winner, set betting, total games, first set winner, és player performance piacokra. Elemezd a break point conversion rates-et, tiebreak records-ot, és pressure situation performance-t. A végén adj strukturált single és accumulator tippeket részletes reasoning-gel.", specificMatchPrompt: "🎾 KONKRÉT TENISZ MÉRKŐZÉS: {MATCH} {DATE}\n\nTenisz szakértői elemzés a megadott párharchoz:\n\n🏟️ FELSZÍN & KÖRNYEZET:\n- Pálya típus (kemény/salak/fű) preferenciák\n- Court speed index (slow/medium/fast)\n- Időjárás hatás (hőmérséklet, szél, páratartalom)\n- Altitude effect és labda-viselkedés\n- Indoor vs outdoor adaptáció\n\n📈 PLAYER ANALYTICS (utolsó 20 meccs):\n- Felszín-specific win/loss record\n- Serve statistics (1st %, ACE/DF ratio)\n- Return game efficiency (break opportunities)\n- Rally length preference (baseline vs net approach)\n- Mental toughness indicators (comeback wins)\n\n🆚 HEAD-TO-HEAD BREAKDOWN:\n- All-time H2H record és trend\n- Felszín-specific H2H stats\n- Set/game win percentages\n- Most recent encounter analysis\n- Psychological edge assessment\n\n💪 FORM & FITNESS:\n- Tournament progression és match time\n- Recent injury concerns/recovery\n- Travel schedule és jet lag\n- Coaching team changes\n- Personal life stability factors\n\n🎯 TACTICAL MATCHUP:\n- Playing style compatibility (aggressor vs counterpuncher)\n- Serve patterns vs return positioning\n- Forehand vs backhand dominance\n- Net game vs baseline grind\n- Pressure point execution (break points, tiebreaks)\n\n📊 BETTING VALUE ANALYSIS:\n- Match winner odds comparison\n- Set betting opportunities (straight sets, total sets)\n- Game handicap lines\n- Total games O/U analysis\n- Player props: ACEs, double faults, winners\n\nValue tips 52%+ valószínűséggel, playing style, form és felszín-compatibility alapján!" },
        american_football: { name: "Amerikai Futball", icon: '🏈', category: 'traditional', title: "NFL Stratégiai Elemzési Prompt", prompt: "Légy egy NFL insider analitikus 20+ éves tapasztalattal, aki minden statisztikai és motivációs faktort ismer. Vizsgáld a hétvégi NFL slate-et minimum 1.90-es oddsokkal. Mélyedj el a csapatok advanced metrics-eiben: DVOA (offense/defense/special teams), EPA per play, red zone efficiency, third down conversion rates, turnover differential, és time of possession trends. Kutass NFL Twitter/X beat reportereknél, team subredditekben, injury reports-ban, weather forecast-okban. Keress insider információkat: motivational edges (revenge games, contract years, coaching hot seats), line movement analysis, sharp vs public money, és vegas insider tips. Figyelj különösen a playoff implications-re, divisional rivalry dynamics-ra, prime time performance history-ra, és rest advantages-re (bye weeks, short weeks). Keress érték fogadásokat 55%+ becsült valószínűséggel spread, totals, player props (passing/rushing/receiving yards, TDs), team props, és live betting scenarios-ban. Elemezd a coaching tendencies-t, game script probabilities-t, és in-game adjustment capabilities-t. A végén adj stratégiai tippeket single és parlay formában konkrét reasoning-gel." },
        baseball: { name: "Baseball", icon: '⚾', category: 'traditional', title: "MLB Sabermetrics Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy sabermetrics guru és MLB értékfogadás specialista 25+ éves tapasztalattal. Keress mai MLB games-eket minimum 1.90-es oddsokkal. Merülj el a starting pitchers advanced stats-aiban: ERA vs FIP vs xFIP, WHIP, K/9, BB/9, HR/9, és ballpark-adjusted numbers. Elemezd a csapatok offensive metrics-eit: wOBA, OPS+, ISO, BABIP, és recent hot/cold streaks. Vizsgáld a bullpen depth-et, usage patterns-t, és closer availability-t. Kutass baseball fórumokon (BaseballThinkFactory, Fangraphs comments), beat writers Twitter feeds-ben, fantasy baseball communities-ben olyan információkért, mint minor injuries, family issues, contract negotiations, vagy clubhouse chemistry. Figyelj különösen a weather impact-ra (wind direction/speed, temperature, humidity), ballpark factors-ra, umpire strike zone tendencies-re, és platoon advantages-ra. Keress érték fogadásokat minimum 53% becsült valószínűséggel moneyline, run line, totals, first 5 innings, player props (hits, HRs, RBIs, strikeouts) piacokban. Elemezd a recent offensive trends-eket, pitcher fatigue-et, és late-inning management. A végén adj data-driven tippeket single és parlay formában supporting sabermetric analysis-szel." },
        ice_hockey: { name: "Jégkorong", icon: '🏒', category: 'traditional', title: "NHL Mélységi Elemzési Prompt", prompt: "Viselkedj úgy, mint egy NHL analytics expert és professional bettor 18+ éves tapasztalattal. Keress mai jégkorong meccseket minimum 1.90-es oddsokkal. Elemezd a csapatok advanced hockey metrics-eit: Corsi For %, Fenwick %, PDO, expected goals for/against, high-danger scoring chances, és faceoff win percentages. Vizsgáld a goaltender performance-ot: save percentage, goals against average, quality start percentage, és back-to-back fatigue. Kutass hockey insider Twitter accounts-ban, team beat reporters cikkeiben, r/hockey discussions-ben, és HockeyDB-n olyan információkért, mint goalie injuries, line combination changes, healthy scratches, vagy locker room issues. Figyelj a travel schedule impact-ra, back-to-back games-re, power play/penalty kill efficiency-re, és late-season motivation factors-ra (playoff race, draft positioning). Keress érték fogadásokat minimum 54% valószínűséggel puck line, totals, period betting, player props (goals, assists, shots, saves), és team props piacokban. Elemezd a coaching systems-t (offensive/defensive schemes), special teams success, és clutch performance metrics. A végén adj strategic hockey tippeket single és accumulator formában advanced analytics supporting-gal." },
        golf: { name: "Golf", icon: '⛳', category: 'traditional', title: "PGA Tour Advanced Analytics & Course Strategy Elemzési Prompt", prompt: "Légy egy PGA Tour insider és golf betting expert 22+ éves tapasztalattal. Vizsgáld a hétvégi tournament mezőnyét minimum 1.90+ oddsokkal. Merülj el a players comprehensive strokes gained analysis-eiben: SG: Off-the-Tee (driving distance/accuracy balance), SG: Approach (proximity to hole by distance ranges), SG: Around-the-Green (scrambling artistry), SG: Putting (surface-specific make percentages), SG: Total trajectory analysis. Kutass golf analytics communities-ben (DataGolf deep dives, Golf Channel metrics, PGA Tour ShotLink database), player equipment changes-ben (club/ball switches impact), caddie insights-ban (course management philosophies), weather forecast models-ben (wind speed/direction by hole) olyan információkért, mint swing coach changes (technical modifications timeline), injury recovery progression (medical withdrawal history), personal life stability factors (family events, sponsorship pressures), course history dominance patterns, vagy pre-tournament practice round intensity. Figyelj különösen a course-specific requirements-re (driving distance importance vs accuracy premium courses, approach shot dispersion patterns, green complex severity ratings), historical scoring conditions analysis-re (winning score trends, cut line projections), recent form weighted metrics-re (last 3/5/10 events performance curves), pressure performance indicators-ra (Sunday back-nine scoring averages, major championship experience), és seasonal form cycles-re (West Coast/Florida swing specialists). Keress érték fogadásokat minimum 52% valószínűséggel: outright winner (overlay identification), each-way value spots (top-5/10/20 place terms), head-to-head matchups (course fit advantages), first round leader (aggressive vs conservative starts), make/miss cut markets (consistency metrics), 3-ball/2-ball betting (daily matchups), nationality/region group betting, tournament matchbet combinations, és live in-play opportunities (momentum shifts). Elemezd a playing style vs course design matrix-ot (bombers vs plotters success rates), putting surface adaptation speeds-et (Bermuda vs Bentgrass vs Poa Annua), weather window advantages-t (morning vs afternoon wave draw bias), mental game resilience indicators-t (comeback history, front-runner stability), és tournament position pressure handling-et (first-time winner probability vs veteran closing skills). A végén adj comprehensive tournament betting strategy-t single selections és portfolio approach formában supporting strokes gained deep dive, course history weighting, current form trajectory analysis, és psychological pressure performance prediction-nel." },
        boxing: { name: "Boksz", icon: '🥊', category: 'traditional', title: "Boksz Szakmai Combat Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy combat sports analyst és boxing betting specialist 20+ éves tapasztalattal. Keress közelgő boksz mérkőzéseket minimum 1.90-es oddsokkal minden súlycsoportból. Elemezd a boxerek fighting style-ját, technical skills-eit (jab accuracy, power punching, defense, footwork), reach/height advantages-t, és knockout power statistics-ot. Kutass boxing fórumokon (BoxingScene, Boxing News), ESPN boxing sections-ben, fighter social media accounts-ban olyan információkért, mint training camp quality, sparring partner selection, weight cut difficulties, personal motivations, vagy family issues. Figyelj különösen az age factor-ra, ring rust hatására (layoff time), venue/crowd advantages-ra, referee/judging tendencies-re, és stylistic matchup implications-re. Keress érték fogadásokat minimum 55% valószínűséggel method of victory (KO/TKO/Decision), round betting, fight duration over/under, és fighter performance props piacokban. Elemezd a punch output/accuracy statistics-ot, chin durability-t, cardio conditioning-et, és mental warfare aspects-ot. A végén adj technical boxing analysis tippeket single és combination bets formában supporting fight breakdown reasoning-gel." },
        mma: { name: "MMA/UFC", icon: '🥋', category: 'traditional', title: "UFC/MMA Komplex Combat Elemzési Prompt", prompt: "Viselkedj úgy, mint egy MMA technical analyst és UFC betting insider 15+ éves tapasztalattal. Vizsgáld a közelgő UFC card-ot minimum 1.90-es oddsokkal. Merülj el a fighters grappling credentials-eiben, striking accuracy/defense metrics-eiben, takedown offense/defense percentages-eiben, submission attempt rates-eiben, és cardio/conditioning levels-eiben. Kutass MMA fórumokon (r/MMA, Sherdog, MMA Underground), UFC social media-ban, fighter interviews-ban olyan információkért, mint training camp changes, injury recoveries, weight cut struggles, personal motivation, vagy gym conflicts. Figyelj az octagon experience differential-re, fighting style evolution-re, reach/height matchup advantages-ra, és referee assignment impact-ra. Keress érték fogadásokat minimum 53% valószínűséggel method of victory, round betting, fight duration, performance bonuses, és fighter-specific prop betting piacokban. Elemezd a stylistic matchup implications-t (striker vs grappler vs well-rounded), fight IQ levels-t, cage generalship-et, és mental toughness under pressure. A végén adj technical MMA breakdown tippeket single és parlay formában supporting martial arts analysis és physical attribute comparisons-szel." },
        volleyball: { name: "Röplabda", icon: '🏐', category: 'traditional', title: "Röplabda Stratégiai Team Elemzési Prompt", prompt: "Légy egy nemzetközi röplabda expert és értékfogadás specialist 16+ éves tapasztalattal. Keress mai mérkőzéseket minimum 1.90-es oddsokkal különböző ligákból (CEV Champions League, nemzeti bajnokságok, nemzetközi tornák). Elemezd a csapatok technical statistics-eit: attack efficiency %, block effectiveness, serve receive quality, setting distribution patterns, és defensive systems effectiveness. Kutass volleyball communities-ben (VolleyTalk forums), team social media updates-ben, coach interviews-ban olyan információkért, mint key player injuries, team chemistry issues, travel fatigue, vagy tactical adjustments. Figyelj a home court advantage impact-ra, playing surface differences-re (floor type, net height consistency), referee assignment tendencies-re, és rotation strategy effectiveness-re. Keress érték fogadásokat minimum 52% valószínűséggel set betting, total points over/under, handicap spreads, first set winners, és individual player performance props piacokban. Elemezd a tactical system matchups-ot (6-2 vs 5-1 offense), substitution patterns-t, timeout usage strategy-t, és pressure performance in crucial sets. A végén adj strategic volleyball tippeket single és combination formában supporting team dynamics analysis és tactical approach evaluation-nel." },
        handball: { name: "Kézilabda", icon: '🤾', category: 'traditional', title: "Kézilabda Taktikai Mélységi Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy európai kézilabda tactical analyst és betting expert 18+ éves tapasztalattal. Vizsgáld a mai mérkőzéseket minimum 1.90-es oddsokkal (EHF Champions League, EHF Cup, nemzeti ligák). Elemezd a csapatok offensive systems-eit (positional attack vs fast break), defensive formations-eit (6-0, 5+1, 4+2), goalkeeper save percentages-eit különböző szögekből, és penalty conversion rates-eit. Kutass handball fórumokon (Handball-Planet), EHF official communications-ben, team websites-eken olyan információkért, mint suspension lists, international duty fatigue, coaching philosophy changes, vagy arena atmosphere impact. Figyelj különösen a referee assignment-ra (strict vs lenient), player rotation policies-re, európai cup vs domestic league priority-ra, és historical head-to-head tactical battles-re. Keress érték fogadásokat minimum 53% valószínűséggel handicap betting, total goals over/under, half-time/full-time results, individual player scoring props, és team tactical success metrics piacokban. Elemezd a goalkeeper duel impact-ot, fast break conversion efficiency-t, man-up situations exploitation-t, és pressure performance in final minutes. A végén adj strategic handball tippeket single és accumulator formában supporting tactical matchup analysis és team form assessment-tel." },
        rugby: { name: "Rögbi", icon: '🏉', category: 'traditional', title: "Rugby Union/League Komprehenzív Elemzési Prompt", prompt: "Viselkedj úgy, mint egy rugby expert analyst és international rugby betting specialist 20+ éves tapasztalattal. Keress közelgő mérkőzéseket minimum 1.90-es oddsokkal (Six Nations, Rugby Championship, Premiership, Super Rugby). Merülj el a csapatok forward pack vs backline balance analysis-eiben, scrum dominance statistics-eiben, lineout success rates-eiben, ruck efficiency metrics-eiben, és territory/possession control patterns-eiben. Kutass rugby fórumokon (The Rugby Forum), official union websites-eken, rugby journalism Twitter feeds-ben olyan információkért, mint international player availability, injury return timelines, weather impact on game plans, vagy coaching tactical innovations. Figyelj különösen a set piece reliability-re, kicking game accuracy-ra (territory vs points), referee interpretation tendencies-re, és home ground advantages specifics-ra. Keress érték fogadásokat minimum 54% valószínűséggel handicap betting, total points over/under, first try scorer, disciplinary points (cards/penalties), és team performance metrics piacokban. Elemezd a forward dominance implications-t, breakdown contest effectiveness-t, territorial advantage strategies-t, és bench impact in final quarter. A végén adj strategic rugby tippeket single és multiple bets formában supporting pack vs backline analysis és set piece battle assessment-tel." },
        cricket: { name: "Krikett", icon: '🏏', category: 'traditional', title: "Cricket Komplex Format-Specific Elemzési Prompt", prompt: "Légy egy cricket technical analyst és international cricket betting guru 25+ éves tapasztalattal minden format-ban. Vizsgáld a közelgő matches-eket minimum 1.90-es oddsokkal (Test, ODI, T20I, domestic competitions). Elemezd a team batting depth-et, bowling attack variety (pace vs spin balance), fielding standards-ot, és format-specific tactical approaches-ot. Kutass cricket communities-ben (CricketWeb, ESPNCricinfo forums), player social media-ban, cricket journalism-ben olyan információkért, mint pitch preparation details, weather forecast implications, team selection dilemmas, vagy player form cycles. Figyelj különösen a pitch conditions evolution-re (day 1 vs day 4 characteristics), toss decision importance-re, DLS method implications-re, és venue-specific historical patterns-re. Keress érték fogadásokat minimum 52% valószínűséggel match winners, top batsman/bowler markets, innings totals, method of dismissal props, session betting, és individual player performance metrics piacokban. Elemezd a bowling matchup advantages-t, batting order strategy-t, captaincy tactical decisions-t, és pressure performance in crucial phases. A végén adj format-appropriate cricket tippeket single és combination formában supporting pitch analysis és playing conditions assessment-tel." },
        athletics: { name: "Atletika", icon: '🏃', category: 'traditional', title: "Atletika Advanced Performance Analytics Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy track and field biomechanics expert és athletics betting specialist 20+ éves tapasztalattal. Keress közelgő events-eket minimum 1.90+ oddsokkal (Diamond League, World Championships, Continental Tour Gold, Olympic qualifiers, National Championships). Merülj el az athletes comprehensive performance analysis-eiben: seasonal progression curves (SB/PB ratios), wind-adjusted performances (+2.0m/s conversions), altitude-adjusted times, reaction time consistency (sprint events), split analysis patterns (100m: 10m segments, 400m: 100m splits), stride frequency/length optimization trends. Kutass athletics communities-ben (LetsRun.com deep threads, Track & Field News forums, World Athletics statistical database), athlete social media training logs-ban, coach interview insights-ban (training philosophy reveals), biomechanics research papers-ben olyan információkért, mint training block periodization (base/speed/taper phases), injury comeback progression curves, equipment technology advantages (super spikes aerodynamic benefits), psychological preparation methods (visualization techniques), competition schedule optimization, vagy altitude training camp effects (2-3 weeks post-return peak window). Figyelj különösen a venue-specific factors-ra (track surface: Mondo vs Rekortan, lane draw advantages, stadium wind patterns), weather optimization windows (temperature 16-23°C, humidity <60%, tailwind legality), head-to-head psychological dynamics (pacers vs kickers, false start pressure), major championship performance history (clutch gene analysis), és seasonal peak timing patterns (double peak possibility). Keress érték fogadásokat minimum 52% valószínűséggel: event winners (consider recent form trajectory), head-to-head matchups (psychological edges), performance line betting (over/under times/distances), podium finish probabilities, national record assault conditions, meet record vulnerability analysis, és relay team composition optimization. Elemezd a tactical race execution patterns-t (sit-and-kick vs front-running success rates), technical event consistency under pressure (field events: 6 attempts strategy), sprint event reaction time advantages (0.100 vs 0.150 impact), middle-distance pacing strategies (negative vs even splits), és championship rounds progression (heats/semis/finals energy management). A végén adj performance-focused athletics tippeket single events és championship progression formában supporting biomechanical efficiency analysis, training periodization assessment, venue-specific optimization, és historical clutch performance evaluation-nel." },
        cycling: { name: "Kerékpározás", icon: '🚴', category: 'traditional', title: "Kerékpározás Multi-Discipline Stratégiai Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy professional cycling analyst és Grand Tour betting expert 22+ éves tapasztalattal. Keress közelgő races-eket minimum 1.90-es oddsokkal (Grand Tours, Monuments, World Tour events). Elemezd a riders climbing power-to-weight ratios-eit, time trial aerodynamic efficiency-jét, sprint positioning skills-eit, és team tactical support quality-jét. Kutass cycling fórumokon (CyclingNews, PelotonCafe), pro team social media-ban, DS tactical interviews-ban olyan információkért, mint equipment advantages, altitude training camps, team leadership dynamics, vagy stage-specific preparation strategies. Figyelj különösen a stage profile analysis-re (gradient percentages, wind exposure, technical descents), weather forecast implications-re, historical performance venue patterns-re, és Grand Tour vs one-day race specialization factors-ra. Keress érték fogadásokat minimum 52% valószínűséggel stage winners, overall classification positions, points/mountain jersey competitions, team classification battles, és breakaway success probability piacokban. Elemezd a team tactical dynamics-ot, peloton politics influence-t, pacing strategy variations-t, és recovery management between stages. A végén adj strategic cycling tippeket single és stage-by-stage accumulator formában supporting terrain analysis és rider specialization assessment-tel." },
        horse_racing: { name: "Lóverseny", icon: '🏇', category: 'traditional', title: "Lóverseny Comprehensive Form Elemzési Prompt", prompt: "Légy egy thoroughbred racing expert és professional handicapper 25+ éves tapasztalattal. Keress mai horse racing events-eket minimum 1.90-es oddsokkal (flat racing, jump racing, különböző távolságok). Merülj el a horses form analysis-eiben (recent performance ratings, class levels, distance preferences), jockey statistics-eiben (course/distance strike rates, trainer partnerships), trainer patterns-eiben (seasonal peaks, first-time equipment), és breeding/pedigree implications-eiben specific race conditions-höz. Kutass racing fórumokon (Racing Post forums), stable social media updates-ben, bloodstock agent insights-ban olyan információkért, mint stable confidence indicators, work rider reports, veterinary treatments, vagy ownership pressure factors. Figyelj különösen a going conditions preferences-re (firm/good/soft/heavy), draw bias implications-re, pace scenario analysis-re, és seasonal progression patterns-re. Keress érték fogadásokat minimum 54% valószínűséggel win betting, each-way value spots, exacta/trifecta combinations, place betting overlays, és ante-post tournament winners piacokban. Elemezd a pace mapping scenarios-t, class relief/rise implications-t, jockey booking significance-t, és market confidence vs insider knowledge disconnects. A végén adj professional racing tippeket win/place/show formában supporting form study analysis és market evaluation reasoning-gel." },
        swimming: { name: "Úszás", icon: '🏊', category: 'water', title: "Úszás Advanced Hydrodynamics & Performance Elemzési Prompt", prompt: "Viselkedj úgy, mint egy swimming biomechanics expert és aquatic sports betting specialist 18+ éves tapasztalattal. Vizsgáld a közelgő swimming competitions-eket minimum 1.90+ oddsokkal (World Championships, Olympic Trials, ISL matches, Mare Nostrum series, national championships). Merülj el a swimmers comprehensive performance metrics-eiben: stroke rate/distance per stroke optimization (DPS vs SR trade-offs), underwater dolphin kick efficiency (15m split analysis), turn execution speed (in/out splits), energy system contribution analysis (aerobic vs anaerobic threshold pacing), lactate tolerance indicators, és race pace modeling (PB projection algorithms). Kutass swimming communities-ben (SwimSwam deep analytics, Swimming World Magazine forums, FINA database), athlete Strava training logs-ban, coach methodology interviews-ban (periodization philosophies), sports science research papers-ben olyan információkért, mint taper protocol effectiveness (3-week vs 2-week models), altitude training adaptation curves (2-4 weeks post-return benefits), equipment technology advantages (tech suit compression zones, goggle hydrodynamics), pool design impact (gutter systems, lane rope tension), pre-race activation protocols, vagy psychological visualization techniques. Figyelj különösen a venue-specific factors-ra (pool depth: fast vs slow pools, water temperature 25-28°C optimal range, lane assignments: center lanes advantage, timing system sensitivity), competition schedule optimization (prelims/semis/finals energy management, multiple event spacing), relay exchange precision (0.03s margins), stroke-specific technical evolution (freestyle: straight arm vs high elbow recovery), és seasonal periodization phases (base/race pace/taper). Keress érték fogadásokat minimum 51% valószínűséggel: event winners (consider recent time drops), head-to-head matchups (psychological history), time prediction markets (season best probability), relay team optimization (leg order strategy), world/continental record vulnerability (conditions alignment), junior-to-senior transition success rates, és ISL team scoring projections. Elemezd a race execution patterns-t (split differential analysis, backend speed reserves), stroke count consistency under fatigue, breathing pattern optimization (2-3-2 vs bilateral), championship meet pressure performance (finals time drops), és technical efficiency maintenance (stroke mechanics degradation). A végén adj hydrodynamics-focused swimming tippeket single events és multi-event programs formában supporting lactate curve analysis, biomechanical efficiency metrics, competition psychology patterns, és historical performance progression modeling-gel." },
        water_polo: { name: "Vízilabda", icon: '🤽', category: 'water', title: "Vízilabda Taktikai Team Dynamics Elemzési Prompt", prompt: "Légy egy vízilabda tactical expert és water polo betting specialist 15+ éves tapasztalattal. Keress mai mérkőzéseket minimum 1.90-es oddsokkal (Champions League, Euro Cup, nemzeti bajnokságok). Merülj el a csapatok offensive systems analysis-eiben (center forward vs perimeter shooting), defensive pressure schemes-eiben, goalkeeper save percentage vs shooting angles statistics-eiben, és man-up/man-down conversion efficiency-ben. Kutass water polo communities-ben (WaterPoloWorld forums), team social media updates-ben, coach tactical interviews-ban olyan információkért, mint key player conditioning status, tactical system adaptations, referee assignment tendencies, vagy pool dimension advantages. Figyelj különösen a physical conditioning levels-re (4th quarter stamina), exclusion foul management-re, counter-attack conversion rates-re, és European vs domestic league tactical differences-re. Keress érték fogadásokat minimum 53% valószínűséggel handicap betting, total goals over/under, quarter-by-quarter scoring patterns, individual player scoring props, és penalty shootout scenarios piacokban. Elemezd a goalkeeper duel significance-t, set piece execution efficiency-t, swimming speed advantages-t, és tactical adaptation capabilities mid-game. A végén adj strategic water polo tippeket single és accumulator formában supporting team tactical analysis és player conditioning assessment-tel." },
        table_tennis: { name: "Asztalitenisz", icon: '🏓', category: 'precision', title: "Asztalitenisz Technical Precision Elemzési Prompt", prompt: "Viselkedj úgy, mint egy table tennis technical analyst és international ping pong betting specialist 16+ éves tapasztalattal. Vizsgáld a közelgő tournaments-eket minimum 1.90-es oddsokkal (ITTF World Tour, European Championships, national leagues). Merülj el a players technical style analysis-eiben (offensive topspin vs defensive chopping vs all-round), equipment specifications-eiben (rubber/blade combinations), serve variety effectiveness-eiben, és return game adaptation capabilities-eiben. Kutass table tennis fórumokon (TableTennisDaily, ITTF forums), player equipment choices updates-ben, coaching philosophy interviews-ban olyan információkért, mint technique modifications, mental preparation methods, playing surface adaptation strategies, vagy injury management approaches. Figyelj különösen a rubber technology advantages-ra, playing hall conditions-re (lighting, air circulation), tournament format mental demands-re, és Asian vs European tactical philosophy differences-re. Keress érték fogadásokat minimum 51% valószínűséggel match winners, set betting handicaps, total games over/under, service game dominance, és tournament progression probability piacokban. Elemezd a style matchup implications-t (speed vs spin vs placement), rally length preferences-t, pressure point execution-t, és equipment rule adaptation speeds. A végén adj technical table tennis tippeket single és tournament progression formában supporting equipment analysis és playing style compatibility assessment-tel." },
        badminton: { name: "Tollaslabda", icon: '🏸', category: 'precision', title: "Tollaslabda Technical Court Dynamics Elemzési Prompt", prompt: "Légy egy badminton performance analyst és BWF tournament betting expert 14+ éves tapasztalattal. Keress közelgő events-eket minimum 1.90-es oddsokkal (BWF World Tour, Thomas/Uber Cup, national championships). Elemezd a players court coverage efficiency-jét, smash power vs placement accuracy balance-ét, net play finesse techniques-eit, és endurance performance curves-eit különböző match lengths-eknél. Kutass badminton communities-ben (BadmintonCentral forums), BWF official communications-ben, Asian badminton media-ban olyan információkért, mint string tension optimization, shuttle speed preferences, coaching tactical innovations, vagy altitude/humidity adaptation strategies. Figyelj különösen a playing style evolution-re (attack vs defense vs deception), doubles partnership chemistry-re, venue-specific court conditions-re, és tournament scheduling fatigue management-re. Keress érték fogadásokat minimum 50% valószínűséggel match winners, game betting spreads, total points over/under, handicap game advantages, és doubles team coordination effectiveness piacokban. Elemezd a tactical game development patterns-t, shot selection decision-making-et, court positioning advantages-t, és mental resilience under extended rallies. A végén adj technical badminton tippeket single és tournament bracket formában supporting court positioning analysis és shot selection evaluation-nel." },
        darts: { name: "Darts", icon: '🎯', category: 'precision', title: "Darts PDC World Championship Psychology Elemzési Prompt", prompt: "Viselkedj úgy, mint egy darts psychology expert és PDC World Championship betting specialist 20+ éves tapasztalattal. Keress közelgő tournaments-eket minimum 1.90+ oddsokkal (PDC World Championship, Premier League, World Matchplay, UK Open, European Tour events, Players Championship). Merülj el a players statistical precision analysis-eiben (180s frequency under pressure, checkout percentage consistency, first 9 dart average trends, doubles accuracy), mental game resilience assessment-ben (pressure point execution, comeback psychology, stage fright management), stage experience confidence evaluation-ben (TV table vs floor performance differential), és venue-specific adaptation capabilities-ben. Kutass darts communities-ben (DartsNutz forums, r/Darts discussions), player social media psychological insights-ban, Sky Sports darts expert analysis-ben (Wayne Mardle, John Part commentary insights), PDC official content-ben olyan információkért, mint practice routine intensity changes, family support system stability, crowd favorite psychological advantages, venue acoustics adaptation strategies, walk-on music psychological impact assessment, vagy personal motivation factors (financial pressures, ranking implications). Figyelj különösen a format adaptation psychological skills-re (sets vs legs vs first-to formats), oche position comfort zone consistency-ra, stage lighting adaptation speed-re, crowd noise management capabilities-re, alcohol consumption policy mental effects-re (if applicable), és historical venue performance pattern analysis-ra. Keress érték fogadásokat minimum 53% valószínűséggel: match winners (consider head-to-head psychology), handicap betting scenarios, highest checkout achieved markets, 180s hit count over/under, tournament outright winner odds, match duration predictions, és live betting momentum identification (psychological shift moments). Elemezd a head-to-head psychological warfare advantages-t, comeback mental resilience under deficit pressure-t, finishing consistency trends under television scrutiny-t, crowd interaction psychological management skills-et, equipment malfunction pressure response-t, és stage experience vs natural talent balance. A végén adj strategic darts tippeket match/session/tournament formában supporting mental game resilience analysis, statistical consistency evaluation, stage psychology assessment, és historical pressure performance prediction-nel." },
        snooker: { name: "Snooker", icon: '🎱', category: 'precision', title: "Snooker Crucible Psychology & Technical Mastery Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy snooker Crucible Theatre expert és World Championship betting specialist 25+ éves tapasztalattal. Keress közelgő tournaments-eket minimum 1.90+ oddsokkal (Crucible World Championship, UK Championship, Masters Triple Crown, ranking events: Players Championship, Tour Championship). Merülj el a players technical precision analysis-eiben (potting percentage under pressure, century break conversion rates, break-building consistency curves), tactical battle intelligence-ben (safety shot placement precision, tactical foul execution, position play mastery), psychological pressure response patterns-ben (Crucible vs other venues performance differential), és long-format endurance management-ben (best-of-35 frames mental stamina, session-by-session energy distribution). Kutass snooker communities-ben (The Snooker Forum, SnookerHQ discussions, World Snooker Tour official content), BBC/Eurosport expert analysis-ben (Dennis Taylor, John Virgo, Ken Doherty insights), player autobiography revelations-ben, coaching methodology interviews-ban olyan információkért, mint cue maintenance rituals (tip hardness preferences, chalk application methods), practice table conditions adaptation strategies, psychological coaching techniques (sports psychology integration), equipment sponsorship pressure effects, personal life stability factors impacting performance, vagy venue-specific preparation methods. Figyelj különösen a Crucible Theatre atmosphere pressure adaptation-ra (crowd noise, TV table pressure, one-table setup psychology), table conditions evolution response-ra (cloth speed changes during tournament, cushion responsiveness variations, lighting adjustment impacts), session timing psychology-ra (morning vs afternoon vs evening sessions performance patterns), best-of format mental endurance-ra (short vs long format adaptation), referee assignment influences-ra (strict vs lenient officiating impact), és historical venue performance patterns-re. Keress érték fogadásokat minimum 54% valószínűséggel: match winners (consider head-to-head records), handicap frame betting (comeback specialists vs front-runners), highest break achieved markets, century break count over/under, session score predictions (session specialists), total frames over/under, tournament outright winner odds, és live betting momentum opportunities (session break psychology). Elemezd a tactical battle evolution dynamics-t, comeback psychological resilience from deficit positions-t, pressure clearance execution under television scrutiny-t, referee/crowd psychological influence management-et, equipment malfunction pressure response-t, és venue-specific historical performance consistency. A végén adj strategic snooker tippeket match/session/tournament formában supporting Crucible psychology analysis, technical precision assessment, historical performance pattern evaluation, és mental resilience prediction-nel." },
        motor_general: { name: "Motorsport", icon: '🏁', category: 'motor', title: "Motorsport Universal Technical Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy motorsport technical analyst és racing betting specialist 20+ éves tapasztalattal minden kategóriában. Vizsgáld a közelgő racing events-eket minimum 1.90-es oddsokkal (Formula series, touring cars, endurance racing). Merülj el a drivers qualifying vs race pace analysis-eiben, team technical development curves-eiben, mechanical reliability statistics-eiben, és circuit-specific setup advantages-eiben. Kutass motorsport fórumokon (Autosport forums), paddock insider reports-ban, technical regulation interpretation discussions-ben olyan információkért, mint setup philosophy changes, driver confidence levels, team internal dynamics, vagy technical directive implications. Figyelj különösen a weather forecast impact-ra, tire compound strategy implications-re, fuel consumption optimization-ra, és safety car probability scenarios-ra. Keress érték fogadásokat minimum 53% valószínűséggel race winners, podium position betting, fastest lap achievers, mechanical DNF probabilities, és constructor championship points piacokban. Elemezd a track characteristics vs car/driver strengths compatibility-t, overtaking opportunity zones-t, strategic decision-making under pressure-t, és championship implications motivation factors. A végén adj comprehensive motorsport tippeket single és combination race formában supporting technical analysis és strategic racing evaluation-nel." },
        formula1: { name: "Forma-1", icon: '🏎️', category: 'motor', title: "Formula-1 Advanced Technical Elemzési Prompt", prompt: "Viselkedj úgy, mint egy F1 technical insider és Grand Prix betting specialist 22+ éves tapasztalattal. Vizsgáld a hétvégi race weekend-et minimum 1.90-es oddsokkal minden session-re. Elemezd a power unit performance curves-eit, aerodynamic efficiency vs drag balance-ét, tire degradation simulation data-t, és DRS/ERS deployment strategy effectiveness-ét. Kutass F1 technical fórumokon (F1Technical, Reddit F1), paddock journalist insider reports-ban, team principal strategic communications-ben olyan információkért, mint regulation interpretation advantages, development token allocation strategies, driver psychological preparation methods, vagy grid penalty implications. Figyelj különösen a track evolution effects-re, weather window exploitation opportunities-ra, fuel load optimization vs grid position trade-offs-ra, és championship mathematics pressure scenarios-ra. Keress érték fogadásokat minimum 54% valószínűséggel race winners, podium position combinations, fastest lap achievements, safety car period probabilities, constructor points maximization, és driver championship swing implications piacokban. Elemezd a strategic team dynamics-ot, pit stop execution consistency-t, tire compound selection philosophy-t, és pressure performance under title fight conditions. A végén adj strategic F1 weekend tippeket qualifying/sprint/race formában supporting advanced technical regulation analysis és team development trajectory assessment-tel." },
        csgo: { name: "CS2", icon: '🔫', category: 'esports', title: "Counter-Strike 2 Advanced Tactical Meta Elemzési Prompt", prompt: "Viselkedj úgy, mint egy Counter-Strike 2 professional scene expert és tactical betting specialist 15+ éves CS tapasztalattal (1.6/Source/GO/CS2 evolution). Keress közelgő tier-1 matches-eket minimum 1.90+ oddsokkal (BLAST Premier, ESL Pro League, PGL Majors, IEM tournaments). Merülj el a teams Source 2 engine adaptation-jeiben, új smoke mechanics exploitation-jeiben (dynamic smoke interactions), sub-tick system impact analysis-ben, updated map pool mastery-ben (Mirage rework, Ancient, Anubis), és MR12 format tactical adjustments-ben. Kutass CS2 communities-ben (r/GlobalOffensive, HLTV.org forums), pro player streaming tactical breakdowns-ban, analyst desk discussions-ben (thorin, spunj analysis), insider Twitter/X accounts-ban olyan információkért, mint roster chemistry post-CS2 transition, bootcamp adaptation intensity, anti-strat development in new meta, coaching system updates, vagy player role flexibility evolution. Figyelj különösen a Source 2 engine performance advantages-re (higher FPS, better hit registration), new grenades physics exploitation-re, updated economy meta implications-re, premier mode vs faceit experience translation-re, és LAN venue adaptation with new hardware/software. Keress érték fogadásokat minimum 54% valószínűséggel: match winners, map-specific predictions (consider map reworks), round handicap scenarios, pistol round outcomes (improved pistol meta), individual player ratings (HLTV 2.0+), tournament advancement probabilities, és live betting opportunities (momentum shifts). Elemezd a tactical innovation pace-t CS2-ben, clutch situations decision-making evolution-t, economy management optimization-t, anti-strat preparation effectiveness post-meta changes, és crowd pressure adaptation with Source 2 audio improvements. A végén adj strategic CS2 tippeket match/map/tournament formában supporting Source 2 meta understanding, tactical evolution assessment, és individual player adaptation analysis-szel." },
        lol: { name: "League of Legends", icon: '⚔️', category: 'esports', title: "LoL Worlds Meta Strategic Deep-Dive Elemzési Prompt", prompt: "Viselkedj úgy, mint egy League of Legends Worlds meta expert és LCS/LEC/LCK/LPL betting specialist 12+ éves tapasztalattal. Keress közelgő tier-1 matches-eket minimum 1.90+ oddsokkal (Worlds Championship, MSI, regional finals: LCS/LEC/LCK/LPL/PCS). Merülj el a teams draft phase innovation-jeiben (flex picks mastery, ban priority evolution, red/blue side advantages), macro execution precision analysis-ben (objective timing windows, map state transitions, vision control patterns), individual player champion ocean depth-jében (pocket picks, meta slaves vs innovators), és coaching strategic preparation methodology-ben. Kutass LoL esports communities-ben (r/leagueoflegends, LoL Esports subreddit, Inven Global discussions), pro player streaming insights-ban (Doublelift, Sneaky, LS patch analysis), coaching content-ben (Reapered, Grabbz philosophy), Asian LoL media-ban (Inven KR, Weibo gaming discussions) olyan információkért, mint scrim leak insights, champion mastery development timelines, psychological coaching methods, patch adaptation strategies (micro vs macro meta shifts), vagy international tournament preparation philosophies. Figyelj különösen a current patch power spikes-ra (item rework implications, champion rework integration), regional meta clash scenarios-ra (LCK macro vs LPL aggro vs LEC scaling vs LCS chaos), Bo1 vs Bo5 format adaptation psychology-ra (draft flexibility under pressure), international stage adaptation-ra (jet lag, crowd pressure, translation barriers), és Worlds meta evolution-re (group stage vs knockout stage tactical evolution). Keress érték fogadásokat minimum 54% valószínűséggel: match winners, game duration over/under (fast meta vs scaling meta), first objective achievements (FB/FT/FD/FH/FB dragons), individual player performance props (KDA, CS@15, damage %), draft phase predictions (first pick/ban priorities), series score predictions, tournament bracket advancement probabilities, és live betting momentum identification. Elemezd a teamfight coordination execution-t, late game decision-making under pressure-t, early game snowball potential vs scaling insurance-t, champion comfort zones vs meta enforcement-et, és coaching adaptation speed mid-series. A végén adj strategic LoL tippeket match/series/tournament formában supporting current meta mastery evaluation, regional strength assessment, és psychological resilience prediction-nel." },
        dota2: { name: "Dota 2", icon: '🛡️', category: 'esports', title: "Dota 2 The International Strategic Mastery Elemzési Prompt", prompt: "Légy egy Dota 2 The International strategic expert és DPC circuit betting specialist 14+ éves tapasztalattal (minden TI meta evolution). Keress közelgő tier-1 tournaments-eket minimum 1.90+ oddsokkal (The International, ESL Pro Tour, DreamLeague, regional DPC divisions, BetBoom Dacha). Merülj el a teams drafting philosophy evolution-jeiben (pos1-5 role flexibility, hero comfort zones vs meta enforcement), strategic innovation depth-jében (macro timing windows, objective prioritization sequences), individual player peak performance cycles-eiben (mechanical ceiling, decision-making under pressure), captain calling precision-jében (shot-calling clarity, adaptation speed), és coaching preparation methodology-ben (scrimmage analysis, opponent-specific strategies). Kutass Dota 2 communities-ben (r/DotA2, Liquipedia match discussions, GosuGamers analysis), professional scene insights-ban (player interviews, team documentaries), analyst content-ben (Jenkins, BSJ, Purge patch breakdowns), CIS/SEA/China Dota media-ban olyan információkért, mint internal team dynamics, practice schedule intensity vs burnout management, psychological preparation methods (sports psychologists), patch adaptation strategies (major vs minor patch implications), team chemistry development timelines, vagy roster stability vs experimentation balance. Figyelj különösen a current patch power meta implications-re (carry/support/offlane tier shifts, item build optimization), regional playstyle philosophy clashes-ra (CIS aggression vs EU calculated vs SEA chaotic vs CN methodical), LAN tournament adaptation psychology-ra (TI pressure vs regional events), format-specific preparation-ra (Bo1 group stage vs Bo3 playoffs vs Bo5 grand finals), és prize pool pressure psychological management-re. Keress érték fogadásokat minimum 55% valószínűséggel: series winners, game duration predictions (fast push vs late game), draft phase bet opportunities (first pick/ban priorities, hero combinations), first blood/tower/roshan achievements, individual player performance props (GPM, XPM, KDA targets), map control progression, tournament bracket advancement probabilities, és live betting momentum identification (comeback potential vs throw susceptibility). Elemezd a drafting phase execution mastery-t, teamfight coordination precision-t, late game decision-making under ultimate pressure-t, high ground siege/defense capabilities-t, strategic adaptation flexibility mid-series-t, és mental resilience during elimination scenarios. A végén adj strategic Dota 2 tippeket series/tournament/TI formában supporting comprehensive meta mastery evaluation, team strategic depth assessment, psychological resilience prediction, és historical performance pattern analysis-szel." },
        valorant: { name: "Valorant", icon: '🎯', category: 'esports', title: "Valorant VCT Professional Meta Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy Valorant Champions Tour expert analyst és VCT betting specialist 6+ éves tapasztalattal. Keress közelgő VCT tier-1 matches-eket minimum 1.90+ oddsokkal (VCT Masters, Champions, regional VCT leagues, Game Changers). Merülj el a teams agent composition meta-evolution-jeiben (Gekko, Harbor, Fade integration), role flexibility analysis-ben (IGL vs flex player capabilities), individual mechanical ceiling tracking-ben (ACS, ADR, K/D trends), tactical execution precision metrics-ben (site take success %, retake efficiency, rotation timing optimization). Kutass Valorant communities-ben (r/VALORANT, VLR.gg match discussions, Plat Chat podcast analysis), pro player streaming tactical insights-ban (TenZ, Shroud, FNS tactical breakdowns), VCT official content-ben olyan információkért, mint agent ban/pick priority shifts, coaching staff tactical philosophy updates, psychological preparation methods (LAN vs online adaptation), bootcamp preparation intensity reports, vagy roster synergy development timelines. Figyelj különösen a patch meta implications-re (agent buffs/nerfs impact), map-specific agent compositions-re (Bind/Split/Ascent/Icebox/Breeze/Fracture/Pearl/Lotus/Sunset optimal comps), regional tactical philosophy differences-re (NA aggressive vs EMEA methodical vs PACIFIC explosive), VCT format adaptation-ra (Swiss vs double-elimination bracket psychology), és international LAN stage pressure management-re. Keress érték fogadásokat minimum 53% valószínűséggel: match winners, map-specific predictions (consider team map pools), round handicap scenarios, pistol round outcomes (crucial for momentum), spike plant/defuse props, individual player performance metrics (ACS, ADR targets), tournament bracket advancement probabilities, és live betting momentum shifts. Elemezd a tactical counter-stratting effectiveness-t, clutch performance consistency under pressure-t, agent ability coordination timing-et, anti-strat preparation depth-et, és mid-round adaptation capabilities. A végén adj strategic Valorant VCT tippeket match/map/series formában supporting agent meta mastery analysis, tactical innovation assessment, és individual player peak performance prediction-nel." },
        virtual_sports: { name: "V-Sport", icon: '🎮', category: 'virtual', title: "⚠️ FIGYELEM - EHHEZ NEM LÉTEZIK PROMPT", prompt: "EHHEZ NEM LÉTEZIK PROMPT!\n\nA virtuális sportok tisztán véletlenszám-generátorok alapján működő szerencsejátékok.\nNincs elemzési lehetőség, nincsenek minták, nincsenek tippek.\n\nEzek az események számítógépes szimulációk, ahol minden eredményt algoritmusok határoznak meg.\nA megjelenített 'formák' és 'statisztikák' csak díszítő elemek.\n\n🔴 NE KERESS STRATÉGIÁKAT!\n🔴 NE KERESS MINTÁKAT!\n🔴 NE VÁRJ PROFESSZIONÁLIS TIPPEKET!\n\nA virtuális sport = digitális szerencsejáték\nCsak szórakozásból, kis tétekkel!\n\nHA VALÓDI SPORTFOGADÁSI PROMPTOKAT KERESEL,\nVÁLASSZ EGY MÁSIK SPORTÁGAT A LISTÁBÓL!", special: "warning" },
        motogp: { name: "MotoGP", icon: '🏍️', category: 'motor', title: "MotoGP Versenyhétvége Stratégiai Elemzési Prompt", prompt: "Viselkedj úgy, mint egy MotoGP paddock-insider és motorsport fogadási szakértő 15+ éves tapasztalattal. Elemezd a közelgő nagydíj szabadedzéseit, időmérőjét és futamát. Vizsgáld a versenyzők gumikezelési stílusát (Michelin keverékek kopási görbéi), motorcsomagjaikat (V4 vs Inline-4 erőforrások), aerodinamikai fejlesztéseiket (downwash márványzás), és elektronikájuk beállításait (traction/engine brake térképek). Kutass paddock-sajtóban, csapatrádiós kiszivárgásokban, rider interjúkban olyan információkért, mint karburáló sérülések, új váz-spec tesztek, vagy esős beállítások hatékonysága. Figyelj a pálya karakterére (agresszív féktávok vs hosszú ívek), gumihőmérséklet ablakokra, időjárási frontokra és slipstream-hatásra. Keress értékfogadásokat minimum 54% becsült valószínűséggel futamgyőztes, dobogó, top6, leggyorsabb kör és head-to-head piacokon. A végén adj single és kombinált tippeket részletes indoklással." },
        nascar: { name: "NASCAR", icon: '🚗', category: 'motor', title: "NASCAR Cup Series Advanced Oval Strategy Prompt", prompt: "Gondolkodj úgy, mint egy NASCAR crew chief és szimuláció-elemző 20 éves tapasztalattal. Vizsgáld a hétvégi pályát (short track, intermediate, superspeedway vagy road course) aerodinamikai és mechanikai grip szempontból. Elemezd a pilóták green-flag átl. pozícióját, long-run vs short-run sebességét, pit stop ciklusstratégiáit, és üzemanyag-fogyasztási modelleket. Kutass spotter chat-leakekben, csapatrádiós klippekben, garage insider riportokban setup-filozófiákért (camber, spoiler dőlésszög), és motorerő csomagokra vonatkozó FIA/hendrick fejlesztésekért. Figyelj a gumifall-kopásra (Goodyear set limit), stage break-pontokra, és várható caution-számra. Keress értékfogadásokat 53%+ valószínűséggel futamgyőztes, top3/5/10 elhelyezés, gruppmatch-up, vezetett körök >/<, és első gyártó piacokon. Adj adatvezérelt tippeket szimulációs kimenetekkel alátámasztva." },
        fifa_esports: { name: "FIFA Esports", icon: '🎮', category: 'esports', title: "FIFA Esports Meta & Form Elemzési Prompt", prompt: "Viselkedj úgy, mint egy FIFA Global Series elemző és e-football fogadási szakértő. Elemezd az aktuális patch metát (exploit mozdulatok, driven passes, defensive nerfek), a játékosok formáját (Weekend League 20-0 százalék, LAN eredmények), valamint a squad-építő tendenciákat (lengthy vs explosive build, chemistry styles). Kutass Twitter klippekben, Discord scrim eredményekben, Top100 ranglistában a rejtett hot-streakek után. Figyelj a connection-eloszlásra, regionális ping különbségekre és a LAN-stresszre. Keress értékfogadásokat 55% becsült valószínűséggel BO2/BO3 match-győztes, piacspecifikus gól/hendikep és over/under időkön. Adj konkrét tippeket, beleértve a gameplan breakdown-t és mentális tényezőket." },
        nba2k: { name: "NBA 2K League", icon: '🎮', category: 'esports', title: "NBA 2K League Advanced Tactical & Usage Rate Elemzési Prompt", prompt: "Viselkedj úgy, mint egy NBA 2K League GM és analytics expert 8+ éves tapasztalattal. Elemezd a csapatok archetype-felosztását (PG Shot-Creator vs Playmaker, SG 2-Way Sharpshooter vs Lock, PF Glass-Cleaner vs Stretch), pick-and-roll coverage sémáit (switch vs hedge vs ice), és clutch time execution patterns-t (iso vs team play). Merülj el advanced statistics-ekben: Offensive/Defensive Rating per lineup, Usage Rate distribution, Turnover Percentage, Transition Points per game, és True Shooting Percentage archetype-onként. Kutass VOD analysis-ben (ballchasing.com ekvivalens NBA 2K-hoz), scrim leak-ekben (Pace factor, shooting percentage trends), team chemistry tracker-ekben, Reddit/GameBattles insider információkban roster synergy-ról és practice intensity-ről. Figyelj a patch-specific meta changes-re: 3PT green window size (Contest vs Open), steals/blocks buff/nerf impact, badge system rework effects (Hot Zone Hunter vs Limitless Range efficiency), és MyCAREER build meta evolution. Elemezd LAN venue setup impact-ot (input lag compensation, monitor refresh rate), match stamina management-et (concentration drop-off quarter 4-ben), team communication quality-t (IGL shotcalling vs committee approach), és inter-conference latency advantages. Keress értékfogadásokat minimum 54% valószínűséggel: match winners (consider head-to-head archetype matchups), quarter/half handicap scenarios, combined points over/under (pace-adjusted), individual player performance props (points, rebounds, assists per archetype), MVP probability markets, tournament outright advancement, first quarter leadership, és live betting momentum opportunities (comeback potential assessment). A végén adj strategic NBA 2K League tippeket comprehensive lineup analysis, usage rate optimization, patch adaptation assessment, és team chemistry evaluation supporting-gal." },
        rocket_league: { name: "Rocket League", icon: '🚀', category: 'esports', title: "Rocket League RLCS Strat & Momentum Prompt", prompt: "Gondolkodj úgy, mint egy RLCS elemző és mechanika szakértő. Elemezd a csapatok kickoff-stratégiáit (cheat vs wait), boost-menedzsmentjét, double-commit rátáját, és solo-play képességét. Kutass ballchasing.com statokban (possession, shots/goal), scrim pletykákban, Twitter klippekben az új mechanics (reset-chains, double flip) kihasználásáról. Figyelj a regionális ping különbségekre és LAN-idegi tényezőkre. Keress értékfogadásokat 53%+ valószínűséggel series winner, exact score, total goals O/U, és first goal piacokon. Adj stratégiai tippeket replay elemzéssel alátámasztva." },
        winter_sports: { name: "Téli Sportok", icon: '❄️', category: 'winter', title: "Téli Sportok Comprehensive Multi-Discipline Elemzési Prompt", prompt: "Viselkedj úgy, mint egy téli sportok multi-discipline expert, aki 20+ éve elemzi a világkupákat, Olimpiákat és világbajnokságokat minden téli sportágban. ALPESI SÍ: Elemezd a pályaprofilokat (meredekség %, gate-szám, jeges vs puha szakaszok), időmérő vs slalom vs óriás-slalom vs lesiklás különbségeket, síelők downhill vs technical event specializációját. SÍUGRÁS: Vizsgáld a sánc K-pontját, széljárási viszonyokat (headwind vs tailwind impact), ugrók flight style-ját (V-style optimalizáció), landing teljesítményt. SNOWBOARDING: Halfpipe scoring criteria (amplitude, variety, execution), slopestyle course setup, parallel giant slalom head-to-head battle analysis. MŰKORCSOLYA: Technical elements scoring (quads vs triples difficulty), artistic impression vs technical merit balance, short program vs free skate specialization. GYORSKORCSOLYA: Distance specialization analysis (sprint 500m vs middle 1500m vs long 5000m/10000m), altitude training advantages, ice surface conditions (indoor vs outdoor tracks). Kutass FIS/ISU/IBU adatbázisokban, wax-team jelentésekben, edzői interjúkban felszerelés optimalizációról (ski wax temperature profiles, skate blade sharpening, snowboard edge tuning). Figyelj venue-specific factors-ra (altitude 1000m+ advantages, wind patterns, snow quality analysis), seasonal peak timing patterns-ra, injury comeback progressions-ra. Keress értékfogadásokat minimum 52% valószínűséggel: event winners, podium predictions, head-to-head matchups, performance over/under targets (jump distance, skating times, scoring points), season-long crystal globe winners, Olympic medal predictions. Adj sport-specific strategic analysis supporting equipment optimization, weather impact assessment, és athlete specialization advantages." },
        chess: { name: "Sakk", icon: '♟️', category: 'logic', title: "Sakk Világbajnokság & Rapid/Blitz Elemzési Prompt", prompt: "Viselkedj úgy, mint egy FIDE-rated sakkfogadási szakértő és chess.com/lichess analytics expert 12+ éves tapasztalattal. Elemezd a top grandmasterek aktuális formáját: Elo-rating progression curves, opening repertoire changes, endgame technique precision, és time pressure performance patterns. Kutass ChessBase databases-ben, chess.com tournaments statokban, Twitch chess streams-ben (Hikaru, Magnus insights), és FIDE rating reports-ban olyan információkért, mint recent tournament results, opening preparation depth, blunder rate analysis, vagy physical stamina under time pressure. Figyelj különösen a format-specific performance-re (Classical vs Rapid vs Blitz adaptability), opening novelty surprises-ra, psychological pressure handling-re, és tournament schedule fatigue management-re. Keress értékfogadásokat minimum 55% valószínűséggel match winners, exact game count, first decisive game, tournament advancement odds, és performance rating over/under piacokban. Elemezd a head-to-head historical results-ot, opening choice psychology-t, endgame specialization advantages-t, és clutch performance under elimination pressure. A végén adj strategic chess betting tippeket comprehensive player analysis, opening theory assessment, és psychological resilience evaluation supporting-gal." },
        greyhound_racing: { name: "Agárverseny", icon: '🐶', category: 'traditional', title: "Agárverseny Professional Form & Track Analysis Prompt", prompt: "Gondolkodj úgy, mint egy greyhound racing handicapper és track specialist 18+ éves tapasztalattal. Elemezd a kutyák recent form analysis-ét: sectional times, box draw bias, track condition preferences (fast vs slow), és distance optimization patterns. Kutass racing databases-ben (Greyhound-Data, Timeform Greyhounds), trainer reports-ban, kennel insider information-ben olyan adatokért, mint weight changes, injury recovery status, seasonal form cycles, vagy dietary/training regimen modifications. Figyelj különösen a track-specific factors-ra (rail bias, weather impact on track surface), grade class movements-re, trap speed analysis-ra (early vs late pace), és inter-track form translation-re. Keress értékfogadásokat minimum 53% valószínűséggel win odds, place/show betting, exacta/trifecta combinations, trap challenges, és season-long futures piacokban. Elemezd a trainer strike rates-et, sectional speed progression-t, box position advantages-t, és field size optimization effects. A végén adj professional greyhound tippeket comprehensive form study, track bias assessment, és value betting identification supporting-gal." },
        curling: { name: "Curling", icon: '🥌', category: 'winter', title: "Curling World Championship & Olympic Strategy Prompt", prompt: "Viselkedj úgy, mint egy curling tactical analyst és World Curling Championship betting expert 14+ éves tapasztalattal. Elemezd a teams shot-making precision: delivery consistency percentages, sweeping effectiveness metrics, weight control accuracy, és strategic shot selection patterns. Kutass World Curling Federation statistics-ben, team social media updates-ben, coaching interviews-ban olyan információkért, mint ice reading abilities, pressure performance under crowd noise, travel schedule adaptation, vagy team chemistry dynamics. Figyelj különösen az ice condition variables-ra (speed, curl amount, pebble texture), draw weight consistency-re, takeout power control-ra, és end management psychology-ra. Keress értékfogadásokat minimum 52% valószínűséggel match winners, total points over/under, blank end frequency, steal opportunities converted, és tournament advancement odds piacokban. Elemezd a lead/second/third/skip role efficiency-t, hammer advantage utilization-t, defensive vs aggressive strategy effectiveness-t, és clutch performance in must-win scenarios. A végén adj strategic curling tippeket comprehensive team analysis, ice adaptation assessment, és tactical execution evaluation supporting-gal." },
        afl: { name: "AFL", icon: '🏉', category: 'traditional', title: "Australian Football League Advanced Analytics Prompt", prompt: "Viselkedj úgy, mint egy AFL Champion Data analyst és professional punter 16+ éves tapasztalattal. Elemezd a teams comprehensive performance metrics-eit: Inside-50 efficiency rates, Contested/Uncontested Possession ratios, Clearance win percentages, Disposal Efficiency under pressure, Pressure Acts per game, Time in Forward Half statistics, és Expected Score (xScore) modeling algorithms. Kutass AFL Tables databases-ben, FootyWire advanced stats-ban, insider AFL media reports-ban (AFL.com.au, Fox Footy) olyan információkért, mint injury list updates, player role changes, weather forecast implications, vagy interstate travel fatigue factors. Figyelj különösen a venue-specific advantages-ra (MCG vs smaller grounds), umpire interpretation tendencies-re, team tactical evolution-re (zone defense vs man-on-man), és late-season motivation factors-ra (finals positioning vs draft lottery). Keress értékfogadásokat minimum 54% valószínűséggel head-to-head winners, handicap line betting, total points over/under, first goal scorer, quarter/half betting, individual player performance props (disposals, goals, marks), és live betting momentum identification piacokban. Elemezd a forward line functionality-t, midfield rotation effectiveness-t, defensive pressure coordination-t, és percentage implications for finals positioning. A végén adj strategic AFL tippeket comprehensive statistical modeling, tactical matchup assessment, és value identification in Betfair/TAB markets supporting-gal." },
        bowling: { name: "Bowling", icon: '🎳', category: 'precision', title: "Professional Bowling PBA Tour Elemzési Prompt", prompt: "Viselkedj úgy, mint egy PBA Tour analytics expert és professional bowling betting specialist 18+ éves tapasztalattal. Elemezd a bowlerek lane condition adaptation képességeit: oil pattern reading (house vs sport patterns), ball selection optimization (coverstock vs core dynamics), rev rate vs axis tilt adjustments, és split conversion percentages. Kutass PBA Tour statistics-ben, bowling forums-on (BowlingDigital, PBA.com), pro shop insights-ban olyan információkért, mint equipment changes, injury comeback status, recent practice game footage, vagy lane transition adaptation strategies. Figyelj különösen a tournament format differences-re (match play vs position rounds), television finals pressure performance-ra, oil pattern breakdown evolution-ra (early vs late squad advantages), és venue-specific lane characteristics-ra. Keress értékfogadásokat minimum 54% valószínűséggel: tournament winners, head-to-head match outcomes, qualifying position predictions, game score over/under targets, perfect game probability, total pins achievements, és stepladder final advancement odds. Elemezd a mental game resilience-t under TV pressure, spare shooting consistency-t, strike percentage trends-et, és tactical ball choice decisions. A végén adj strategic bowling tippeket comprehensive lane play analysis, equipment optimization assessment, és psychological pressure performance prediction supporting-gal." },
        speedway: { name: "Speedway", icon: '🏍️', category: 'motor', title: "Speedway Grand Prix & Elite League Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy speedway racing expert és SGP/Ekstraliga betting specialist 20+ éves tapasztalattal. Elemezd a riders track-specific setup preferences: gear ratio optimization (short vs long tracks), tyre compound selection, clutch/carburetor tuning, és gate position start statistics. Kutass speedway databases-ben (Speedway GP official, Polish Ekstraliga stats), rider social media updates-ben, mechanic insights-ban olyan információkért, mint engine tuning modifications, injury recovery progress, team equipment sharing agreements, vagy weather adaptation strategies. Figyelj különösen a track surface conditions-re (loose vs grippy dirt), gate draw bias analysis-ra (inside vs outside gates), meeting format implications-re (heat vs semi-final vs final pressure), és international vs domestic league form translation-ra. Keress értékfogadásokat minimum 55% valószínűséggel: meeting winners, heat race outcomes, qualifying position predictions, total points achievements, fastest time betting, rider head-to-head matchups, és season championship odds. Elemezd a tactical riding styles-t (gating vs passing ability), mental resilience under pressure-t, equipment reliability factors-t, és track surface evolution impact. A végén adj strategic speedway tippeket comprehensive track analysis, setup optimization assessment, és rider specialization evaluation supporting-gal." },
        futsal: { name: "Futsal", icon: '⚽', category: 'traditional', title: "FIFA Futsal World Cup & Liga Nacional Elemzési Prompt", prompt: "Viselkedj úgy, mint egy futsal tactical expert és international futsal betting specialist 16+ éves tapasztalattal. Elemezd a teams playing systems-eit: 3-1 vs 4-0 defensive formation effectiveness, pivot rotation strategies, pressing intensity patterns, és goalkeeper distribution accuracy. Kutass FIFA Futsal databases-ben, continental confederation statistics-ben, team official communications-ben olyan információkért, mint tactical preparation methods, player rotation policies, court surface adaptation strategies, vagy tournament schedule management approaches. Figyelj különösen a court dimensions impact-ra (different venue sizes), referee interpretation tendencies-re (accumulated fouls penalties), substitution strategy optimization-ra (flying goalkeeper tactics), és international vs domestic league tactical differences-re. Keress értékfogadásokat minimum 53% valószínűséggel: match winners, handicap betting, total goals over/under, first goal scorer, half-time/full-time results, individual player performance props (goals, assists), és tournament progression probabilities. Elemezd a technical skill execution-t under pressure, counter-attack conversion efficiency-t, set piece specialization-t, és mental resilience in high-intensity environments. A végén adj strategic futsal tippeket comprehensive tactical analysis, court adaptation assessment, és player technical skill evaluation supporting-gal." },
        beach_volleyball: { name: "Strandröplabda", icon: '🏐', category: 'water', title: "FIVB Beach Volleyball World Tour Elemzési Prompt", prompt: "Légy egy FIVB Beach Volleyball World Tour expert és professional beach volleyball betting specialist 15+ éves tapasztalattal. Elemezd a pairs tactical chemistry-jét: serve/receive specialization roles, attack approach variety (line vs cross-court), defensive court coverage systems, és wind condition adaptation abilities. Kutass FIVB official statistics-ben, Beach Volleyball Major Series results-ben, player social media training updates-ben olyan információkért, mint partnership chemistry development, injury management strategies, sand surface adaptation techniques, vagy tournament travel fatigue factors. Figyelj különösen a weather conditions impact-ra (wind speed/direction, temperature effects), court surface variations-re (soft vs hard sand), tournament format psychology-ra (pool play vs elimination), és regional playing style differences-re (European vs South American vs Asian approaches). Keress értékfogadásokat minimum 52% valószínűséggel: match winners, set betting outcomes, total points over/under, first set winners, tournament advancement odds, head-to-head pair matchups, és season ranking position predictions. Elemezd a serve pressure effectiveness-t, sideout efficiency percentages-t, transition attack success rates-et, és mental toughness under outdoor elements. A végén adj strategic beach volleyball tippeket comprehensive partnership analysis, weather adaptation assessment, és tactical execution evaluation supporting-gal." },
        squash: { name: "Squash", icon: '🏸', category: 'precision', title: "PSA World Tour & WSA Championships Elemzési Prompt", prompt: "Viselkedj úgy, mint egy squash PSA World Tour analyst és professional squash betting expert 17+ éves tapasztalattal. Elemezd a players court movement efficiency-jét: retrieval speed patterns, shot selection variety (length vs width vs drop shots), court positioning strategy, és endurance performance curves over 5-set matches. Kutass PSA/WSA official rankings-ben, SquashSite analysis-ben, player coaching insights-ban olyan információkért, mint technical coaching changes, injury rehabilitation progress, racket/string setup modifications, vagy court surface adaptation strategies. Figyelj különösen a court temperature/humidity impact-ra, glass court vs traditional court adaptation-ra, tournament format mental demands-re (best of 3 vs best of 5), és playing style matchup dynamics-ra (power vs placement vs pace variation). Keress értékfogadásokat minimum 53% valószínűséggel: match winners, exact game count predictions, total points over/under, first game winners, tournament progression odds, head-to-head rivalry outcomes, és season ranking finale positions. Elemezd a tactical shot construction-t, physical conditioning advantages-t, mental resilience under pressure rallies-t, és court awareness spatial intelligence. A végén adj strategic squash tippeket comprehensive movement analysis, tactical adaptation assessment, és physical endurance evaluation supporting-gal." },
        field_hockey: { name: "Gyeplabda", icon: '🏑', category: 'traditional', title: "FIH Hockey World Cup & Pro League Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy FIH Hockey World Cup tactical expert és international field hockey betting specialist 19+ éves tapasztalattal. Elemezd a teams system execution-jét: penalty corner conversion rates, high press defensive intensity, circle penetration effectiveness, és goalkeeper save percentage analytics. Kutass FIH official statistics-ben, continental championship results-ben, team coaching staff communications-ben olyan információkért, mint tactical preparation innovations, player position flexibility, pitch surface adaptation strategies, vagy tournament periodization approaches. Figyelj különösen a pitch condition variables-ra (water-based vs sand-based turf), weather impact assessment-ra (rain vs dry conditions), umpire interpretation consistency-ra, és international vs domestic league form translation-ra. Keress értékfogadásokat minimum 54% valószínűséggel: match winners, handicap betting scenarios, total goals over/under, first goal scorer markets, penalty corner success rates, quarter/half betting options, és tournament bracket advancement probabilities. Elemezd a set piece execution mastery-t, transition attack speed-et, defensive structure organization-t, és mental toughness under major tournament pressure. A végén adj strategic field hockey tippeket comprehensive tactical system analysis, surface adaptation assessment, és team chemistry evaluation supporting-gal." },
        rugby_union: { name: "Rögbi Union", icon: '🏉', category: 'traditional', title: "Rugby World Cup & Six Nations Union Elemzési Prompt", prompt: "Viselkedj úgy, mint egy Rugby World Cup specialist és Six Nations betting expert 22+ éves tapasztalattal. Elemezd a teams forward pack dominance metrics-eit: scrum success percentages, lineout accuracy rates, ruck ball retention efficiency, és maul advancement statistics. Kutass World Rugby databases-ben, Six Nations official communications-ben, team management insights-ban olyan információkért, mint player availability updates, tactical system modifications, venue-specific preparation methods, vagy injury comeback timelines. Figyelj különösen a forward vs backline balance optimization-ra, kicking strategy execution-ra (territory vs points approach), referee interpretation impact-ra, és home advantage quantification-ra. Keress értékfogadásokat minimum 55% valószínűséggel: match winners, handicap point spreads, total points over/under, first try scorer odds, yellow/red card predictions, tournament winner markets, és Grand Slam achievement probabilities. Elemezd a set piece reliability under pressure-t, territorial control maintenance-t, bench impact in final quarters-t, és championship experience advantages. A végén adj strategic rugby union tippeket comprehensive forward pack analysis, tactical execution assessment, és tournament pressure performance prediction supporting-gal." },
        greyhound_racing: { name: "Agárverseny", icon: '🐶', category: 'traditional', title: "Agárverseny Professional Form & Track Analysis Prompt", prompt: "Gondolkodj úgy, mint egy greyhound racing handicapper és track specialist 18+ éves tapasztalattal. Elemezd a kutyák recent form analysis-ét: sectional times, box draw bias, track condition preferences (fast vs slow), és distance optimization patterns. Kutass racing databases-ben (Greyhound-Data, Timeform Greyhounds), trainer reports-ban, kennel insider information-ben olyan adatokért, mint weight changes, injury recovery status, seasonal form cycles, vagy dietary/training regimen modifications. Figyelj különösen a track-specific factors-ra (rail bias, weather impact on track surface), grade class movements-re, trap speed analysis-ra (early vs late pace), és inter-track form translation-re. Keress értékfogadásokat minimum 53% valószínűséggel win odds, place/show betting, exacta/trifecta combinations, trap challenges, és season-long futures piacokban. Elemezd a trainer strike rates-et, sectional speed progression-t, box position advantages-t, és field size optimization effects. A végén adj professional greyhound tippeket comprehensive form study, track bias assessment, és value betting identification supporting-gal." },
        curling: { name: "Curling", icon: '🥌', category: 'winter', title: "Curling World Championship & Olympic Strategy Prompt", prompt: "Viselkedj úgy, mint egy curling tactical analyst és World Curling Championship betting expert 14+ éves tapasztalattal. Elemezd a teams shot-making precision: delivery consistency percentages, sweeping effectiveness metrics, weight control accuracy, és strategic shot selection patterns. Kutass World Curling Federation statistics-ben, team social media updates-ben, coaching interviews-ban olyan információkért, mint ice reading abilities, pressure performance under crowd noise, travel schedule adaptation, vagy team chemistry dynamics. Figyelj különösen az ice condition variables-ra (speed, curl amount, pebble texture), draw weight consistency-re, takeout power control-ra, és end management psychology-ra. Keress értékfogadásokat minimum 52% valószínűséggel match winners, total points over/under, blank end frequency, steal opportunities converted, és tournament advancement odds piacokban. Elemezd a lead/second/third/skip role efficiency-t, hammer advantage utilization-t, defensive vs aggressive strategy effectiveness-t, és clutch performance in must-win scenarios. A végén adj strategic curling tippeket comprehensive team analysis, ice adaptation assessment, és tactical execution evaluation supporting-gal." },
        afl: { name: "AFL", icon: '🏉', category: 'traditional', title: "Australian Football League Advanced Analytics Prompt", prompt: "Viselkedj úgy, mint egy AFL Champion Data analyst és professional punter 16+ éves tapasztalattal. Elemezd a teams comprehensive performance metrics-eit: Inside-50 efficiency rates, Contested/Uncontested Possession ratios, Clearance win percentages, Disposal Efficiency under pressure, Pressure Acts per game, Time in Forward Half statistics, és Expected Score (xScore) modeling algorithms. Kutass AFL Tables databases-ben, FootyWire advanced stats-ban, insider AFL media reports-ban (AFL.com.au, Fox Footy) olyan információkért, mint injury list updates, player role changes, weather forecast implications, vagy interstate travel fatigue factors. Figyelj különösen a venue-specific advantages-ra (MCG vs smaller grounds), umpire interpretation tendencies-re, team tactical evolution-re (zone defense vs man-on-man), és late-season motivation factors-ra (finals positioning vs draft lottery). Keress értékfogadásokat minimum 54% valószínűséggel head-to-head winners, handicap line betting, total points over/under, first goal scorer, quarter/half betting, individual player performance props (disposals, goals, marks), és live betting momentum identification piacokban. Elemezd a forward line functionality-t, midfield rotation effectiveness-t, defensive pressure coordination-t, és percentage implications for finals positioning. A végén adj strategic AFL tippeket comprehensive statistical modeling, tactical matchup assessment, és value identification in Betfair/TAB markets supporting-gal." },
        bowling: { name: "Bowling", icon: '🎳', category: 'precision', title: "Professional Bowling PBA Tour Elemzési Prompt", prompt: "Viselkedj úgy, mint egy PBA Tour analytics expert és professional bowling betting specialist 18+ éves tapasztalattal. Elemezd a bowlerek lane condition adaptation képességeit: oil pattern reading (house vs sport patterns), ball selection optimization (coverstock vs core dynamics), rev rate vs axis tilt adjustments, és split conversion percentages. Kutass PBA Tour statistics-ben, bowling forums-on (BowlingDigital, PBA.com), pro shop insights-ban olyan információkért, mint equipment changes, injury comeback status, recent practice game footage, vagy lane transition adaptation strategies. Figyelj különösen a tournament format differences-re (match play vs position rounds), television finals pressure performance-ra, oil pattern breakdown evolution-ra (early vs late squad advantages), és venue-specific lane characteristics-ra. Keress értékfogadásokat minimum 54% valószínűséggel: tournament winners, head-to-head match outcomes, qualifying position predictions, game score over/under targets, perfect game probability, total pins achievements, és stepladder final advancement odds. Elemezd a mental game resilience-t under TV pressure, spare shooting consistency-t, strike percentage trends-et, és tactical ball choice decisions. A végén adj strategic bowling tippeket comprehensive lane play analysis, equipment optimization assessment, és psychological pressure performance prediction supporting-gal." },
        speedway: { name: "Speedway", icon: '🏍️', category: 'motor', title: "Speedway Grand Prix & Elite League Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy speedway racing expert és SGP/Ekstraliga betting specialist 20+ éves tapasztalattal. Elemezd a riders track-specific setup preferences: gear ratio optimization (short vs long tracks), tyre compound selection, clutch/carburetor tuning, és gate position start statistics. Kutass speedway databases-ben (Speedway GP official, Polish Ekstraliga stats), rider social media updates-ben, mechanic insights-ban olyan információkért, mint engine tuning modifications, injury recovery progress, team equipment sharing agreements, vagy weather adaptation strategies. Figyelj különösen a track surface conditions-re (loose vs grippy dirt), gate draw bias analysis-ra (inside vs outside gates), meeting format implications-re (heat vs semi-final vs final pressure), és international vs domestic league form translation-ra. Keress értékfogadásokat minimum 55% valószínűséggel: meeting winners, heat race outcomes, qualifying position predictions, total points achievements, fastest time betting, rider head-to-head matchups, és season championship odds. Elemezd a tactical riding styles-t (gating vs passing ability), mental resilience under pressure-t, equipment reliability factors-t, és track surface evolution impact. A végén adj strategic speedway tippeket comprehensive track analysis, setup optimization assessment, és rider specialization evaluation supporting-gal." },
        futsal: { name: "Futsal", icon: '⚽', category: 'traditional', title: "FIFA Futsal World Cup & Liga Nacional Elemzési Prompt", prompt: "Viselkedj úgy, mint egy futsal tactical expert és international futsal betting specialist 16+ éves tapasztalattal. Elemezd a teams playing systems-eit: 3-1 vs 4-0 defensive formation effectiveness, pivot rotation strategies, pressing intensity patterns, és goalkeeper distribution accuracy. Kutass FIFA Futsal databases-ben, continental confederation statistics-ben, team official communications-ben olyan információkért, mint tactical preparation methods, player rotation policies, court surface adaptation strategies, vagy tournament schedule management approaches. Figyelj különösen a court dimensions impact-ra (different venue sizes), referee interpretation tendencies-re (accumulated fouls penalties), substitution strategy optimization-ra (flying goalkeeper tactics), és international vs domestic league tactical differences-re. Keress értékfogadásokat minimum 53% valószínűséggel: match winners, handicap betting, total goals over/under, first goal scorer, half-time/full-time results, individual player performance props (goals, assists), és tournament progression probabilities. Elemezd a technical skill execution-t under pressure, counter-attack conversion efficiency-t, set piece specialization-t, és mental resilience in high-intensity environments. A végén adj strategic futsal tippeket comprehensive tactical analysis, court adaptation assessment, és player technical skill evaluation supporting-gal." },
        beach_volleyball: { name: "Strandröplabda", icon: '🏐', category: 'water', title: "FIVB Beach Volleyball World Tour Elemzési Prompt", prompt: "Légy egy FIVB Beach Volleyball World Tour expert és professional beach volleyball betting specialist 15+ éves tapasztalattal. Elemezd a pairs tactical chemistry-jét: serve/receive specialization roles, attack approach variety (line vs cross-court), defensive court coverage systems, és wind condition adaptation abilities. Kutass FIVB official statistics-ben, Beach Volleyball Major Series results-ben, player social media training updates-ben olyan információkért, mint partnership chemistry development, injury management strategies, sand surface adaptation techniques, vagy tournament travel fatigue factors. Figyelj különösen a weather conditions impact-ra (wind speed/direction, temperature effects), court surface variations-re (soft vs hard sand), tournament format psychology-ra (pool play vs elimination), és regional playing style differences-re (European vs South American vs Asian approaches). Keress értékfogadásokat minimum 52% valószínűséggel: match winners, set betting outcomes, total points over/under, first set winners, tournament advancement odds, head-to-head pair matchups, és season ranking position predictions. Elemezd a serve pressure effectiveness-t, sideout efficiency percentages-t, transition attack success rates-et, és mental toughness under outdoor elements. A végén adj strategic beach volleyball tippeket comprehensive partnership analysis, weather adaptation assessment, és tactical execution evaluation supporting-gal." },
        squash: { name: "Squash", icon: '🏸', category: 'precision', title: "PSA World Tour & WSA Championships Elemzési Prompt", prompt: "Viselkedj úgy, mint egy squash PSA World Tour analyst és professional squash betting expert 17+ éves tapasztalattal. Elemezd a players court movement efficiency-jét: retrieval speed patterns, shot selection variety (length vs width vs drop shots), court positioning strategy, és endurance performance curves over 5-set matches. Kutass PSA/WSA official rankings-ben, SquashSite analysis-ben, player coaching insights-ban olyan információkért, mint technical coaching changes, injury rehabilitation progress, racket/string setup modifications, vagy court surface adaptation strategies. Figyelj különösen a court temperature/humidity impact-ra, glass court vs traditional court adaptation-ra, tournament format mental demands-re (best of 3 vs best of 5), és playing style matchup dynamics-ra (power vs placement vs pace variation). Keress értékfogadásokat minimum 53% valószínűséggel: match winners, exact game count predictions, total points over/under, first game winners, tournament progression odds, head-to-head rivalry outcomes, és season ranking finale positions. Elemezd a tactical shot construction-t, physical conditioning advantages-t, mental resilience under pressure rallies-t, és court awareness spatial intelligence. A végén adj strategic squash tippeket comprehensive movement analysis, tactical adaptation assessment, és physical endurance evaluation supporting-gal." },
        field_hockey: { name: "Gyeplabda", icon: '🏑', category: 'traditional', title: "FIH Hockey World Cup & Pro League Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy FIH Hockey World Cup tactical expert és international field hockey betting specialist 19+ éves tapasztalattal. Elemezd a teams system execution-jét: penalty corner conversion rates, high press defensive intensity, circle penetration effectiveness, és goalkeeper save percentage analytics. Kutass FIH official statistics-ben, continental championship results-ben, team coaching staff communications-ben olyan információkért, mint tactical preparation innovations, player position flexibility, pitch surface adaptation strategies, vagy tournament periodization approaches. Figyelj különösen a pitch condition variables-ra (water-based vs sand-based turf), weather impact assessment-ra (rain vs dry conditions), umpire interpretation consistency-ra, és international vs domestic league form translation-ra. Keress értékfogadásokat minimum 54% valószínűséggel: match winners, handicap betting scenarios, total goals over/under, first goal scorer markets, penalty corner success rates, quarter/half betting options, és tournament bracket advancement probabilities. Elemezd a set piece execution mastery-t, transition attack speed-et, defensive structure organization-t, és mental toughness under major tournament pressure. A végén adj strategic field hockey tippeket comprehensive tactical system analysis, surface adaptation assessment, és team chemistry evaluation supporting-gal." },
        rally: { name: "Rally", icon: '🚗', category: 'motor', title: "Rally VB & WRC Stratégiai Elemzési Prompt", prompt: "Viselkedj úgy, mint egy World Rally Championship (WRC) insider és rally-fogadási szakértő 15+ éves tapasztalattal. Elemezd a közelgő futamokat (murva, aszfalt, havas) minimum 1.90-es oddsokkal. Mérlegeld a pályák profilját: gyors szakaszok vs technikás hajtűk, szintkülönbségek, átlagsebesség. Vizsgáld a pilóták pályához igazított beállításait (futómű magasság, differenciál-térképek, gumikeverék). Kutass csapatrádiós szivárgásokban, szervizpark-interjúkban, DirtFish cikkekben, sebességmérő szakasz-időkben olyan információkért, mint motorcsomag-frissítések, erőátviteli gondok, vagy navigátor-hibák. Figyelj a weather-betétekre (trükkös eső, köd, hó), első rajtpozíció takarító hátrányára, és a power stage stratégiai pontjaira. Keress értékfogadásokat 54%+ becsült valószínűséggel szakasz-győztes, összetett dobogó, head-to-head pilóta párharc, power-stage leggyorsabb idő, és mechanical DNF piacokon. A végén adj adatvezérelt tippeket single és kombinált formában, részletes indoklással, beleértve a gumiválasztást és az időjárási forgatókönyveket." },
        overwatch2: { name: "Overwatch 2", icon: '🦾', category: 'esports', title: "Overwatch 2 OWL / Pro-Circuit Meta Elemzési Prompt", prompt: "Gondolkodj úgy, mint egy Overwatch League stratégiai coach és esport-fogadási guru. Elemezd a közelgő OWL, Contenders vagy nagy nemzetközi tornák BO5/BO7 meccseit minimum 1.90-es oddsokkal. Merülj el a legfrissebb patch meta-változásaiban (tank rework, új hősök, kit nerf/buff, map pool). Vizsgáld a csapatok hero-pool rugalmasságát (flex-tank ↔ dive-tank, hitscan ↔ projectile, Kiriko/Illari mastery), ult gazdaság-kezelését és fight-vízióját. Kutass scrim-leak discord szervereken, pro játékos streameken, stat-adatbázisokban (Overwatch League StatsLab) olyan információkért, mint szerepcsere-kísérletek, ping-hátrány, fatigue-kezelés, coaching-háttér. Figyelj a \"clutch\" support ult-időzítésekre, spawn-camp stratégiákra és map-függő comp-váltásokra. Keress value-fogadásokat 55%+ becsült valószínűséggel map-handicap, első térkép győztes, total kills O/U, és player propok (final blows, healing per 10). A végén adj konkrét single és kombi tippeket mély meta-indoklással." },
        call_of_duty: { name: "Call of Duty", icon: '🎮', category: 'esports', title: "Call of Duty CDL & Major Tournament Tactical Prompt", prompt: "Viselkedj úgy, mint egy Call of Duty League (CDL) elemző és versenyzői coach. Elemezd a közelgő CDL-állomás vagy Major bracket meccseit minimum 1.90 odds mellett. Mérd fel a csapatok hardpoint/ctrl/snd win-rate-jét map-szinten (respawn pacing vs slow-snd), a spawns-manipulation stratégiákat és a szerepkiosztás (main AR, flex, SMG entry, obj) hatékonyságát. Kutass VOD-reviewkban, BreakingPoint.gg statokban, pro subtweets-ben loadout/drill leakekért (GA-változások, muzzle nerf), utazási jet-lag hatásokért. Figyelj a ping-különbségekre online qualifiers során és a LAN clutch-tényezőre. Keress értékfogadásokat 54%+ becsült valószínűséggel sorozat-győztes, map-handicap, first blood bélyeg SND-ben, control round 5 igen/nem, és kill+assist propok. A végén adj stratégiát, egyértelmű match-ups breakdown-nal és momentum swing pontokkal." },
        kayak_canoe: { name: "Kajak-kenu", icon: '🚣', category: 'water', title: "Kajak-kenu Világkupa / Olimpiai Pálya Elemzési Prompt", prompt: "Légy egy ICF sprint-/slalom-szakág elemző és fogadási specialista. Elemezd a közelgő világkupa, EB, VB vagy olimpiai döntők futamait minimum 1.90-es oddsokkal. Vizsgáld az atléták stroke-rate görbéjét, start reaction-idejét, 100-, 250-, 500-, 1000-m splitjeit, hajótípusát (K-1/2/4, C-1/2) és pályasáv-előnyét (szél, hullámverés). Kutass edzői interjúkban, vízsebesség-szenzor adatban, Drone-felvételek videoanalízisében olyan faktorokért, mint lapátlap-szög-váltás, core stability injury, vagy edzőtábor magaslati-hatás. Figyelj a viharfront-befújásokra, hátszél vs ellenszél split-eltérésekre és az utolsó 50 m-es lactate burst-képességre. Keress értékfogadásokat 53%+ becsült valószínűséggel döntő győztes, érem-helyezés, futam-idő O/U, indulási reakció <0.15s, és országos érem-tábla fogadások. A végén adj részletes single & kombinált tippeket, biomechanikai és meteorológiai indoklással." },
        lacrosse: { name: "Lacrosse", icon: '🥍', category: 'traditional', title: "Lacrosse PLL/NCAA Advanced Analytics Prompt", prompt: "Viselkedj úgy, mint egy Premier Lacrosse League stat-guru és amerikai egyetemi (NCAA D1) scouting analyst. Elemezd a közelgő meccseket minimum 1.90 odds mellett. Használd a legfrissebb advanced metrics-et: shot-clock efficiency, adjusted offensive/defensive rating, face-off win%, ground-ball conversion, goalie save-quality (xSave%), transition pace. Kutass Inside Lacrosse cikkekben, huddle VOD-okban, twitter scouting riportokban olyan információkért, mint új \"invert\"-playbook, ride-pressure rendszer, sérült FOGO-specialisták, vagy hot-hand streak scorerek. Figyelj a weather (75%+ humidity – stick handle), műfű vs természetes fű labda-pattanás, és back-to-back hétvégi turné utak hatására. Keress value fogadást 52%+ becsült valószínűséggel spread, total goals O/U, first two-point goal igen/nem, face-off special bets, és MVP performance propok. Végül adj konkrét single + parlay tippet részletes taktikai és adat-alapú érveléssel." }
    };

    const PREFERRED_ORDER = ['football', 'basketball', 'tennis', 'ice_hockey'];
    const categoryNames = { 'traditional': 'Hagyományos', 'esports': 'E-Sports', 'motor': 'Motorsport', 'virtual': 'Virtuális', 'water': 'Vízi', 'precision': 'Precíziós', 'winter': 'Téli', 'logic': 'Logikai' };
    const specificMatchConfig = {
        football: {
            icon: '⚽',
            placeholder: 'pl. Barcelona vs Real Madrid'
        },
        basketball: {
            icon: '🏀', 
            placeholder: 'pl. Lakers vs Warriors'
        },
        tennis: {
            icon: '🎾',
            placeholder: 'pl. Djokovic vs Nadal'
        }
    };
    const sportAliases = {
        'football': ['foci', 'futball', 'football', 'soccer'],
        'basketball': ['kosár', 'kosar', 'basket', 'kosz', 'basketball'],
        'tennis': ['tenisz', 'tennis'],
        'ice_hockey': ['jégkorong', 'jegkorong', 'hockey', 'ice hockey'],
        'american_football': ['amerikai futball', 'nfl', 'american football'],
        'baseball': ['baseball', 'mlb'],
        'golf': ['golf'],
        'boxing': ['boksz', 'box', 'boxing'],
        'mma': ['mma', 'ufc', 'mixed martial arts'],
        'volleyball': ['röplabda', 'roplabda', 'volleyball', 'volley'],
        'handball': ['kézilabda', 'kezilabda', 'handball'],
        'rugby': ['rögbi', 'rogbi', 'rugby'],
        'cricket': ['krikett', 'cricket'],
        'athletics': ['atletika', 'athletics', 'futás', 'futas'],
        'swimming': ['úszás', 'uszas', 'swimming'],
        'water_polo': ['vízilabda', 'vizilabda', 'water polo'],
        'cycling': ['kerékpározás', 'kerekparozas', 'cycling', 'bicikli'],
        'table_tennis': ['asztalitenisz', 'ping pong', 'pingpong', 'table tennis'],
        'badminton': ['tollaslabda', 'badminton'],
        'darts': ['darts', 'nyilazás', 'nyilazas'],
        'snooker': ['snooker', 'biliárd', 'biliard'],
        'horse_racing': ['lóverseny', 'loverseny', 'horse racing'],
        'motor_general': ['motorsport', 'motor', 'autóverseny', 'autoverseny'],
        'formula1': ['forma-1', 'forma1', 'f1', 'formula 1', 'formula one'],
        'csgo': ['cs2', 'csgo', 'cs:go', 'counter-strike', 'counter strike'],
        'lol': ['lol', 'league of legends', 'league'],
        'dota2': ['dota', 'dota2', 'dota 2'],
        'valorant': ['valorant', 'val'],
        'virtual_sports': ['v-sport', 'vsport', 'virtual', 'virtuális'],
        'motogp': ['motogp', 'gp motor', 'motor gp'],
        'nascar': ['nascar', 'stock car'],
        'fifa_esports': ['fifa', 'fifa esports', 'ea sports fc'],
        'nba2k': ['nba2k', 'nba 2k', '2k league'],
        'rocket_league': ['rocket league', 'rlcs'],
        'winter_sports': ['téli', 'téli sport', 'ski', 'biathlon', 'alpesi si', 'siugras', 'snowboard', 'mukorcsolya', 'gyorskorcsolya'],
                    'chess': ['sakk', 'chess', 'sach'],
            'greyhound_racing': ['agár', 'agar', 'greyhound', 'kutya verseny'],
            'curling': ['curling', 'körlabda'],
            'afl': ['afl', 'australian football', 'aussie rules'],
            'bowling': ['bowling', 'teke', 'bábozás'],
            'speedway': ['speedway', 'salakmotor', 'salak motor'],
            'futsal': ['futsal', 'teremfoci', 'terem foci'],
            'beach_volleyball': ['strandröplabda', 'strand röplabda', 'beach volleyball', 'beach volley'],
            'squash': ['squash', 'fallabda'],
            'field_hockey': ['gyeplabda', 'gyep labda', 'field hockey', 'hockey'],
            'rugby_union': ['rögbi union', 'rogbi union', 'rugby union', 'union rugby'],
            'rally': ['rally', 'rally vb', 'rally wrc'],
            'overwatch2': ['overwatch 2', 'overwatch 2 owl', 'overwatch 2 pro-circuit'],
            'call_of_duty': ['call of duty', 'call of duty cdl', 'call of duty major'],
            'kayak_canoe': ['kajak-kenu', 'kajak-kenu világkupa', 'kajak-kenu olimpiai pálya'],
            'lacrosse': ['lacrosse', 'lacrosse pll', 'lacrosse ncaa']
        };
    const MOBILE_LAZY_LOAD_COUNT = 4;

    // --- STATE ---
    let appData = {};
    let favorites = [];
    let copyCounters = {}; // Másolás számlálók
    let effectivenessValues = {}; // Hatékonysági értékek
    let selectedSportCard = null;
    let currentFilter = 'all';
    let currentlySelectedKey = null;
    let mobileVisibleCount = MOBILE_LAZY_LOAD_COUNT;
    let mobileObserver = null;

    // --- DOM ELEMENTS ---
    const elements = {
        body: document.body,
        sportsGrid: document.getElementById('sports-grid'),
        promptContainer: document.getElementById('prompt-container'),
        promptTitle: document.getElementById('prompt-title'),
        promptCategory: document.getElementById('prompt-category'),
        promptText: document.getElementById('prompt-text'),
        copyButton: document.getElementById('copy-button'),
        copyFeedback: document.getElementById('copy-feedback'),
        copyTextSpan: document.getElementById('copy-text'),
        searchInput: document.getElementById('search-input'),
        categoryFilters: document.querySelectorAll('.category-filter'),
        closePromptButton: document.getElementById('close-prompt-button'),
        noResultsMessage: document.getElementById('no-results'),
        pageTop: document.getElementById('page-top'),
        editButton: document.getElementById('edit-button'),
        addNewPromptBtn: document.getElementById('add-new-prompt-btn'),
        // Edit Modal
        editModal: document.getElementById('edit-modal'),
        modalTitle: document.getElementById('modal-title'),
        editForm: document.getElementById('edit-form'),
        editKey: document.getElementById('edit-key'),
        editName: document.getElementById('edit-name'),
        editIcon: document.getElementById('edit-icon'),
        editCategory: document.getElementById('edit-category'),
        editPromptTitle: document.getElementById('edit-prompt-title'),
        editPrompt: document.getElementById('edit-prompt'),
        cancelEditBtn: document.getElementById('cancel-edit-btn'),
        // Alert Modal
        alertModal: document.getElementById('alert-modal'),
        alertModalTitle: document.getElementById('alert-modal-title'),
        alertModalMessage: document.getElementById('alert-modal-message'),
        alertModalButtons: document.getElementById('alert-modal-buttons'),
        // Tools
        toolsSection: document.getElementById('tools-section'),
        toolsInline: document.getElementById('tools-inline'),
        exportBtn: document.getElementById('export-btn'),
        importInput: document.getElementById('import-input'),
        resetBtn: document.getElementById('reset-btn'),
        exportBtnInline: document.getElementById('export-btn-inline'),
        importInputInline: document.getElementById('import-input-inline'),
        resetBtnInline: document.getElementById('reset-btn-inline'),
        // Theme
        themeToggle: document.getElementById('theme-toggle'),
        themeIcon: document.getElementById('theme-icon'),
        // Lazy Load
        loadMoreSentinel: document.getElementById('load-more-sentinel'),
        // Hatékonysági csúszka
        effectivenessSlider: document.getElementById('effectiveness-slider'),
        effectivenessValue: document.getElementById('effectiveness-value'),
        // Konkrét mérkőzés opciók
        specificMatchOptions: document.getElementById('specific-match-options'),
        specificMatchCheckbox: document.getElementById('specific-match-checkbox'),
        matchInputContainer: document.getElementById('match-input-container'),
        specificMatchInput: document.getElementById('specific-match-input'),
        specificDateCheckbox: document.getElementById('specific-date-checkbox'),
        dateInputContainer: document.getElementById('date-input-container'),
        specificDateInput: document.getElementById('specific-date-input'),
        sportIcon: document.getElementById('sport-icon')
    };

    // --- COPY COUNTER & EFFECTIVENESS FUNCTIONS ---
    const loadCopyCounters = () => {
        copyCounters = JSON.parse(localStorage.getItem('promptCopyCounters')) || {};
    };

    const saveCopyCounters = () => {
        localStorage.setItem('promptCopyCounters', JSON.stringify(copyCounters));
    };

    const loadEffectivenessValues = () => {
        effectivenessValues = JSON.parse(localStorage.getItem('promptEffectiveness')) || {};
    };

    const saveEffectivenessValues = () => {
        localStorage.setItem('promptEffectiveness', JSON.stringify(effectivenessValues));
    };

    const incrementCopyCounter = (key) => {
        copyCounters[key] = (copyCounters[key] || 0) + 1;
        saveCopyCounters();
        renderSportsCards(); // Újrarendezés
    };

    const getCopyCount = (key) => copyCounters[key] || 0;

    const getEffectiveness = (key) => effectivenessValues[key] || 75;

    const setEffectiveness = (key, value) => {
        effectivenessValues[key] = value;
        saveEffectivenessValues();
    };

    // --- DATA HANDLING (LOCALSTORAGE) ---
    const loadData = () => {
        const storedData = JSON.parse(localStorage.getItem('customSportsData')) || {};
        const storedFavorites = JSON.parse(localStorage.getItem('sportsFavorites')) || [];
        appData = { ...JSON.parse(JSON.stringify(defaultSportsData)), ...storedData };
        favorites = storedFavorites;
        loadCopyCounters();
        loadEffectivenessValues();
    };

    const saveData = () => {
        const customData = {};
        Object.keys(appData).forEach(key => {
            if (!defaultSportsData[key] || JSON.stringify(defaultSportsData[key]) !== JSON.stringify(appData[key])) {
                customData[key] = appData[key];
            }
        });
        localStorage.setItem('customSportsData', JSON.stringify(customData));
    };

    const saveFavorites = () => localStorage.setItem('sportsFavorites', JSON.stringify(favorites));

    // --- UI RENDERING ---
    const isMobile = () => window.innerWidth <= 768;

    const renderSportsCards = (isInitial = false) => {
        const searchTerm = elements.searchInput.value.toLowerCase().trim();
        
        const filteredKeys = Object.keys(appData).filter(key => {
            const sport = appData[key];
            let matchesSearch = sport.name.toLowerCase().includes(searchTerm) || (sportAliases[key] && sportAliases[key].some(alias => alias.toLowerCase().includes(searchTerm)));
            if (currentFilter === 'all') return matchesSearch;
            if (currentFilter === 'favorites') return matchesSearch && favorites.includes(key);
            return matchesSearch && sport.category === currentFilter;
        });

        // MÁSOLÁS SZÁMLÁLÓ ALAPJÁN RENDEZÉS
        const sortedKeys = filteredKeys.sort((a, b) => {
            // Először másolási szám szerint (csökkenő)
            const aCopyCount = getCopyCount(a);
            const bCopyCount = getCopyCount(b);
            if (aCopyCount !== bCopyCount) return bCopyCount - aCopyCount;
            
            // Másodsorban preferred order
            const aIndex = PREFERRED_ORDER.indexOf(a);
            const bIndex = PREFERRED_ORDER.indexOf(b);
            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            
            // Végül név szerint
            return appData[a].name.localeCompare(appData[b].name);
        });
        
        elements.sportsGrid.innerHTML = '';
        
        const keysToShow = isMobile() ? sortedKeys.slice(0, mobileVisibleCount) : sortedKeys;

        if (keysToShow.length === 0) {
            elements.noResultsMessage.style.display = 'block';
            elements.sportsGrid.style.display = 'none';
        } else {
            elements.noResultsMessage.style.display = 'none';
            elements.sportsGrid.style.display = 'grid';
            keysToShow.forEach(key => {
                const card = createSportCard(key, appData[key], isInitial);
                elements.sportsGrid.appendChild(card);
            });
        }
    };

    const createSportCard = (key, sport, animate) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'sport-card p-4 lg:p-6 rounded-2xl cursor-pointer text-center flex flex-col items-center justify-center aspect-square relative';
        card.dataset.sport = key;
        if (animate) {
            card.classList.add('animated');
            setTimeout(() => card.classList.remove('animated'), 600);
        }

        const isFav = favorites.includes(key);
        const copyCount = getCopyCount(key);
        
        card.innerHTML = `
            <span class="favorite-star ${isFav ? 'is-favorite' : ''}" data-key="${key}" aria-label="Kedvencekhez adás">⭐</span>
            ${copyCount > 0 ? `<span class="copy-counter absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">${copyCount}</span>` : ''}
            <div class="text-2xl lg:text-3xl mb-2" aria-hidden="true">${sport.icon}</div>
            <h3 class="text-xs lg:text-sm font-semibold text-slate-200 leading-tight">${sport.name}</h3>
            <span class="text-xs text-slate-400 mt-1 capitalize leading-tight">${categoryNames[sport.category] || sport.category}</span>
        `;
        
        card.querySelector('.favorite-star').addEventListener('click', (e) => {
            e.stopPropagation();
            handleToggleFavorite(key);
        });
        
        card.addEventListener('click', () => handleSelectSport(key, card));
        return card;
    };

    // --- MODALS & DIALOGS ---
    const showModal = (modalElement) => modalElement.classList.add('visible');
    const closeModal = (modalElement) => modalElement.classList.remove('visible');

    const showAlert = (message) => {
        elements.alertModalTitle.textContent = "Sikeres Művelet";
        elements.alertModalMessage.textContent = message;
        elements.alertModalButtons.innerHTML = `<button id="alert-ok-btn" class="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition">OK</button>`;
        showModal(elements.alertModal);
        document.getElementById('alert-ok-btn').onclick = () => {
            closeModal(elements.alertModal);
            location.reload();
        };
    };

    const showConfirmation = (message, onConfirm) => {
        elements.alertModalTitle.textContent = "Megerősítés";
        elements.alertModalMessage.textContent = message;
        elements.alertModalButtons.innerHTML = `
            <button id="confirm-cancel-btn" class="px-6 py-2 rounded-lg bg-slate-600 hover:bg-slate-500 transition">Mégse</button>
            <button id="confirm-ok-btn" class="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition">Megerősítés</button>
        `;
        showModal(elements.alertModal);
        document.getElementById('confirm-ok-btn').onclick = () => {
            closeModal(elements.alertModal);
            onConfirm();
        };
        document.getElementById('confirm-cancel-btn').onclick = () => closeModal(elements.alertModal);
    };

    // --- EVENT HANDLERS ---
    const handleSelectSport = (key, cardElement) => {
        currentlySelectedKey = key;
        const sport = appData[key];
        
        if (selectedSportCard) selectedSportCard.classList.remove('selected');
        cardElement.classList.add('selected');
        selectedSportCard = cardElement;
        
        elements.promptTitle.textContent = sport.title;
        elements.promptCategory.textContent = categoryNames[sport.category] || sport.category;
        elements.promptText.readOnly = true;
        elements.editButton.textContent = "Szerkesztés";
        
        // Reset checkbox-ok és mezők
        if (elements.specificMatchCheckbox) {
            elements.specificMatchCheckbox.checked = false;
            elements.matchInputContainer.classList.add('hidden');
        }
        if (elements.specificDateCheckbox) {
            elements.specificDateCheckbox.checked = false;
            elements.dateInputContainer.classList.add('hidden');
        }
        if (elements.specificMatchInput) {
            elements.specificMatchInput.value = '';
        }
        if (elements.specificDateInput) {
            elements.specificDateInput.value = '';
        }
        
        // Alapértelmezett prompt beállítása
        elements.promptText.value = sport.prompt;
        
        // Hatékonysági csúszka beállítása
        const effectiveness = getEffectiveness(key);
        if (elements.effectivenessSlider) {
            elements.effectivenessSlider.value = effectiveness;
            elements.effectivenessValue.textContent = effectiveness + '%';
        }
        
        // Konkrét mérkőzés opciók megjelenítése/elrejtése
        const supportsSpecificMatch = ['football', 'basketball', 'tennis'].includes(key);
        if (elements.specificMatchOptions) {
            elements.specificMatchOptions.classList.toggle('hidden', !supportsSpecificMatch);
            
            // Sportág-specifikus ikon és placeholder beállítása
            if (supportsSpecificMatch && specificMatchConfig[key]) {
                const config = specificMatchConfig[key];
                if (elements.sportIcon) {
                    elements.sportIcon.textContent = config.icon;
                }
                if (elements.specificMatchInput) {
                    elements.specificMatchInput.placeholder = config.placeholder;
                }
            }
        }
        
        // Special styling for virtual sports warning
        if (sport.special === "warning") {
            elements.promptText.classList.add("warning");
            elements.promptText.style.color = "#ef4444";
            elements.promptText.style.fontWeight = "bold";
            elements.promptText.style.fontSize = "16px";
            elements.promptText.style.textAlign = "center";
            elements.promptText.style.backgroundColor = "#fef2f2";
            elements.promptText.style.border = "2px solid #ef4444";
            elements.editButton.style.display = "none";
        } else {
            elements.promptText.classList.remove("warning");
            elements.promptText.style.color = "";
            elements.promptText.style.fontWeight = "";
            elements.promptText.style.fontSize = "";
            elements.promptText.style.textAlign = "";
            elements.promptText.style.backgroundColor = "";
            elements.promptText.style.border = "";
            elements.editButton.style.display = "";
        }
        
        showPromptContainer();
    };

    const showPromptContainer = () => {
        elements.promptContainer.classList.remove('prompt-hidden');
        elements.promptContainer.classList.add('prompt-visible');
        elements.toolsInline.style.display = 'flex';
        elements.toolsSection.style.display = 'none';
        
        // Improved scrolling: scroll to the bottom of the prompt container
        setTimeout(() => {
            const containerRect = elements.promptContainer.getBoundingClientRect();
            const containerBottom = containerRect.bottom + window.pageYOffset;
            const viewportHeight = window.innerHeight;
            
            // Calculate scroll position to show the full container
            const targetScroll = containerBottom - viewportHeight + 50; // 50px padding
            
            window.scrollTo({ 
                top: Math.max(0, targetScroll), 
                behavior: 'smooth' 
            });
        }, 100);
    };

    const closePromptContainer = () => {
        if (selectedSportCard) selectedSportCard.classList.remove('selected');
        selectedSportCard = null;
        currentlySelectedKey = null;
        elements.promptContainer.classList.remove('prompt-visible');
        elements.promptContainer.classList.add('prompt-hidden');
        elements.toolsInline.style.display = 'none';
        elements.toolsSection.style.display = 'block';
        
        // Reset prompt text styling
        elements.promptText.classList.remove("warning");
        elements.promptText.style.color = "";
        elements.promptText.style.fontWeight = "";
        elements.promptText.style.fontSize = "";
        elements.promptText.style.textAlign = "";
        elements.promptText.style.backgroundColor = "";
        elements.promptText.style.border = "";
        elements.editButton.style.display = "";
        
        elements.pageTop.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCopyPrompt = () => {
        if (!elements.promptText.value || !currentlySelectedKey) return;
        
        navigator.clipboard.writeText(elements.promptText.value).then(() => {
            // Másolás számláló növelése
            incrementCopyCounter(currentlySelectedKey);
            
            // Feedback megjelenítése
            elements.copyFeedback.style.opacity = '1';
            elements.copyTextSpan.textContent = "Másolva!";
            setTimeout(() => {
                elements.copyFeedback.style.opacity = '0';
                elements.copyTextSpan.textContent = "Másolás";
            }, 2000);
        }).catch(err => console.error('Hiba a másolás során: ', err));
    };

    const handleToggleFavorite = (key) => {
        const index = favorites.indexOf(key);
        if (index > -1) favorites.splice(index, 1);
        else favorites.push(key);
        saveFavorites();
        renderSportsCards();
        if (currentFilter === 'favorites' && !favorites.includes(currentlySelectedKey)) {
            if (!elements.promptContainer.classList.contains('prompt-hidden')) {
                closePromptContainer();
            }
        }
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        const key = elements.editKey.value;
        appData[key] = {
            name: elements.editName.value,
            icon: elements.editIcon.value,
            category: elements.editCategory.value,
            title: elements.editPromptTitle.value,
            prompt: elements.editPrompt.value
        };
        saveData();
        renderSportsCards();
        closeModal(elements.editModal);
        if (currentlySelectedKey === key) {
            const cardElement = document.querySelector(`[data-sport="${key}"]`);
            if(cardElement) handleSelectSport(key, cardElement);
        }
    };

    const handleExport = () => {
        const exportData = {
            customSportsData: JSON.parse(localStorage.getItem('customSportsData') || '{}'),
            sportsFavorites: JSON.parse(localStorage.getItem('sportsFavorites') || '[]'),
            promptCopyCounters: JSON.parse(localStorage.getItem('promptCopyCounters') || '{}'),
            promptEffectiveness: JSON.parse(localStorage.getItem('promptEffectiveness') || '{}')
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sport-prompts-${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
    };

    const handleImport = (input) => {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const imported = JSON.parse(evt.target.result);
                if (imported.customSportsData) localStorage.setItem('customSportsData', JSON.stringify(imported.customSportsData));
                if (imported.sportsFavorites) localStorage.setItem('sportsFavorites', JSON.stringify(imported.sportsFavorites));
                if (imported.promptCopyCounters) localStorage.setItem('promptCopyCounters', JSON.stringify(imported.promptCopyCounters));
                if (imported.promptEffectiveness) localStorage.setItem('promptEffectiveness', JSON.stringify(imported.promptEffectiveness));
                showAlert('Sikeres importálás! Az oldal újratöltődik.');
            } catch (err) {
                showConfirmation('Hiba történt az importálás során. Hibás vagy sérült a JSON fájl.', () => {});
            }
        };
        reader.readAsText(file);
    };

    const handleReset = () => {
        showConfirmation('Biztosan visszaállítod az alapértelmezett állapotot? Minden egyéni prompt, kedvenc, másolási számláló és hatékonysági beállítás törlődik!', () => {
            localStorage.removeItem('customSportsData');
            localStorage.removeItem('sportsFavorites');
            localStorage.removeItem('promptCopyCounters');
            localStorage.removeItem('promptEffectiveness');
            showAlert('Visszaállítás sikeres! Az oldal újratöltődik.');
        });
    };

    // --- THEME HANDLING ---
    const setTheme = (mode) => {
        elements.body.classList.toggle('light-theme', mode === 'light');
        elements.themeIcon.textContent = mode === 'light' ? '☀️' : '🌙';
        localStorage.setItem('theme', mode);
    };

    // --- SPECIFIC MATCH PROMPT GENERATION ---
    const updatePromptText = () => {
        if (!currentlySelectedKey || !['football', 'basketball', 'tennis'].includes(currentlySelectedKey)) {
            return;
        }
        
        const sport = appData[currentlySelectedKey];
        const useSpecificMatch = elements.specificMatchCheckbox && elements.specificMatchCheckbox.checked;
        const useSpecificDate = elements.specificDateCheckbox && elements.specificDateCheckbox.checked;
        
        if (useSpecificMatch && sport.specificMatchPrompt) {
            let promptText = sport.specificMatchPrompt;
            
            // Mérkőzés helyettesítés
            if (elements.specificMatchInput && elements.specificMatchInput.value.trim()) {
                promptText = promptText.replace('{MATCH}', elements.specificMatchInput.value.trim());
            } else {
                promptText = promptText.replace('{MATCH}', '[ÍRDID BE A MÉRKŐZÉST]');
            }
            
            // Dátum helyettesítés
            if (useSpecificDate && elements.specificDateInput && elements.specificDateInput.value) {
                const dateValue = elements.specificDateInput.value;
                const formatDate = new Date(dateValue).toLocaleDateString('hu-HU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                });
                promptText = promptText.replace('{DATE}', `(${formatDate})`);
            } else {
                promptText = promptText.replace('{DATE}', '');
            }
            
            elements.promptText.value = promptText;
        } else {
            // Alapértelmezett prompt használata
            elements.promptText.value = sport.prompt;
        }
    };

    // --- LAZY LOAD FOR MOBILE ---
    const setupMobileLazyLoad = () => {
        if (mobileObserver) mobileObserver.disconnect();
        if (isMobile()) {
            mobileObserver = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    mobileVisibleCount += MOBILE_LAZY_LOAD_COUNT;
                    renderSportsCards();
                }
            }, { rootMargin: "200px" });
            mobileObserver.observe(elements.loadMoreSentinel);
        }
    };

    // --- INITIALIZATION ---
    const init = () => {
        // Load data and initial theme
        loadData();
        setTheme(localStorage.getItem('theme') || 'dark');
        
        // Set up event listeners
        elements.searchInput.addEventListener('input', () => {
            mobileVisibleCount = MOBILE_LAZY_LOAD_COUNT;
            renderSportsCards();
        });

        elements.categoryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                elements.categoryFilters.forEach(f => {
                    f.classList.remove('category-badge');
                    f.classList.add('bg-slate-700', 'hover:bg-slate-600');
                });
                filter.classList.add('category-badge');
                filter.classList.remove('bg-slate-700', 'hover:bg-slate-600');
                currentFilter = filter.dataset.category;
                mobileVisibleCount = MOBILE_LAZY_LOAD_COUNT;
                renderSportsCards();
            });
        });

        elements.copyButton.addEventListener('click', handleCopyPrompt);
        elements.closePromptButton.addEventListener('click', closePromptContainer);
        
        // Hatékonysági csúszka eseménykezelő
        if (elements.effectivenessSlider) {
            elements.effectivenessSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                elements.effectivenessValue.textContent = value + '%';
                if (currentlySelectedKey) {
                    setEffectiveness(currentlySelectedKey, value);
                }
            });
        }
        
        // Konkrét mérkőzés checkbox eseménykezelők
        if (elements.specificMatchCheckbox) {
            elements.specificMatchCheckbox.addEventListener('change', (e) => {
                elements.matchInputContainer.classList.toggle('hidden', !e.target.checked);
                updatePromptText();
            });
        }
        
        if (elements.specificDateCheckbox) {
            elements.specificDateCheckbox.addEventListener('change', (e) => {
                elements.dateInputContainer.classList.toggle('hidden', !e.target.checked);
                updatePromptText();
            });
        }
        
        if (elements.specificMatchInput) {
            elements.specificMatchInput.addEventListener('input', updatePromptText);
        }
        
        if (elements.specificDateInput) {
            elements.specificDateInput.addEventListener('change', updatePromptText);
        }
        
        elements.editButton.addEventListener('click', () => {
            if (currentlySelectedKey) {
                elements.editForm.reset();
                const sport = appData[currentlySelectedKey];
                elements.modalTitle.textContent = "Prompt Szerkesztése";
                elements.editKey.value = currentlySelectedKey;
                elements.editName.value = sport.name;
                elements.editIcon.value = sport.icon;
                elements.editCategory.value = sport.category;
                elements.editPromptTitle.value = sport.title;
                elements.editPrompt.value = sport.prompt;
                showModal(elements.editModal);
            }
        });
        
        elements.addNewPromptBtn.addEventListener('click', () => {
            elements.editForm.reset();
            elements.modalTitle.textContent = "Új Prompt Hozzáadása";
            elements.editKey.value = `custom_${Date.now()}`;
            showModal(elements.editModal);
        });
        
        elements.editForm.addEventListener('submit', handleEditFormSubmit);
        elements.cancelEditBtn.addEventListener('click', () => closeModal(elements.editModal));
        elements.editModal.addEventListener('click', (e) => e.target === elements.editModal && closeModal(elements.editModal));
        elements.alertModal.addEventListener('click', (e) => e.target === elements.alertModal && closeModal(elements.alertModal));
        
        elements.themeToggle.addEventListener('click', () => setTheme(elements.body.classList.contains('light-theme') ? 'dark' : 'light'));
        
        // Export/Import/Reset button event listeners
        elements.exportBtn.addEventListener('click', handleExport);
        elements.importInput.addEventListener('change', () => handleImport(elements.importInput));
        elements.resetBtn.addEventListener('click', handleReset);
        elements.exportBtnInline.addEventListener('click', handleExport);
        elements.importInputInline.addEventListener('change', () => handleImport(elements.importInputInline));
        elements.resetBtnInline.addEventListener('click', handleReset);
        
        // Initial render
        renderSportsCards(true);
        setupMobileLazyLoad();
        
        // Window resize handling for mobile lazy load
        window.addEventListener('resize', setupMobileLazyLoad);
    };

    // Start the application
    init();

}); 