module.exports = class Run {
  constructor() {}

  athleteId;
  WithAthleteId(val) {
    this.athleteId = val;
    return this;
  }

  athleteName;
  WithAthleteName(val) {
    this.athleteName = val;
    return this;
  }

  event;
  WithEvent(val) {
    this.event = val;
    return this;
  }

  runDate;
  WithRunDate(val) {
    this.runDate = val;
    return this;
  }

  runNumber;
  WithRunNumber(val) {
    this.runNumber = val;
    return this;
  }

  position;
  WithPosition(val) {
    this.position = val;
    return this;
  }

  time;
  WithTime(val) {
    this.time = val;
    return this;
  }

  ageGrade;
  WithAgeGrade(val) {
    this.ageGrade = val;
    return this;
  }

  pb;
  WithPB(val) {
    this.pb = val;
    return this;
  }
};
