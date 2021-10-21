const { GetAthleteIds } = require("./athletes");
const bottleneck = require("bottleneck");
const { GetRunsForAthlete } = require("./results");
const { Flatten } = require("../utils/flatten");
const Root = require("./models/root");

module.exports = {
  ScrapeRuns: scrapeRuns,
};

function scrapeRuns() {
  return new Promise((resolve, reject) => {
    doWork()
      .then((data) => {

        let root = new Root()
        .WithRuns(Flatten(data))

        root.sort("RunDate");

        resolve(root);
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
    const allTasks = athleteIds.map((x) => GetRunsForAthlete(x));
    // GOOD, we wait until all tasks are done.
    return Promise.all(allTasks);
  });
}
