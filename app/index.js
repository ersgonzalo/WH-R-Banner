import clock from "clock";
import HeartRateSensor from "heart-rate"
import document from "document";
import { today } from 'user-activity';
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const mainClockTime = document.getElementById("mainClockTime");
const mainDateTimeDay = document.getElementById("mainDateTimeDay");

const mainHeartRate = document.getElementById("mainHeartRate");
const mainStepsTaken = document.getElementById("mainStepsTaken");
const mainCaloriesBurned = document.getElementById("mainCaloriesBurned");
const mainElevationClimbed = document.getElementById("mainElevationClimbed");
const mainActiveTime = document.getElementById("mainActiveTime");

// For the Heartrate Monitor
let hrm = new HeartRateSensor();

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let todayTime = evt.date;
  let hours = todayTime.getHours();
  let dayOfWeek = util.convertDayOfWeekFromNumber(todayTime.getDay());
  let monthName = util.convertMonthFromNumber(todayTime.getMonth());
  let todayDate = todayTime.getDate();
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(todayTime.getMinutes());
  mainClockTime.text = `${hours}:${mins}`;
  mainDateTimeDay.text = `${dayOfWeek}, ${monthName} ${todayDate}`;
  mainStepsTaken.text = `${today.local.steps} steps`;
  mainCaloriesBurned.text = `${today.local.calories} calories`;
  mainElevationClimbed.text = `${today.local.elevationGain} floors`;
  mainActiveTime.text = `${today.local.activeMinutes} mins active`;
}
hrm.onreading = function () {
    mainHeartRate.text = `${hrm.heartRate} bpm`;  
}
hrm.start();
