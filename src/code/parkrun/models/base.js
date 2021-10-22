const summary = require("../summary");

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

  get OverallSummary() {
    return summary(this.Runs);
  }

  toJSON() {
    return {
      runs: this.Runs,
      stats: {
        summary: {
          overall: this.OverallSummary,
        },
      },
    };
  }
};
