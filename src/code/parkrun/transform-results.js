module.exports = {
    GetAllResults: getAllResults,
    GroupResultsByEvent: groupResultsByEvent,
    GroupResultsByDate: groupResultsByDate,
    GroupResultsForFeed: groupResultsForFeed
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
                Results: results
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

function groupResultsForFeed(results) {
    let years = [];

    for (const result of results) {
        let runYear = result.RunDate.getFullYear();
        let runMonth = result.RunDate.getMonth();

        let year;
        let foundYears = years.filter(y => y.Year == runYear);
        if (foundYears.length == 1) {
            year = foundYears[0];
        } else {
            year = {
                Year: runYear,
                Months: []
            }

            years.push(year);
        }

        let month;
        let foundMonths = year.Months.filter(y => y.Month == runMonth);
        if (foundMonths.length == 1) {
            month = foundMonths[0];
        } else {
            month = {
                Month: runMonth,
                Results: []
            }

            year.Months.push(month);
        }

        month.Results.push(result);
    }

    return years;
}