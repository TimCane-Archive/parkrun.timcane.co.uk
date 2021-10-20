const BaseModel = require("./base-model")

module.exports = class Athlete extends BaseModel {
    constructor() {
      super()
    }

    Id;
    WithId(val) {
      this.Id = val;
      return this;
    }
  
    Name;
    WithName(val) {
      this.Name = val;
      return this;
    }
}