import clock from "clock";
import HeartRateSensor from "heart-rate"
import document from "document";
import { today } from 'user-activity';
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import * as battery from "./battery";
import * as util from "../common/utils";

// Update the Clockface every Second
clock.granularity = "seconds";

// Get a handle on the Document elements (Text, Image, etc)
const mainClockTime = document.getElementById("mainClockTime");
const mainDateTimeDay = document.getElementById("mainDateTimeDay");
const mainHeartRate = document.getElementById("mainHeartRate");
const heartRateGroup = document.getElementById("heartRateGroup");
const mainStepsTaken = document.getElementById("mainStepsTaken");
const mainCaloriesBurned = document.getElementById("mainCaloriesBurned");
const mainElevationClimbed = document.getElementById("mainElevationClimbed");
const mainActiveTime = document.getElementById("mainActiveTime");
const batteryDisplayText = document.getElementById("batteryDisplayText");
const batteryIcon = document.getElementById("batteryIcon");

// Set the z-Index for the Battery section
batteryDisplayText.layer = 2;
batteryIcon.layer = 1;

// Update the Clockface Elements every tick based on the current time
clock.ontick = (evt) => {
  let todayTime = evt.date;
  let hours = todayTime.getHours();
  let dayOfWeek = util.convertDayOfWeekFromNumber(todayTime.getDay());
  let monthName = util.convertMonthFromNumber(todayTime.getMonth());
  let todayDate = todayTime.getDate();
  hours = util.formatHoursDisplay(hours);
  let mins = util.zeroPad(todayTime.getMinutes());
  
  // Format the Display in our Text Areas
  mainClockTime.text = `${hours}:${mins}`;
  mainDateTimeDay.text = `${dayOfWeek}, ${monthName} ${todayDate}`;
  mainStepsTaken.text = `${util.checkIfDigit(today.local.steps)} steps`;
  mainCaloriesBurned.text = `${util.checkIfDigit(today.local.calories)} calories`;
  mainElevationClimbed.text = `${util.checkIfDigit(today.local.elevationGain)} floors`;
  mainActiveTime.text = `${util.checkIfDigit(today.local.activeMinutes)} mins active`;
  //util.testLogging(today.local);
  doBatteryReading();
};

// For the Heartrate Monitor
let hrm = new HeartRateSensor();
let hasHeartRateAreaBeenMoved = false;

function doBatteryReading(){
  let batteryStats = battery.calculateBatteryPercentage();
  let currentBatteryLevel = batteryStats.level;
  batteryDisplayText.text = `${currentBatteryLevel}%`;
  batteryDisplayText.style.fill = `${batteryStats.color}`;
  batteryDisplayText.style.display = `${batteryStats.textDisplay}`;
  batteryIcon.href = `${battery.determineBatteryIcon()}`;
  batteryIcon.style.display = `${batteryStats.iconDisplay}`;
  
  // Set the top bar not to be overlapped by Fitbit's Default Bar
  let batteryNotDisplayed = currentBatteryLevel > 17 && hasHeartRateAreaBeenMoved && !batteryStats.isDeviceCharging;
  // Battery has to be less than 17% or charging
  let batteryIsDisplayed = (currentBatteryLevel < 17 || batteryStats.isDeviceCharging) && !hasHeartRateAreaBeenMoved;
  
  if(batteryNotDisplayed){
    heartRateGroup.animate("disable");
    hasHeartRateAreaBeenMoved = false;
  } else if(batteryIsDisplayed) {
    heartRateGroup.animate("enable");
    hasHeartRateAreaBeenMoved = true;
  }
};

// Recgonize if user has the Device equipped
let body = new BodyPresenceSensor();
body.onreading = () => {
  if (!body.present) {
    mainHeartRate.text = `-- bpm`;
    hrm.stop();
  } else {
    hrm.start();
    let currentHeartRate = util.checkIfDigit(hrm.heartRate);
    mainHeartRate.text = `${currentHeartRate} bpm`;
  }
};
body.start();

// Still not sure what to do with this HR Section
hrm.onreading = function () {
  let currentHeartRate = util.checkIfDigit(hrm.heartRate);
  mainHeartRate.text = `${currentHeartRate} bpm`;
};
hrm.onerror = function () {
  mainHeartRate.text = `-- bpm`;
  hrm.stop();
};

display.onchange = () => {
  if(display.on && body.present)
    hrm.start();
  else
    hrm.stop();
};