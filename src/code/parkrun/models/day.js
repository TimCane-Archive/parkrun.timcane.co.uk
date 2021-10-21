const Month = require("./month");

module.exports = class Day extends Month {
  constructor() {
    super();
  }

  Day;
  WithDay(val) {
    if (val) {
      this.Day = parseInt(("0" + val).slice(-2));
    }
    return this;
  }

  toJSON() {
    let obj = super.toJSON();

    obj["day"] = this.Day;

    return obj;
  }
};
