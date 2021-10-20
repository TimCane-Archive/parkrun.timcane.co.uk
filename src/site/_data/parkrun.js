const { ScrapeResults } = require("../../code/parkrun");
const { GroupByCourse, GroupByRunner, GroupByDay, GroupByMonth, GroupByYear } = require("../../code/parkrun/group");
const { GetLatestRunDate } = require("../../code/parkrun/results");

module.exports = function () {
  return new Promise((resolve, reject) => {
    ScrapeResults()
      .then((allRuns) => {
        resolve({
          results: allRuns,
          courses: GroupByCourse(allRuns),
          runners: GroupByRunner(allRuns),
          dates: {
            year: GroupByYear(allRuns),
            month: GroupByMonth(allRuns),
            day: GroupByDay(allRuns)
          },
          lastRun: GetLatestRunDate(allRuns)
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
