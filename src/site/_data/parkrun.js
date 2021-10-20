const { ScrapeResults } = require("../../code/parkrun");
const { GroupByCourse, GroupByRunner, GroupByDay, GroupByMonth, GroupByYear } = require("../../code/parkrun/group");
const { GetLatestRunDate } = require("../../code/parkrun/results");

module.exports = function () {
  return new Promise((resolve, reject) => {
    ScrapeResults()
      .then((results) => {
        resolve({
          results: results,
          courses: GroupByCourse(results),
          runners: GroupByRunner(results),
          dates: {
            year: GroupByYear(results),
            month: GroupByMonth(results),
            day: GroupByDay(results)
          },
          lastRun: GetLatestRunDate(results)
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
