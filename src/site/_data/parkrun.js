const { ScrapeRuns } = require("../../code/parkrun");

module.exports = function () {
  return new Promise((resolve, reject) => {
    ScrapeRuns()
      .then((root) => {
        resolve({
          root: root,
          courses: root.ByCourse(),
          runners: root.ByRunner(),
          dates: {
            year: root.ByYear(),
            month: root.ByMonth(),
            day: root.ByDay()
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
