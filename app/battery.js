import { battery } from "power";
import * as appConstants from "../common/constants";

const appSettings = appConstants.globalAppSettings;
const batteryLowPercent = 20;

export function calculateBatteryPercentage(){
  let batteryValues = {
    level: battery.chargeLevel,
    color: "",
    display: ""
  };
  const level = battery.chargeLevel;
  
  if(level == 100){
    batteryValues.color = appSettings.subTextColor;
    batteryValues.display = `inline`;
  } else if(level < batteryLowPercent){
    batteryValues.color = appSettings.mainTextColor;
    batteryValues.display = `inline`;
  } else {
    batteryValues.color = appSettings.backgroundColor;
    batteryValues.display = `none`;
  }
  
  return batteryValues;
};

export function determineBatteryIcon(){
  const imageFolderPath = `icons/`;
  const imageFileType = `.png`;
  let batteryIconType = ``;
  const currentBatteryLevel = battery.chargeLevel;
  
  switch(true){
    case currentBatteryLevel < batteryLowPercent:
      batteryIconType = `battery-0`;
      break;
    case currentBatteryLevel < 40:
      batteryIconType = `battery-1`;
      break;
    case currentBatteryLevel < 60:
      batteryIconType = `battery-2`;
      break;
    case currentBatteryLevel < 90:
      batteryIconType = `battery-3`;
      break;
    case currentBatteryLevel <= 100:
      batteryIconType = `battery-4`;
      break;
  };
  
  return imageFolderPath + batteryIconType + imageFileType;
}

export function moveBPMDisplayArea(){
  
};