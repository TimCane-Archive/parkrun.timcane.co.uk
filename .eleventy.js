const pluginSass = require("eleventy-plugin-sass");

const cleanBoolFilter = require("./src/code/filters/clean-bool.filter")
const jsonFilter = require("./src/code/filters/json.filter")
const noNoFilter = require("./src/code/filters/no-no.filter")
const timeFilter = require("./src/code/filters/time.filter")
const dateFilter = require("./src/code/filters/date/date.filter")
const dateSlugFilter = require("./src/code/filters/date/date-slug.filter")
const monthFilter = require("./src/code/filters/date/month.filter")

module.exports = function (config) {

    // Copy my public folder to the output.
    config.addPassthroughCopy({"src/public/": "./"});

    config.addFilter("json", jsonFilter);
    config.addFilter("cleanBool", cleanBoolFilter);
    config.addFilter("noNo", noNoFilter);
    config.addFilter("time", timeFilter);

    // Date
    config.addFilter("date", dateFilter);
    config.addFilter("dateSlug", dateSlugFilter);
    config.addFilter("month", monthFilter);

    config.addWatchTarget("**/_scss/theme");
    config.setWatchThrottleWaitTime(5000);

    config.addPlugin(pluginSass, {
        watch: ["**/theme.scss"],
        outputDir: "dist/assets/css/",
        remap: true
    });

    if(process.env.ELEVENTY_ENV == "dev"){
        console.log("Running in DEV mode");
    } else if(process.env.ELEVENTY_ENV == "prod"){
        console.log("Building for Production");
    }

    return {
        dir: {
            input: "src/site",
            output: "dist",
            layouts: "_layouts/"
        }
    };
};