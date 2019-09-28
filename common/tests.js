//Increment the Date Values for Easier Formatting
export function testMonths(currentMonth){
  if(currentMonth == 11)
     currentMonth = 0;
  else
    currentMonth++;
  
  return currentMonth;
};

export function testDaysOfWeek(currentDay){
  if(currentDay == 6)
     currentDay = 0;
  else
    currentDay++;
  
  return currentDay;
}

export function testDates(currentDate){
  if(currentDate == 31)
    currentDate = 1;
  else
    currentDate++;
  
  return currentDate;
}