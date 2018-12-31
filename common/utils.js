// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//Set the full Month 
export function convertMonthFromNumber(numberedMonth) {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return months[numberedMonth];
}

//Set the full Day of the Week 
export function convertDayOfWeekFromNumber(numberedDay) {
  var daysOfTheWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  return daysOfTheWeek[numberedDay];
}
