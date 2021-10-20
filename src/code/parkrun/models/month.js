const Year = require("./year");

module.exports = class Month extends Year {
  constructor() {
    super();
  }

  Month;
  WithMonth(val) {
    if (val) {
      this.Month = ("0" + val).slice(-2);
    }
    return this;
  }
};
