const Base = require("./base");

module.exports = class AllRuns extends Base {
  sort(col) {
    this.Results = this.Results.sort((a, b) => {
      if (a[col] > b[col]) {
        return -1;
      } else if (b[col] > a[col]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
};
