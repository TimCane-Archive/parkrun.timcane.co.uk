const toSeconds = require("../utils/to-seconds");
const toDate = require("../utils/to-date");
const toTitleCase = require("../utils/to-title-case");
const SummaryStats = require("./summary-stats");

module.exports = class Athlete {

    Id;
    Name;
    TotalRuns;

    Summary;
    Achievements;
    Results;

    Events;

    LastRun;

    constructor($, athleteId) {
        this.Id = athleteId;


        this.getDetails($);
        this.getResults($);

        this.getAnnualAchievements($);

        this.Summary = new SummaryStats($);

        this.buildEventsSummary();

        this.getLastRun();
    }

    getDetails($) {
        var name = $("#content h2")
            .first()
            .text();

        var totalRuns = $("#content h3")
            .first()
            .text();

        this.Name = toTitleCase(name.trim());
        this.TotalRuns = parseInt(totalRuns.match(/\d+/));
    }

    getResults($) {
        var resultsTable = $("#results")[2];


        let results = [];

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

        this.Results = results;
    }

    getAnnualAchievements($) {
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

        this.Achievements = achievements;
    }

    getLastRun(){
        this.LastRun =  this.Results.reduce((a, b) => (a > b.RunDate ? a : b.RunDate), new Date(0));
    }

    buildEventsSummary() {

        var groups = this.Results.reduce(function (rv, x) {
            (rv[x.Event] = rv[x.Event] || []).push(x);
            return rv;
        }, {})

        let eventSummaries = [];

        for (const key in groups) {
            if (Object.hasOwnProperty.call(groups, key)) {
                const runs = groups[key];
                
                let bestPosition = Infinity;
                let bestTime = Infinity;

                for (const run of runs) {
                    if(run.Time < bestTime){
                        bestTime = run.Time;
                    }
                    if(run.Position < bestPosition){
                        bestPosition = run.Position;
                    }
                }

                let eventSummary = {
                    Event: key,
                    Runs: runs.length,
                    BestPosition: bestPosition,
                    BestTime: bestTime
                }
                
                eventSummaries.push(eventSummary);
            }
        }

        this.Events =  eventSummaries.sort(function(a,b) {
            return b.Runs - a.Runs;
        });        
    }
}