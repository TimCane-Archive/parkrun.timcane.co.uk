const { DateBase } = require("../mix-ins");

module.exports = class Year extends DateBase {
    constructor() {
      super()
    }
  
    year;
    WithYear(val) {
      this.year = parseInt(val);
      return this;
    }
    
    toJSON() {
      let obj = super.toJSON();
  
      obj["year"] = this.year;
  
      return obj;
    }
}