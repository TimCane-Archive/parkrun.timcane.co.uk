const summary = require("../summary");

module.exports = (Base) =>
  class extends Base {
    get annualSummary() {
      let years = {};

      var yearGroups = this.runs.reduce(function (rv, x) {
        (rv[x.runDate.getFullYear()] = rv[x.runDate.getFullYear()] || []).push(
          x
        );
        return rv;
      }, {});

      for (const key in yearGroups) {
        if (Object.hasOwnProperty.call(yearGroups, key)) {
          years[key] = summary(yearGroups[key]);
        }
      }

      return years;
    }

    toJSON() {
        let obj = super.toJSON();
  
        if (!obj.stats) {
          obj.stats = {};
        }
  
        obj.stats.annual = this.annualSummary;
  
        return obj;
      }
  };
