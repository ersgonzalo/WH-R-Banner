import { battery } from "power";

export function calculateBatteryPercentage(){
  let batteryValues = {
    level: battery.chargeLevel,
    color: "",
    display: ""
  };
  const level = battery.chargeLevel;
  
  if(level == 100){
    batteryValues.color = `fb-green`;
    batteryValues.display = `inline`;
  } else if(level < 25){
    batteryValues.color = `white`;
    batteryValues.display = `inline`;
  } else {
    batteryValues.color = `black`;
    batteryValues.display = `none`;
  }
  
  return batteryValues;
}

export function determineBatteryIcon(){
  const imageFolderPath = `icons/`;
  const imageFileType = `.png`;
  let batteryIconType = ``;
  const currentBatteryLevel = battery.chargeLevel;
  
  switch(true){
    case currentBatteryLevel < 25:
      batteryIconType = `battery-0`;
      break;
    case currentBatteryLevel < 40:
      batteryIconType = `battery-1`;
      break;
    case currentBatteryLevel < 60:
      batteryIconType = `battery-2`;
      break;
    case currentBatteryLevel < 100:
      batteryIconType = `battery-3`;
      break;
    case currentBatteryLevel == 100:
      batteryIconType = `battery-4`;
      break;
  }
  
  return imageFolderPath + batteryIconType + imageFileType;
}

export function moveBPMDisplayArea(){
  
}