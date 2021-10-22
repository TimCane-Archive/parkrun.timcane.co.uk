const Base = require("./base");
const { GroupBy } = require("../../utils/group-by");
const Day = require("./day");
const Month = require("./month");
const Year = require("./year");
const Course = require("./course");
const Runner = require("./runner");

const AnnualSummary = require("../mix-ins/annual-summary");
const CourseSummary = require("../mix-ins/course-summary");
const LastRun = require("../mix-ins/last-run");

module.exports = class Root extends CourseSummary(AnnualSummary(LastRun(Base))) {
  sort(col) {
    this.Runs = this.Runs.sort((a, b) => {
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

    let groups = GroupBy(this.Runs, "RunDate");
    for (const key in groups) {
      if (Object.hasOwnProperty.call(groups, key)) {
        const arr = groups[key];

        if (arr.length > 0) {
          let day = new Day()
            .WithDay(arr[0].RunDate.getDate())
            .WithMonth(arr[0].RunDate.getMonth() + 1)
            .WithYear(arr[0].RunDate.getFullYear())
            .WithRuns(arr);

          dates.push(day);
        }
      }
    }

    return dates;
  }

  ByMonth() {
    let output = [];

    var groups = this.Runs.reduce(function (rv, x) {
      (rv[x.RunDate.getFullYear() + "-" + (x.RunDate.getMonth() + 1)] =
        rv[x.RunDate.getFullYear() + "-" + (x.RunDate.getMonth() + 1)] ||
        []).push(x);
      return rv;
    }, {});

    for (const key in groups) {
      if (Object.hasOwnProperty.call(groups, key)) {
        let runs = groups[key];

        runs = runs.sort(function (a, b) {
          return a.Time - b.Time;
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

    var groups = this.Runs.reduce(function (rv, x) {
      (rv[x.RunDate.getFullYear()] = rv[x.RunDate.getFullYear()] || []).push(x);
      return rv;
    }, {});

    for (const key in groups) {
      if (Object.hasOwnProperty.call(groups, key)) {
        let runs = groups[key];

        runs = runs.sort(function (a, b) {
          return a.Time - b.Time;
        });

        let year = new Year().WithYear(key).WithRuns(runs);

        output.push(year);
      }
    }

    return output;
  }

  ByCourse() {
    let courses = [];

    let groups = GroupBy(this.Runs, "Event");
    for (const key in groups) {
      if (Object.hasOwnProperty.call(groups, key)) {
        const arr = groups[key];

        if (arr.length > 0) {
          let course = new Course().WithName(arr[0].Event).WithRuns(arr);

          courses.push(course);
        }
      }
    }

    return courses;
  }

  ByRunner() {
    let runners = [];

    let groups = GroupBy(this.Runs, "AthleteId");
    for (const key in groups) {
      if (Object.hasOwnProperty.call(groups, key)) {
        const arr = groups[key];

        if (arr.length > 0) {
          let runner = new Runner()
            .WithId(key)
            .WithName(arr[0].AthleteName)
            .WithRuns(arr);

          runners.push(runner);
        }
      }
    }

    return runners;
  }
};
