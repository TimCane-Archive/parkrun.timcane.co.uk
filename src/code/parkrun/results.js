const { GetAthletesPage } = require("./web");
const { ParseRunsFromHtml } = require("./parser");
const cheerio = require("cheerio");

module.exports = {
  GetRunsForAthlete: getRunsForAthlete
};

function getRunsForAthlete(athleteId) {
  return new Promise((resolve, reject) => {
    GetAthletesPage(athleteId).then(
      (html) => {
        try {
          resolve(ParseRunsFromHtml(html, athleteId));
        } catch (error) {
          console.log(error);
          reject(`Unable to get parse runs for ${athleteId}`);
        }
      },
      (error) => {
        console.log(error);
        reject(`Unable to get runs for ${athleteId}`);
      }
    );
  });
}
