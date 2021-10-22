const summary = require("../summary");

module.exports = (Base) =>
  class extends Base {
    get CourseSummary() {
      let courses = {};

      var courseGroups = this.Runs.reduce(function (rv, x) {
        (rv[x.Event] = rv[x.Event] || []).push(x);
        return rv;
      }, {});

      for (const key in courseGroups) {
        if (Object.hasOwnProperty.call(courseGroups, key)) {
          courses[key] = summary(courseGroups[key]);
        }
      }

      return courses;
    }

    toJSON() {
      let obj = super.toJSON();

      if (!obj.stats) {
        obj.stats = {};
      }

      if (!obj.stats.summary) {
        obj.stats.summary = {};
      }

      obj.stats.summary.course = this.CourseSummary;

      return obj;
    }
  };
