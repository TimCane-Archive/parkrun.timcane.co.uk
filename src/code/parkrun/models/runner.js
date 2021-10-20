const Base = require("./base")

module.exports = class Athlete extends Base {
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