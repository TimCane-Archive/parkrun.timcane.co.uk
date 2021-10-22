module.exports = (runs) => {
  return {
    total: runs.length,
    time: stats(parseInt, runs, "Time"),
    ageGrade: stats(parseFloat, runs, "AgeGrade"),
    position: stats(parseInt, runs, "Position"),
  };
};

const stats = (parse, runs, col) => {
  return {
    fastest: parse(runs.reduce((x, y) => (x[col] < y[col] ? x : y))[col]),
    average: parse(runs.reduce((x, y) => (x[col] > y[col] ? x : y))[col]),
    slowest: parse(
      runs.map((r) => r[col]).reduce((x, y) => x + y) / runs.length
    ),
  };
};
