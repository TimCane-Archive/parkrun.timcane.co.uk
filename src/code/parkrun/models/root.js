const { GroupBy } = require("../../utils/group-by");
const Day = require("./day");
const Month = require("./month");
const Year = require("./year");
const Course = require("./course");
const Runner = require("./runner");
const { RootBase } = require("../mix-ins");

module.exports = class Root extends RootBase {
  sort(col) {
    this.runs = this.runs.sort((a, b) => {
      if (a[col] > b[col]) {
        return -1;
      } else if (b[col] > a[col]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  ByDay() {
    let dates = [];

    let groups = GroupBy(this.runs, "runDate");
    for (const key in groups) {
      if (Object.hasOwnProperty.call(groups, key)) {
        const arr = groups[key];

        if (arr.length > 0) {
          let day = new Day()
            .WithDay(arr[0].runDate.getDate())
            .WithMonth(arr[0].runDate.getMonth() + 1)
            .WithYear(arr[0].runDate.getFullYear())
            .WithRuns(arr);

          dates.push(day);
        }
      }
    }

    return dates;
  }

  ByMonth() {
    let output = [];

    var groups = this.runs.reduce(function (rv, x) {
      (rv[x.runDate.getFullYear() + "-" + (x.runDate.getMonth() + 1)] =
        rv[x.runDate.getFullYear() + "-" + (x.runDate.getMonth() + 1)] ||
        []).push(x);
      return rv;
    }, {});

    for (const key in groups) {
      if (Object.hasOwnProperty.call(groups, key)) {
        let runs = groups[key];

        runs = runs.sort(function (a, b) {
          return a.time - b.time;
        });

        let month = new Month()
          .WithYear(key.split("-")[0])
          .WithMonth(key.split("-")[1])
          .WithRuns(runs);

        output.push(month);
      }
    }

    return output;
  }

  ByYear() {
    let output = [];

    var groups = this.runs.reduce(function (rv, x) {
      (rv[x.runDate.getFullYear()] = rv[x.runDate.getFullYear()] || []).push(x);
      return rv;
    }, {});

    for (const key in groups) {
      if (Object.hasOwnProperty.call(groups, key)) {
        let runs = groups[key];

        runs = runs.sort(function (a, b) {
          return a.time - b.time;
        });

        let year = new Year().WithYear(key).WithRuns(runs);

        output.push(year);
      }
    }

    return output;
  }

  ByCourse() {
    let courses = [];

    let groups = GroupBy(this.runs, "event");
    for (const key in groups) {
      if (Object.hasOwnProperty.call(groups, key)) {
        const arr = groups[key];

        if (arr.length > 0) {
          let course = new Course().WithName(arr[0].event).WithRuns(arr);

          courses.push(course);
        }
      }
    }

    return courses;
  }

  ByRunner() {
    let runners = [];

    let groups = GroupBy(this.runs, "athleteId");
    for (const key in groups) {
      if (Object.hasOwnProperty.call(groups, key)) {
        const arr = groups[key];

        if (arr.length > 0) {
          let runner = new Runner()
            .WithId(key)
            .WithName(arr[0].athleteName)
            .WithRuns(arr);

          runners.push(runner);
        }
      }
    }

    return runners;
  }
};
