module.exports = (Base) =>
  class extends Base {
    get aToZ() {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      let courses = [...new Set(this.runs.map((r) => r.event))].sort();

      let letterGroups = courses.reduce(function (rv, x) {
        (rv[x[0]] = rv[x[0]] || []).push(x);
        return rv;
      }, {});

      let aToZ = {};

      for (const letter of alphabet) {
        if (letterGroups[letter]) {
          aToZ[letter] = letterGroups[letter];
        } else {
          aToZ[letter] = [];
        }
      }

      return aToZ;
    }

    toJSON() {
      let obj = super.toJSON();

      if (!obj.stats) {
        obj.stats = {};
      }

      obj.stats.atoz = this.aToZ;

      return obj;
    }
  };
