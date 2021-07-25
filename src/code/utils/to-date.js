module.exports = function (date) {
    let vals = date.split("/");

    return new Date(vals[2], vals[1] - 1, vals[0], 0, 0, 0, 0)
}