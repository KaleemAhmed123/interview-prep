import matchesData from "../../data/matches.json" assert { type: "json" };

// 1 => Number of matches played per year for all the years in IPL.
const matchesPerYear = function(data) {
    const mp = new Map();
    for(const match of data) {
        const {season} = match;
        if(!mp.has(season)) {
            mp.set(season, 1);
        } else {
            mp.set(season, mp.get(season) + 1);
        }
    }
    // return Array.from(mp.entries()).map(([season, matches]) => ({season, matches}));
    const result = {};
    for(const [season, count] of mp) {
        result[season] = count;
    }

    return result;
}

// 2 => Number of matches won per team per year in IPL.
const matchesWonByTeam = function(data) {
    const mp = new Map();
    for(const match of data) {
        const {winner} = match;
        if(!mp.has(winner)) {
            mp.set(winner, 1);
        } else {
            mp.set(winner, mp.get(winner) + 1);
        }
    }
    // return Array.from(mp.entries()).map(([season, matches]) => ({season, matches}));
    const result = {};
    for(const [team, wins] of mp) {
        result[team] = wins;
    }

    return result;
}





// Extra runs conceded per team in the year 2016
// Top 10 economical bowlers in the year 2015



const result1 = matchesPerYear(matchesData); 
const result2 = matchesWonByTeam(matchesData); 
console.log('{Key => year and numberOfMatches => value} \n',  result1);
console.log('{Key => team and wins => value} \n',  result2);
