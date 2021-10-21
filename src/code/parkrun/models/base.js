module.exports = class Base {
  constructor() {}

  Runs;
  WithRuns(val) {
    this.Runs = val;
    return this;
  }

  get Total() {
    return this.Runs.length;
  }

  toJSON() {
    return {
      runs: this.Runs,
      total: this.Total,
    };
  }
};
