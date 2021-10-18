const { GetAthletesPage } = require("./web");
const { ParseResultsFromHtml } = require("./parser");
const cheerio = require("cheerio");

module.exports = {
  GetResultsForAthlete: getResultsForAthlete,
  OrderResultsByRunDate: orderResultsByRunDate,
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

function orderResultsByRunDate(results) {
  return results.sort((a, b) => {
    if (a.RunDate > b.RunDate) {
      return -1;
    } else if (b.RunDate > a.RunDate) {
      return 1;
    } else {
      return 0;
    }
  });
}
