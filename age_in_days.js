function dateConstructor(year, month, day) {
  var monthsInYear = 12;
  if (month > monthsInYear) {
    console.log("too many months in year");
    return;
  }
  var isLeapYear = function () {
      return year % 100 === 0 && year % 400 !== 0 ? false : year % 4 === 0;
    };
  var daysInMonth = function () {
    days = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
      var febDaysIndex = isLeapYear() ? 1 : 0;
      return days[month-1][febDaysIndex];
    } else {
      return days[month-1];
    }
  };
  if (day > daysInMonth()) {
    console.log("too many days in month");
    return
  }
  var date = {
    year: year,
    month: month,
    day: day,
    isLeapYear: isLeapYear(),
    daysInMonth: daysInMonth(),
    nextDay: function() {
      this.day ++;
      if (this.day > this.daysInMonth) {
        this.day = 1;
        this.month ++;
        if (this.month > 12) {
          this.month = 1;
          this.year ++;
        }
      }
    }
  };
  return date;
}


//below this line, translation from python
function isLeapYear(year) {
  if (year % 100 === 0 && year % 400 !== 0) {
    return false;
  } else {
    return year % 4 === 0;
  }
}

function daysInMonth(year, month) {
  days = [31, [28, 29], 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    return isLeapYear(year) ? days[month-1][0] : days[month-1][1];
  } else {
    return days[month-1];
  }
}

function nextDay(year, month, day) {
  day ++;
  if (day > daysInMonth(year, month)) {
    day = 1;
    month ++;
    if (month > 12) {
      month = 1;
      year ++;
    }
  }
  return year, month, day; //JS doesn1t work this way
}

function isDateBefore(year1, month1, day1, year2, month2, day2) {
  if (year1 < year2) {
    return true;
  }
  if (year1 === year2) {
    if (month1 < month2) {
      return true;
    }
    if (month1 === month2) {
      return day1 < day2;
    }
  }
  return false;
}

function daysBetweenDates(year1, month1, day1, year2, month2, day2) {
  if (isDateBefore(year2, month2, day2, year1, month1, day1)) {
    console.log("date 2 must be after date 1");
    return
  }
  var days = 0;
  while (isDateBefore(year1, month1, day1, year2, month2, day2)) {
    days ++;
    year1, month1, day1 = nextDay(year1, month1, day1); //this won't be supported either
  }
  return days;
}
