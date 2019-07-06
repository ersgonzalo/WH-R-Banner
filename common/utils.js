import { preferences } from "user-settings";

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

export function formatHoursDisplay(hours){
  //Put this in utils for Time Display
  if (preferences.clockDisplay === "12h") {
    // 12h format
    return hours % 12 || 12;
  } else {
    // 24h format
    return zeroPad(hours);
  }
}

export function checkIfDigit(expectedNumber){
  if(typeof(expectedNumber) !== 'number')
    return `--`;
  else
    return expectedNumber;
}

export function testLogging(totalItemsObject){
  console.log(`---`);
  console.log(totalItemsObject.steps);
  console.log(totalItemsObject.calories);
  console.log(totalItemsObject.elevationGain);
  console.log(totalItemsObject.activeMinutes);
}