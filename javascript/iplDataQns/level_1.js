import matchesData from "../../data/matches.json" assert { type: "json" };
import deliveriesData from "../../data/deliveries.json" assert { type: "json" };

// 1 => Number of matches played per year for all the years in IPL.
const matchesPerYear = function (data) {
  const mp = new Map();
  for (const match of data) {
    const { season } = match;
    if (!mp.has(season)) {
      mp.set(season, 1);
    } else {
      mp.set(season, mp.get(season) + 1);
    }
  }
  // return Array.from(mp.entries()).map(([season, matches]) => ({season, matches}));
  const result = {};
  for (const [season, count] of mp) {
    result[season] = count;
  }

  return result;
};

// 2 => Number of matches won per team per year in IPL.
const matchesWonByTeam = function (matchesData) {
  const mp = new Map();
  for (const match of matchesData) {
    const { season, winner } = match;

    if (!mp.has(season)) {
      mp.set(season, new Map());
    }

    const seasonedMp = mp.get(season);
    if (!seasonedMp.has(winner)) {
      seasonedMp.set(winner, 1);
    } else {
      seasonedMp.set(winner, seasonedMp.get(winner) + 1);
    }
  }
  // return Array.from(mp.entries()).map(([season, matches]) => ({season, matches}));
  const result = [];
  for (const [year, teamsWinsMap] of mp) {
    let teamsWinsYearArray = [];
    for (const [team, winsThatYear] of teamsWinsMap) {
      // Remove the incorrect condition
      teamsWinsYearArray.push({ team, wins: winsThatYear });
    }
    result.push({ year, teams_won: teamsWinsYearArray });
  }

  return result;
};

// 3 => Extra runs conceded per team in the year 2016
const extraRunsConcededInYear = function (matchData, deliveriesData, year) {
  const mp = new Map();
  for (const match of matchData) {
    const { season, id, team1, team2 } = match;

    if (season === year) {
      let extra_runs_team_1 = 0;
      let extra_runs_team_2 = 0;
      for (const delivery of deliveriesData) {
        if (delivery.match_id === id && delivery.bowling_team === team1) {
          extra_runs_team_1 += Number(delivery.extra_runs);
        }
        if (delivery.match_id === id && delivery.bowling_team === team2) {
          extra_runs_team_2 += Number(delivery.extra_runs);
        }
      }
      mp.set(team1, (mp.get(team1) || 0) + extra_runs_team_1);
      mp.set(team2, (mp.get(team2) || 0) + extra_runs_team_2);
    }
  }
  const result = {};
  for (const [team, extras] of mp) {
    result[team] = extras;
  }

  return result;
};

// 4 => Top 10 economical bowlers in the year 2015
const topEconomicalBowler = function (matchesData, deliveriesData, year) {
  const mp = new Map();
  // const t1 = performance.now();
  // console.log(t1);
  console.time("Time Taken");

  for (const match of matchesData) {
    const { season } = match;

    if (season === year) {
      for (const delivery of deliveriesData) {
        const { bowler, total_runs, wide_runs } = delivery;
        if (!mp.has(bowler)) {
          mp.set(bowler, { balls: 0, runs: 0 });
        }
        const prev = mp.get(bowler);
        if (wide_runs != "0") prev.balls += 1;

        prev.runs += Number(total_runs);
        mp.set(bowler, prev);
      }
    }
  }
  const result = [];
  for (const [bowler, ballsAndRuns] of mp) {
    const over = Math.floor(ballsAndRuns.balls / 6);
    const economy = ballsAndRuns.runs / over;
    if (over > 0) result.push({ bowler, economy, ballsAndRuns, over });
  }

  result.sort((a, b) => {
    let first = a.ballsAndRuns.runs / a.ballsAndRuns.over;
    let second = b.ballsAndRuns.runs / b.ballsAndRuns.over;

    return first - second;
  });

  const top_ten_economic = result.slice(0, 10);

  // const t2 = performance.now();
  // console.log(t2);
  // console.log("time taken", t2 - t1);

  console.timeLog("Time Taken");

  return top_ten_economic;
};

// 5 => Find the number of times each team won the toss and also won the match

const timesWhenTeamWonMatchAndToss = function (matchesData) {
  const mp = new Map();
  for (const match of matchesData) {
    const { winner, toss_winner } = match;
    if (winner === toss_winner) {
      if (!mp.has(winner)) {
        mp.set(winner, 1);
      } else {
        mp.set(winner, mp.get(winner) + 1);
      }
    }
  }
  // return Array.from(mp.entries()).map(([season, matches]) => ({season, matches}));
  const result = {};
  for (const [team, bothWins] of mp) {
    result[team] = bothWins;
  }

  return result;
};

// 6 => Find a player who has won the highest number of Player of the Match awards for each season

// data structure  {year: [{playerName: 6}]}
//         so Map<String, Array[Map<String, Integer>]>
const manOfTheMatchAwardsPerSeason = function (matchesData) {
  const mp = new Map();

  for (const match of matchesData) {
    const { season, player_of_match } = match;

    if (!mp.has(season)) {
      mp.set(season, new Map());
    }

    const yearMap = mp.get(season);
    if (!yearMap.has(player_of_match)) {
      yearMap.set(player_of_match, 1);
    } else {
      yearMap.set(player_of_match, yearMap.get(player_of_match) + 1);
    }
  }

  const result = [];
  for (const [year, playerCountArrayMap] of mp) {
    let maxAwardCount = -1e7;
    let playerName;
    for (const [player, awardCount] of playerCountArrayMap) {
      // console.log(player, typeof player, awardCount, typeof awardCount);
      if (awardCount > maxAwardCount) {
        maxAwardCount = awardCount;
        playerName = player;
      }
    }

    result.push({
      season: year,
      player_of_match: playerName,
      awards_received: maxAwardCount,
    });
  }

  return result;
};

// 7 => Find the strike rate of a batsman for each season

const strikeRateOfBatsmanPerSeason = function () {};

const result1 = matchesPerYear(matchesData);
const result2 = matchesWonByTeam(matchesData);
const result3 = extraRunsConcededInYear(matchesData, deliveriesData, "2016");
const result4 = topEconomicalBowler(matchesData, deliveriesData, "2015");
const result5 = timesWhenTeamWonMatchAndToss(matchesData);
const result6 = manOfTheMatchAwardsPerSeason(matchesData);

// console.log("{Key => year and value => numberOfMatches} \n", result1);
// console.log('Key and the [object, object........]') return krega so used dir
// console.dir(result2, { depth: null, colors: true });
// console.log("{Key => team and value => extras_in_year_2016} \n", result3);
console.log("{Key => team and value => {bowlCount, totalRuns} } \n", result4);
// console.log("{Key => team and value => {bowlCount, totalRuns} } \n", result5);
// console.log("{Key => year and value => manOfTheMatches} \n", result6);
