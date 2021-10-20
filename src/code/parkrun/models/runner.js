const Base = require("./base")

module.exports = class Runner extends Base {
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