import arduino from "../arduino/arduino.js";

const devices = arduino.devices;
let shouldStop = false;
let loopTimeout = [];

export const turnOn = async (index = 0, speed, direction) => {
  
  if(devices) {
    shouldStop = false;

    async function turnOnOffLeds(index, speed, direction) {
      if(shouldStop){
        turnOff();
        return;
      }

      if(direction){
        if (index >= devices.length) {
          index = 0; 
        }
      } else {
        if (index <= 0) {
          index = devices.length - 1; 
        }
      }
  
      let led = devices[index];
  
      
      led.on();
  
      const turnOffTimeout = setTimeout(() => {
        if(shouldStop){
          turnOff();
          return
        }
        led.off();
  
        const nextTimeout = setTimeout(() => {
          if(direction){
            turnOnOffLeds(index + 1, speed, direction);
          } else {
            turnOnOffLeds(index - 1, speed, direction)
          }
        }, 10);
        loopTimeout.push(nextTimeout)
      }, speed); 
      loopTimeout.push(turnOffTimeout)
    }
  
    turnOnOffLeds(index, speed, direction);

  }

  return true;

};

export const turnOff = async () => {
  if(devices) {
      shouldStop = true;
      loopTimeout.forEach(timeout => clearTimeout(timeout));
      loopTimeout = []; 
        devices.forEach(led => {
        led.off()
      });
   
  }
    return true;

};

export const restart = async (index = 0, speed, direction) => {
  await turnOff();
  shouldStop = false;
  await turnOn(index, speed, direction)
}
