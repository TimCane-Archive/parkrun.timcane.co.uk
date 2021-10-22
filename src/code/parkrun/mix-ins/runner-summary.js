const summary = require("../summary");

module.exports = (Base) =>
  class extends Base {
    get RunnerSummary() {
      let runners = {};

      var runnerGroups = this.Runs.reduce(function (rv, x) {
        (rv[x.AthleteName] = rv[x.AthleteName] || []).push(
          x
        );
        return rv;
      }, {});

      for (const key in runnerGroups) {
        if (Object.hasOwnProperty.call(runnerGroups, key)) {
          runners[key] = summary(runnerGroups[key]);
        }
      }

      return runners;
    }

    toJSON() {
        let obj = super.toJSON();
  
        if (!obj.stats) {
          obj.stats = {};
        }
  
        if (!obj.stats.summary) {
          obj.stats.summary = {};
        }
  
        obj.stats.summary.runner = this.RunnerSummary;
  
        return obj;
      }
  };
