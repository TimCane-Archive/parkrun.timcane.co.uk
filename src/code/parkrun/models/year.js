const BaseModel = require("./base-model")

module.exports = class Year extends BaseModel {
    constructor() {
      super()
    }
  
    Year;
    WithYear(val) {
      this.Year = val;
      return this;
    }
}