const {ScrapeData} = require("../../code/parkrun");

module.exports = function () {
    return new Promise((resolve, reject) => {
        ScrapeData()
            .then(
                data => {                    
                    resolve(data);
                }
            )
            .catch(
                error => {
                    reject(error);
                }
            )
    });
}