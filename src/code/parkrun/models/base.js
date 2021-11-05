const summary = require("../summary");

module.exports = class Base {
  constructor() {}

  runs;
  WithRuns(val) {
    this.runs = val;
    return this;
  }
  
  get overallSummary() {
    return summary(this.runs);
  }

  toJSON() {
    return {
      runs: this.runs,
      stats: {
        overall: this.overallSummary,
      },
    };
  }
};
