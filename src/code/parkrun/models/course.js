const BaseModel = require("./base-model")

module.exports = class Course extends BaseModel {
    constructor() {
      super()
    }

    Name;
    WithName(val){
      this.Name = val;
      return this;
    }
}