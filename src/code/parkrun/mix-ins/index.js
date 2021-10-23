const AnnualSummary = require("./annual-summary");
const CourseSummary = require("./course-summary");
const RunnerSummary = require("./runner-summary");
const LastRun = require("./last-run");
const AToZ = require("./a-to-z");
const Base = require("../models/base");

module.exports = {
  RootBase: CourseSummary(AnnualSummary(LastRun(Base))),
  CourseBase: RunnerSummary(AnnualSummary(LastRun(Base))),
  RunnerBase: CourseSummary(AnnualSummary(AToZ(LastRun(Base)))),
  DateBase: CourseSummary(Base)
};
