const toTitleCase = require("../utils/to-title-case");
const toDate = require("../utils/to-date");
const toSeconds = require("../utils/to-seconds");
const Result = require("./models/result");
const cheerio = require("cheerio");

module.exports = {
  ParseResultsFromHtml: parseResultsFromHtml,
};

function parseResultsFromHtml(html, athleteId) {
  const $ = cheerio.load(html);

  let athleteInfo = {
    Id: athleteId,
    Name: getAthleteName($),
  };

  let results = getResults($, athleteInfo);

  return results;
}

function getAthleteName($) {
  return toTitleCase($("#content h2").first().text().trim());
}

function getResults($, athlete) {
  var resultsTable = $("#results")[2];

  let results = [];

  $(resultsTable)
    .find("tbody > tr")
    .each(function (i, row) {
      var result = new Result()
        .WithAthleteName(athlete.Name)
        .WithAthleteId(athlete.Id)

        .WithEvent($(row.children[0]).text())
        .WithRunDate(toDate($(row.children[1]).text()))
        .WithRunNumber(parseInt($(row.children[2]).text()))
        .WithPosition(parseInt($(row.children[3]).text()))
        .WithTime(toSeconds($(row.children[4]).text()))
        .WithAgeGrade(parseFloat($(row.children[5]).text()))
        .WithPB($(row.children[6]).text().trim() == "PB");

      results.push(result);
    });

    return results;
}
