const { GetAthlete } = require("../../code/parkrun-crawler");

module.exports = function () {
    return new Promise((resolve, reject) => {
        Promise
            .all(
                [
                    GetAthlete(4116819), //Tim CANE
                    GetAthlete(4431015) // Thomas COPE
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