module.exports = (Base) =>
  class extends Base {
    get lastRun() {
        return this.runs.reduce(
          (a, b) => (a > b.runDate ? a : b.runDate),
          new Date(0)
        );
      }

    toJSON() {
        let obj = super.toJSON();
  
        obj.lastRun = this.lastRun;
  
        return obj;
      }
  };
