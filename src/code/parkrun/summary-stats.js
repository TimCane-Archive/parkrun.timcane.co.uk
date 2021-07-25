const toSeconds = require("../utils/to-seconds");
const toDate = require("../utils/to-date");

module.exports = class SummaryStats {

    Time;
    AgeGrade;
    OverallPosition;

    SummaryTable;

    constructor($) {
        var rows = $($("#results")[0]).find("tbody > tr");;

        this.getTimeStats($, rows[0]);
        this.getAgeGradeStats($, rows[1]);
        this.getOverallPositionStats($, rows[2]);
    }

    getTimeStats($, row) {
        this.Time = {
            Fastest: toSeconds($(row.children[1]).text()),
            Average: toSeconds($(row.children[2]).text()),
            Slowest: toSeconds($(row.children[3]).text())
        }
    }
    getAgeGradeStats($, row) {
        this.AgeGrade = {
            Fastest: parseFloat($(row.children[1]).text()),
            Average: parseFloat($(row.children[2]).text()),
            Slowest: parseFloat($(row.children[3]).text())
        }
    }
    getOverallPositionStats($, row) {
        this.OverallPosition = {
            Fastest: parseInt($(row.children[1]).text()),
            Average: parseInt($(row.children[2]).text()),
            Slowest: parseInt($(row.children[3]).text())
        }
    }
}