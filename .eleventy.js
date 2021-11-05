const jsonFilter = require("./src/code/filters/json.filter")
const timeFilter = require("./src/code/filters/time.filter")
const dateFilter = require("./src/code/filters/date/date.filter")
const monthFilter = require("./src/code/filters/date/month.filter")
const padFilter = require("./src/code/filters/date/pad.filter")

module.exports = function (config) {

    // Copy my public folder to the output.
    config.addPassthroughCopy({"src/public/": "./"});

    config.addFilter("json", jsonFilter);
    config.addFilter("time", timeFilter);

    // Date
    config.addFilter("date", dateFilter);
    config.addFilter("month", monthFilter);
    config.addFilter("pad", padFilter);

	config.setBrowserSyncConfig({
		files: './dist/assets/css/*.css'
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