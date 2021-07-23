const request = require("request");
const cheerio = require("cheerio");

const toSeconds = require("./utils/to-seconds");
const toDate = require("./utils/to-date");

module.exports = {
    GetAthlete: getAthlete
}

function getAthlete(runnerId) {
    return new Promise(resolve => {
        request('https://www.parkrun.org.uk/results/athleteeventresultshistory/?eventNumber=0&athleteNumber=' + runnerId, function (error, response, html) {
            const $ = cheerio.load(html);

            let athlete = {
                Id: runnerId
            };

            // Athlete Details:
            athlete = getAthleteDetails($, athlete);

            // Summary Stats
            athlete = getSummaryStats($, athlete);

            // Achievements
            athlete = getAnnualAchievements($, athlete);

            // Results
            athlete = getResults($, athlete);

            resolve(athlete);
        });
    });
}

function getAthleteDetails($, athlete) {
    var heading = $("#content h2")
        .first()
        .text();
    heading = heading.split("-");

    athlete.Name = heading[0].trim();
    athlete.TotalRuns = parseInt(heading[1].split("<br>")[0].match(/\d+/));

    return athlete;
}

function getSummaryStats($, athlete) {
    var summaryTable = $("#results")[0];

    var eventSummary = [];

    $(summaryTable)
        .find("tbody > tr")
        .each(function (i, row) {
            var summary = {
                Name: $(row.children[0]).text(),
                Fastest: $(row.children[1]).text(),
                Average: $(row.children[2]).text(),
                Slowest: $(row.children[3]).text()
            };

            eventSummary.push(summary);
        });

    athlete.Summary = eventSummary;

    return athlete;
}

function getAnnualAchievements($, athlete) {
    var achievementsTable = $("#results")[1];

    var achievements = [];

    $(achievementsTable)
        .find("tbody > tr")
        .each(function (i, row) {
            var achievement = {
                Year: parseInt($(row.children[0]).text()),
                BestTime: toSeconds($(row.children[1]).text()),
                BestGrade: parseFloat($(row.children[2]).text())
            };

            //parseInt(heading[1].split("<br>")[0].match(/\d+/));

            achievements.push(achievement);
        });

    athlete.Achievements = achievements;

    return athlete;
}

function getResults($, athlete) {
    var resultsTable = $("#results")[2];

    var results = [];

    $(resultsTable)
        .find("tbody > tr")
        .each(function (i, row) {

            var result = {
                Event: $(row.children[0]).text(),
                RunDate: toDate($(row.children[1]).text()),
                RunNumber: parseInt($(row.children[2]).text()),
                Position: parseInt($(row.children[3]).text()),
                Time: toSeconds($(row.children[4]).text()),                
                AgeGrade: parseFloat($(row.children[5]).text()),                
                PB: $(row.children[6]).text().trim() == "PB"
            };

            results.push(result);
        });

    athlete.Results = results;

    return athlete;
}