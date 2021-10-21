module.exports = class Base {
  constructor() {}

  Results;
  WithResults(val) {
    this.Results = val;
    return this;
  }

  get Total() {
    return this.Results.length;
  }

  toJSON() {
    return {
      results: this.Results,
      total: this.Total,
    };
  }
};
