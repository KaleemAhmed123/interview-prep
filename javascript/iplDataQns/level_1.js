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
const matchesWonByTeam = function (data) {
  const mp = new Map();
  for (const match of data) {
    const { winner } = match;
    if (!mp.has(winner)) {
      mp.set(winner, 1);
    } else {
      mp.set(winner, mp.get(winner) + 1);
    }
  }
  // return Array.from(mp.entries()).map(([season, matches]) => ({season, matches}));
  const result = {};
  for (const [team, wins] of mp) {
    result[team] = wins;
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
  for (const match of matchesData) {
    const { season } = match;

    if (season === year) {
      for (const delivery of deliveriesData) {
        const { bowler, total_runs } = delivery;
        if (!mp.has(bowler)) {
          mp.set(bowler, { balls: 0, runs: 0 });
        } else {
          const prev = mp.get(bowler);
          prev.balls += 1;
          prev.runs += Number(total_runs);
          mp.set(bowler, prev);
        }
      }
    }
  }
  const result = [];
  for (const [bowler, ballsAndRuns] of mp) {
    result.push({ bowler, ballsAndRuns });
  }

  result.sort((a, b) => {
    let first = a.ballsAndRuns.runs / a.ballsAndRuns.balls;
    let second = b.ballsAndRuns.runs / b.ballsAndRuns.balls;

    return first - second;
  });

  return result;
};

// 5 => Find the number of times each team won the toss and also won the match

const timesWhenTeamWonMatchAndToss = function (data) {
  const mp = new Map();
  for (const match of data) {
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

// 7 => Find the strike rate of a batsman for each season

const result1 = matchesPerYear(matchesData);
const result2 = matchesWonByTeam(matchesData);
const result3 = extraRunsConcededInYear(matchesData, deliveriesData, "2016");
const result4 = topEconomicalBowler(matchesData, deliveriesData, "2015");
const result5 = timesWhenTeamWonMatchAndToss(matchesData);
console.log("{Key => year and value => numberOfMatches} \n", result1);
console.log("{Key => team and value => wins} \n", result2);
console.log("{Key => team and value => extras_in_year_2016} \n", result3);
console.log("{Key => team and value => {bowlCount, totalRuns} } \n", result4);
console.log("{Key => team and value => {bowlCount, totalRuns} } \n", result5);
