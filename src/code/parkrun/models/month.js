const Year = require("./year");

module.exports = class Month extends Year {
  constructor() {
    super();
  }

  Month;
  WithMonth(val) {
    if (val) {
      this.Month = parseInt(("0" + val).slice(-2));
    }
    return this;
  }

  toJSON() {
    let obj = super.toJSON();

    obj["month"] = this.Month;

    return obj;
  }
};
