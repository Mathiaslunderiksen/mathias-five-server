import five from 'johnny-five';


const arduino = {}

arduino.devices = [];

arduino.init = () => {

    let board = new five.Board({port : "/dev/cu.usbmodem101"});
    
    const setup = () => {
        
        const pwmPins = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        pwmPins.forEach(pin => {
            arduino.devices.push(new five.Led(pin));
          });
    }

    

    board.on("ready", () => {

        setup();
 
    });

}


export default arduino;