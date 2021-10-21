const Base = require("./base")

module.exports = class Year extends Base {
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