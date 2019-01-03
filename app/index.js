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
const batteryDisplay = document.getElementById("batteryDisplay");
const batteryIcon = document.getElementById("batteryIcon");

// Set the z-Index for the Battery section
batteryDisplay.layer = 2;
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
  
  //Format the Display in our Text Areas
  mainClockTime.text = `${hours}:${mins}`;
  mainDateTimeDay.text = `${dayOfWeek}, ${monthName} ${todayDate}`;
  mainStepsTaken.text = `${today.local.steps} steps`;
  mainCaloriesBurned.text = `${today.local.calories} calories`;
  mainElevationClimbed.text = `${today.local.elevationGain} floors`;
  mainActiveTime.text = `${today.local.activeMinutes} mins active`;
  doBatteryReading();
};

// For the Heartrate Monitor
let hrm = new HeartRateSensor();
let hasHeartRateAreaBeenMoved = false;

function doBatteryReading(){
  let currentBatteryLevel = battery.calculateBatteryPercentage().level;
  batteryDisplay.text = `${currentBatteryLevel}%`;
  batteryDisplay.style.fill = `${battery.calculateBatteryPercentage().color}`;
  batteryDisplay.style.display = `${battery.calculateBatteryPercentage().display}`;
  batteryIcon.href = `${battery.determineBatteryIcon()}`;
  
  //Set the top bar not to be overlapped by Fitbit's Default Bar
  if(currentBatteryLevel > 17 && hasHeartRateAreaBeenMoved){
    //heartRateGroup.groupTransform.translate.x = 0;
    heartRateGroup.animate("disable");
    hasHeartRateAreaBeenMoved = false;
  } else if(currentBatteryLevel < 17 && !hasHeartRateAreaBeenMoved) {
    //heartRateGroup.groupTransform.translate.x = 47;
    heartRateGroup.animate("enable");
    hasHeartRateAreaBeenMoved = true;
  }
};

// Regonize if user has the Device equipped
let body = new BodyPresenceSensor();
body.onreading = () => {
  if (!body.present) {
    mainHeartRate.text = `-- bpm`;
    hrm.stop();
  } else {
    hrm.start();
  }
};
body.start();

//Still not sure what to do with this HR Section
hrm.onreading = function () {
  mainHeartRate.text = `${hrm.heartRate} bpm`;
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