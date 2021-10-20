const { GetAthletesPage } = require("./web");
const { ParseResultsFromHtml } = require("./parser");
const cheerio = require("cheerio");

module.exports = {
  GetResultsForAthlete: getResultsForAthlete,
  GetLatestRunDate: getLatestRunDate,
};

function getResultsForAthlete(athleteId) {
  return new Promise((resolve, reject) => {
    GetAthletesPage(athleteId).then(
      (html) => {
        try {
          resolve(ParseResultsFromHtml(html, athleteId));
        } catch (error) {
          console.log(error);
          reject(`Unable to get parse results for ${athleteId}`);
        }
      },
      (error) => {
        console.log(error);
        reject(`Unable to get results for ${athleteId}`);
      }
    );
  });
}

function getLatestRunDate(allRuns) {
  let results = allRuns.Results;
  return results.reduce((a, b) => (a > b.RunDate ? a : b.RunDate), new Date(0));
}
