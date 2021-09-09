module.exports = {
    GetAllResults: getAllResults,
    GroupResultsByEvent: groupResultsByEvent,
    GroupResultsByDate: groupResultsByDate,
    LastRun: lastRun,
    GroupResultsByYear: groupResultsByYear,
    GroupResultsByMonth:groupResultsByMonth,
    GetAthletesLatestRun: getAthletesLatestRun
};


function getAllResults(athletes) {
    let results = [];

    for (const athlete of athletes) {
        for (const result of athlete.Results) {
            const run = Object.assign({}, result);

            run.AthleteName = athlete.Name;
            run.AthleteId = athlete.Id;

            results.push(run);
        }
    }

    return results;
}

function groupResultsByEvent(results) {
    let output = [];

    var groups = results.reduce(function (rv, x) {
        (rv[x.Event] = rv[x.Event] || []).push(x);
        return rv;
    }, {});

    for (const key in groups) {
        if (Object.hasOwnProperty.call(groups, key)) {
            let results = groups[key];

            results = results.sort(function (a, b) {
                return a.Time - b.Time;
            });

            output.push({
                Event: key,
                Results: results,
                Stats: {
                    TotalRuns: results.length,
                    BestRun: Math.min.apply(Math, results.map(function (o) { return o.Time; })),
                    AverageRun: Math.round(results.reduce(function (a, b) { return a + b.Time; }, 0) / results.length)
                }
            })
        }
    }

    return output;
}

function groupResultsByDate(results) {
    let output = [];

    var groups = results.reduce(function (rv, x) {
        (rv[x.RunDate] = rv[x.RunDate] || []).push(x);
        return rv;
    }, {});

    for (const key in groups) {
        if (Object.hasOwnProperty.call(groups, key)) {
            let results = groups[key];

            results = results.sort(function (a, b) {
                return a.Time - b.Time;
            });

            output.push({
                Date: results[0].RunDate,
                Results: results
            })
        }
    }

    return output;
}

function groupResultsByYear(results) {
    let output = [];

    var groups = results.reduce(function (rv, x) {
        (rv[x.RunDate.getFullYear()] = rv[x.RunDate.getFullYear()] || []).push(x);
        return rv;
    }, {});

    for (const key in groups) {
        if (Object.hasOwnProperty.call(groups, key)) {
            let results = groups[key];

            results = results.sort(function (a, b) {
                return a.Time - b.Time;
            });

            output.push({
                Year: key,
                Results: results
            })
        }
    }

    return output;
}

function groupResultsByMonth(results) {
    let output = [];

    var groups = results.reduce(function (rv, x) {
        (rv[x.RunDate.getFullYear() + "-" + (x.RunDate.getMonth() + 1)] = rv[x.RunDate.getFullYear() + "-" + (x.RunDate.getMonth() + 1)] || []).push(x);
        return rv;
    }, {});

    for (const key in groups) {
        if (Object.hasOwnProperty.call(groups, key)) {
            let results = groups[key];

            results = results.sort(function (a, b) {
                return a.Time - b.Time;
            });

            output.push({
                Year: key.split("-")[0],
                Month: ("0" + key.split("-")[1]).slice(-2),
                Results: results
            })
        }
    }

    return output;
}


function lastRun(results) {
    return results.reduce((a, b) => (a > b.RunDate ? a : b.RunDate), new Date(0));
}

function getAthletesLatestRun(athletes){
    let latestRuns = [];

    for (const athlete of athletes) {
            const run = Object.assign({}, athlete.Results[0]);

            run.AthleteName = athlete.Name;
            run.AthleteId = athlete.Id;

            latestRuns.push(run);
    }

    return groupResultsByDate(latestRuns);
}