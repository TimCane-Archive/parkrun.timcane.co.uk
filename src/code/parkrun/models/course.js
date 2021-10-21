const Base = require("./base");

module.exports = class Course extends Base {
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
