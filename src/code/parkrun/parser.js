const toTitleCase = require("../utils/to-title-case");
const toDate = require("../utils/to-date");
const toSeconds = require("../utils/to-seconds");
const Run = require("./models/run");
const cheerio = require("cheerio");

module.exports = {
  ParseRunsFromHtml: parseRunsFromHtml,
};

function parseRunsFromHtml(html, athleteId) {
  const $ = cheerio.load(html);

  let athleteInfo = {
    Id: athleteId,
    Name: getAthleteName($),
  };

  let runs = getRuns($, athleteInfo);

  return runs;
}

function getAthleteName($) {
  return toTitleCase($("#content h2").first().text().trim());
}

function getRuns($, athlete) {
  var runsTable = $("#results")[2];

  let runs = [];

  $(runsTable)
    .find("tbody > tr")
    .each(function (i, row) {
      var run = new Run()
        .WithAthleteName(athlete.Name)
        .WithAthleteId(athlete.Id)

        .WithEvent($(row.children[0]).text())
        .WithRunDate(toDate($(row.children[1]).text()))
        .WithRunNumber(parseInt($(row.children[2]).text()))
        .WithPosition(parseInt($(row.children[3]).text()))
        .WithTime(toSeconds($(row.children[4]).text()))
        .WithAgeGrade(parseFloat($(row.children[5]).text()))
        .WithPB($(row.children[6]).text().trim() == "PB");

      runs.push(run);
    });

  return runs;
}
