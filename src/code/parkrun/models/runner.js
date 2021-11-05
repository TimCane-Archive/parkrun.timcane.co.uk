const { RunnerBase } = require("../mix-ins");

module.exports = class Runner extends RunnerBase {
    constructor() {
      super()
    }

    id;
    WithId(val) {
      this.id = val;
      return this;
    }
  
    name;
    WithName(val) {
      this.name = val;
      return this;
    }

    toJSON() {
      let obj = super.toJSON();
  
      obj["id"] = this.id;
      obj["name"] = this.name;
  
      return obj;
    }
}