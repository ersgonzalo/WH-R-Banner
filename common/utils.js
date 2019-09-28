import { preferences } from "user-settings";

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Set the full Month Name
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
    'December',
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
  // Put this in utils for Time Display
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

//Take Month or Day of the Week and make them 3 Characters Long
//Because Saturday, September 28 is too long for Versa text right now
export function shortenProperDateWord(dateWord){
  var formattedDateWord = dateWord;
  switch(formattedDateWord){
    case 'September':
    case 'November':
    case 'December':
      formattedDateWord = dateWord.replace(/ember/g,'');
      break;
    case 'October':
      formattedDateWord = dateWord.slice(0,4);
      break;
    default:
      formattedDateWord = dateWord.slice(0,3);
      break;
    }
  return formattedDateWord;
}

export function testLogging(totalItemsObject){
  console.log(`---`);
  console.log(totalItemsObject.steps);
  console.log(totalItemsObject.calories);
  console.log(totalItemsObject.elevationGain);
  console.log(totalItemsObject.activeMinutes);
}