const { CourseBase } = require("../mix-ins");

module.exports = class Course extends CourseBase {
  constructor() {
    super();
  }

  name;
  WithName(val) {
    this.name = val;
    return this;
  }

  toJSON() {
    let obj = super.toJSON();

    obj["name"] = this.name;

    return obj;
  }
};
