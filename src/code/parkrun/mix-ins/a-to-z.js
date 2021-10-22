module.exports = (Base) =>
  class extends Base {
    get AToZ() {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      let courses = [...new Set(this.Runs.map((r) => r.Event))].sort();

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

      obj.stats.atoz = this.AToZ;

      return obj;
    }
  };
