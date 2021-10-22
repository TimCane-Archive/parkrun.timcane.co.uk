const Base = require("./base");
const AnnualSummary = require("../mix-ins/annual-summary")
const RunnerSummary = require("../mix-ins/runner-summary")
const LastRun = require("../mix-ins/last-run");

module.exports = class Course extends RunnerSummary(AnnualSummary(LastRun(Base))) {
  constructor() {
    super();
  }

  Name;
  WithName(val) {
    this.Name = val;
    return this;
  }

  toJSON() {
    let obj = super.toJSON();

    obj["name"] = this.Name;

    return obj;
  }
};
