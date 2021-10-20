const Base = require("./base")

module.exports = class Year extends Base {
    constructor() {
      super()
    }
  
    Year;
    WithYear(val) {
      this.Year = val;
      return this;
    }
}