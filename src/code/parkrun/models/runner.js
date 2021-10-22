const Base = require("./base")
const AnnualSummary = require("../mix-ins/annual-summary")
const CourseSummary = require("../mix-ins/course-summary")
const AToZ = require("../mix-ins/a-to-z")
const LastRun = require("../mix-ins/last-run")


module.exports = class Runner extends CourseSummary(AnnualSummary(AToZ(LastRun(Base)))) {
    constructor() {
      super()
    }

    Id;
    WithId(val) {
      this.Id = val;
      return this;
    }
  
    Name;
    WithName(val) {
      this.Name = val;
      return this;
    }

    toJSON() {
      let obj = super.toJSON();
  
      obj["id"] = this.Id;
      obj["name"] = this.Name;
  
      return obj;
    }
}