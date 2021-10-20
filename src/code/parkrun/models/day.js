const Month = require("./month");

module.exports = class Day extends Month {
  constructor() {
    super();
  }

  Day;
  WithDay(val) {
    if (val) {
      this.Day = ("0" + val).slice(-2);
    }
    return this;
  }
};
