const request = require("request");
const cheerio = require("cheerio");
const Athlete = require("./athlete");

module.exports = function getAthlete(athleteId) {
    return new Promise((resolve, reject) => {
        request('https://www.parkrun.org.uk/results/athleteeventresultshistory/?eventNumber=0&athleteNumber=' + athleteId, function (error, response, html) {

        if(response.statusCode == 200){
            resolve(new Athlete(cheerio.load(html), athleteId));
        } else {
            reject("Unable to get Athlete: " + athleteId);
        }

            
        });
    });
}