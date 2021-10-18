const { GroupBy } = require("../utils/group-by");

module.exports = {
  GroupByAthlete: groupByAthlete,
  GroupByEvent: groupByEvent,
  GroupByDate: groupByDate
};

function groupByDate(results) {
  let dates = [];

  let groups = GroupBy(results, "RunDate");
  for (const key in groups) {
    if (Object.hasOwnProperty.call(groups, key)) {
      const arr = groups[key];

      if (arr.length > 0) {
        dates.push({
          Name: arr[0].RunDate,
          Results: arr,
        });
      }
    }
  }

  return dates;
}

function groupByEvent(results) {
  let events = [];

  let groups = GroupBy(results, "Event");
  for (const key in groups) {
    if (Object.hasOwnProperty.call(groups, key)) {
      const arr = groups[key];

      if (arr.length > 0) {
        events.push({
          Name: arr[0].Event,
          Results: arr,
        });
      }
    }
  }

  return events;
}

function groupByAthlete(results) {
  let athletes = [];

  let groups = GroupBy(results, "AthleteId");
  for (const key in groups) {
    if (Object.hasOwnProperty.call(groups, key)) {
      const arr = groups[key];

      if (arr.length > 0) {
        athletes.push({
          Id: key,
          Name: arr[0].AthleteName,
          Results: arr,
        });
      }
    }
  }

  return athletes;
}
