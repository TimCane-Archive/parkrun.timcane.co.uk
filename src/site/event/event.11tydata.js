const { GroupByEvent } = require("../../code/parkrun/group");

module.exports = {
  eleventyComputed: {
    events: (data) => GroupByEvent(data.results),
  },
};
