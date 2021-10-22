module.exports = (Base) =>
  class extends Base {
    get LastRun() {
        return this.Runs.reduce(
          (a, b) => (a > b.RunDate ? a : b.RunDate),
          new Date(0)
        );
      }

    toJSON() {
        let obj = super.toJSON();
  
        obj.lastRun = this.LastRun;
  
        return obj;
      }
  };
