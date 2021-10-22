const Base = require("./base")
const CourseSummary = require("../mix-ins/course-summary")

module.exports = class Year extends CourseSummary(Base) {
    constructor() {
      super()
    }
  
    Year;
    WithYear(val) {
      this.Year = parseInt(val);
      return this;
    }
    
    toJSON() {
      let obj = super.toJSON();
  
      obj["year"] = this.Year;
  
      return obj;
    }
}