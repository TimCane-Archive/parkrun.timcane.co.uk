const { GroupByDate } = require("../../code/parkrun/group");

module.exports = {
  eleventyComputed: {
    dates: (data) => GroupByDate(data.results),
  },
};
