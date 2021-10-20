module.exports = class Base {
    constructor(){}

    Results;
    WithResults(val) {
      this.Results = val;
      return this;
    }
}