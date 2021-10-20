const { GetAthleteIds } = require("./athletes");
const bottleneck = require("bottleneck");
const { GetResultsForAthlete, OrderResultsByRunDate } = require("./results");
const { Flatten } = require("../utils/flatten");

module.exports = {
  ScrapeResults: scrapeResults,
};

function scrapeResults() {
  return new Promise((resolve, reject) => {
    doWork()
      .then((data) => {
        let results = Flatten(data);
        resolve(OrderResultsByRunDate(results));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function doWork() {
  let athleteIds = GetAthleteIds();

  const limiter = new bottleneck({
    maxConcurrent: 1,
    minTime: 1000,
  });

  return limiter.schedule(() => {
    const allTasks = athleteIds.map((x) => GetResultsForAthlete(x));
    // GOOD, we wait until all tasks are done.
    return Promise.all(allTasks);
  });
}
