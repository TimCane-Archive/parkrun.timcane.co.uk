const GetAthlete = require("../../code/parkrun/get-athletes");

module.exports = function () {
    return new Promise((resolve, reject) => {
        Promise
            .all(
                [
                    GetAthlete(4116819), // Tim Cane
                    GetAthlete(4431015), // Thomas Cope
                    GetAthlete(2537134), // Rebecca Lennon


                    // GetAthlete(4344228), // Howard Towner
                    // GetAthlete(4404459), // Nicholas Lennon
                    // GetAthlete(5341203), // Jamie Brookes
                    // GetAthlete(5388106), // Stephen Lennon
                    // GetAthlete(3383442), // Chris Bolus
                    // GetAthlete(6222230), // Grant Butler
                    // GetAthlete(6255352), // Amy Guess                    
                    // GetAthlete(5930535), // Andrew Joynson
                ]
            )
            .then(
                data => {
                    resolve({athletes: data});
                }
            )
            .catch(
                error => {
                    reject(error);
                }
            )
    });
}