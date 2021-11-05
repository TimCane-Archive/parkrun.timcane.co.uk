const summary = require("../summary");

module.exports = (Base) =>
  class extends Base {
    get runnerSummary() {
      let runners = {};

      var runnerGroups = this.runs.reduce(function (rv, x) {
        (rv[x.athleteName] = rv[x.athleteName] || []).push(
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
    
        obj.stats.runner = this.runnerSummary;
  
        return obj;
      }
  };
