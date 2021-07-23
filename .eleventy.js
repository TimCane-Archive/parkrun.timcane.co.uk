const cleanBoolFilter = require("./src/code/filters/clean-bool.filter")
const jsonFilter = require("./src/code/filters/json.filter")
const noNoFilter = require("./src/code/filters/no-no.filter")
const timeFilter = require("./src/code/filters/time.filter")
const dateFilter = require("./src/code/filters/date.filter")

module.exports = function (config) {

    // Copy my public folder to the output.
    config.addPassthroughCopy({"src/public/": "./"});

    config.addFilter("json", jsonFilter);
    config.addFilter("cleanBool", cleanBoolFilter);
    config.addFilter("noNo", noNoFilter);
    config.addFilter("time", timeFilter);
    config.addFilter("date", dateFilter);

    return {
        dir: {
            input: "src/site",
            output: "dist",
            layouts: "_layouts/"
        }
    };
};