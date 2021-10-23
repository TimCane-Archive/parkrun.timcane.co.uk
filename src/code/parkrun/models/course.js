const { CourseBase } = require("../mix-ins");

module.exports = class Course extends CourseBase {
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
