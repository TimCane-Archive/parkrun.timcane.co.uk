const request = require("request");

module.exports = {
  GetAthletesPage: getAthletesPage,
};

function getAthletesPage(athleteId) {
  return new Promise((resolve, reject) => {
    request(
      `https://www.parkrun.org.uk/parkrunner/${athleteId}/all/`,
      function (error, response, html) {
        if (response.statusCode == 200) {
          resolve(html);
        } else {
          reject(error);
        }
      }
    );
  });
}
