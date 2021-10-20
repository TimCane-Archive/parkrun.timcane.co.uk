const { GroupBy } = require("../utils/group-by");
const Day = require("./models/day");
const Month = require("./models/month");
const Year = require("./models/year");
const Course = require("./models/course");
const Runner = require("./models/runner");

module.exports = {
  GroupByRunner: groupByRunner,
  GroupByCourse: groupByCourse,
  GroupByDay: groupByDay,
  GroupByMonth: groupByMonth,
  GroupByYear: groupByYear,
};

function groupByDay(allRuns) {
  let results = allRuns.Results;
  let dates = [];

  let groups = GroupBy(results, "RunDate");
  for (const key in groups) {
    if (Object.hasOwnProperty.call(groups, key)) {
      const arr = groups[key];

      if (arr.length > 0) {
        let day = new Day()
        .WithDay(arr[0].RunDate.getDate())
        .WithMonth(arr[0].RunDate.getMonth() + 1)
        .WithYear(arr[0].RunDate.getFullYear())
        .WithResults(arr);

        dates.push(day);
      }
    }
  }

  return dates;
}

function groupByMonth(allRuns) {
  let results = allRuns.Results;
  let output = [];

  var groups = results.reduce(function (rv, x) {
    (rv[x.RunDate.getFullYear() + "-" + (x.RunDate.getMonth() + 1)] =
      rv[x.RunDate.getFullYear() + "-" + (x.RunDate.getMonth() + 1)] ||
      []).push(x);
    return rv;
  }, {});

  for (const key in groups) {
    if (Object.hasOwnProperty.call(groups, key)) {
      let results = groups[key];

      results = results.sort(function (a, b) {
        return a.Time - b.Time;
      });

      let month = new Month()
        .WithYear(key.split("-")[0])
        .WithMonth(key.split("-")[1])
        .WithResults(results);

      output.push(month);
    }
  }

  return output;
}

function groupByYear(allRuns) {
  let results = allRuns.Results;
  let output = [];

  var groups = results.reduce(function (rv, x) {
    (rv[x.RunDate.getFullYear()] = rv[x.RunDate.getFullYear()] || []).push(x);
    return rv;
  }, {});

  for (const key in groups) {
    if (Object.hasOwnProperty.call(groups, key)) {
      let results = groups[key];

      results = results.sort(function (a, b) {
        return a.Time - b.Time;
      });

      let year = new Year().WithYear(key).WithResults(results);

      output.push(year);
    }
  }

  return output;
}

function groupByCourse(allRuns) {
  let results = allRuns.Results;
  let courses = [];

  let groups = GroupBy(results, "Event");
  for (const key in groups) {
    if (Object.hasOwnProperty.call(groups, key)) {
      const arr = groups[key];

      if (arr.length > 0) {
        let course = new Course().WithName(arr[0].Event).WithResults(arr);

        courses.push(course);
      }
    }
  }

  return courses;
}

function groupByRunner(allRuns) {
  let results = allRuns.Results;
  let runners = [];

  let groups = GroupBy(results, "AthleteId");
  for (const key in groups) {
    if (Object.hasOwnProperty.call(groups, key)) {
      const arr = groups[key];

      if (arr.length > 0) {
        let runner = new Runner()
          .WithId(key)
          .WithName(arr[0].AthleteName)
          .WithResults(arr);

        runners.push(runner);
      }
    }
  }

  return runners;
}
