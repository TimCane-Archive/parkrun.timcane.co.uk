const summary = require("../summary");

module.exports = (Base) =>
  class extends Base {
    get AnnualSummary() {
      let years = {};

      var yearGroups = this.Runs.reduce(function (rv, x) {
        (rv[x.RunDate.getFullYear()] = rv[x.RunDate.getFullYear()] || []).push(
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
  
        if (!obj.stats.summary) {
          obj.stats.summary = {};
        }
  
        obj.stats.summary.annual = this.AnnualSummary;
  
        return obj;
      }
  };
