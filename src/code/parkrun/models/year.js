const { DateBase } = require("../mix-ins");

module.exports = class Year extends DateBase {
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