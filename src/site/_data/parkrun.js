const { ScrapeRuns } = require("../../code/parkrun");

module.exports = function () {
  return new Promise((resolve, reject) => {
    ScrapeRuns()
      .then((root) => {
        resolve({
          results: root,
          courses: root.ByCourse(),
          runners: root.ByRunner(),
          dates: {
            year: root.ByYear(),
            month: root.ByMonth(),
            day: root.ByDay()
          },
          lastRun: root.LatestDate
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
