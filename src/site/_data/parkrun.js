const GetAthlete = require("../../code/parkrun/get-athletes");
const { GetAllResults, GroupResultsByEvent, GroupResultsByDate, LatestResults, GroupResultsByYear, GroupResultsByMonth } = require("../../code/parkrun/transform-results");
const bottleneck = require("bottleneck");

module.exports = function () {
    return new Promise((resolve, reject) => {
        getAthletes()
            .then(
                athletes => {

                    var results = GetAllResults(athletes);

                    resolve({
                        athletes: athletes,
                        results: results,
                        events: GroupResultsByEvent(results),
                        dates: {
                            day: GroupResultsByDate(results),
                            year: GroupResultsByYear(results),
                            month: GroupResultsByMonth(results)
                        },
                        latest: LatestResults(results)
                    });
                }
            )
            .catch(
                error => {
                    reject(error);
                }
            )
    });
}

function getAthletes() {
    let athleteIds = [
        4116819, // Tim Cane
        4431015, // Thomas Cope
        2537134, // Rebecca Lennon

        4344228, // Howard Towner
        4404459, // Nicholas Lennon
        5341203, // Jamie Brookes
        5388106, // Stephen Lennon
        3383442, // Chris Bolus
        6222230, // Grant Butler
        6255352, // Amy Guess                    
        5930535, // Andrew Joynson
    ]

    const limiter = new bottleneck({
        maxConcurrent: 1,
        minTime: 1000
    });

    return limiter.schedule(() => {
        const allTasks = athleteIds.map(x => GetAthlete(x));
        // GOOD, we wait until all tasks are done.
        return Promise.all(allTasks);
    });
}