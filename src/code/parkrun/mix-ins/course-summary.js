const summary = require("../summary");

module.exports = (Base) =>
  class extends Base {
    get courseSummary() {
      let courses = {};

      var courseGroups = this.runs.reduce(function (rv, x) {
        (rv[x.event] = rv[x.event] || []).push(x);
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

      obj.stats.course = this.courseSummary;

      return obj;
    }
  };
