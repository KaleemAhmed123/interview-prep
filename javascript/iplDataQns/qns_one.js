import matchesData from "../../data/matches.json" assert { type: "json" };

// Number of matches played per year for all the years in IPL.
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


const result = matchesPerYear(matchesData); 
console.log('{Key => year and numberOfMatches => value} \n',  result);
