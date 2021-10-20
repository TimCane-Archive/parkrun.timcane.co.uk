module.exports = class BaseModel {
    constructor(){}

    Results;
    WithResults(val) {
      this.Results = val;
      return this;
    }
}