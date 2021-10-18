const { GroupByAthlete } = require("../../code/parkrun/group");

module.exports = {
  eleventyComputed: {
    athletes: (data) => GroupByAthlete(data.results),
  },
};
