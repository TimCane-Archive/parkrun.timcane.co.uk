module.exports = function (time) {

    let vals = time.split(":");

    let seconds = 0;

    if (vals.length == 3) {

        seconds += parseInt(vals[0] * 60 * 60);
        seconds += parseInt(vals[1] * 60);
        seconds += parseInt(vals[2]);
    } else if (vals.length == 2) {
        seconds += parseInt(vals[0] * 60);
        seconds += parseInt(vals[1]);
    }

    return seconds;
}