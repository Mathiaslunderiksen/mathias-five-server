import { restart, turnOff, turnOn } from "../handlers/commands.handler.js";

const sockets = (socket) => {

    // Her lytter vi på en besked fra klienten
    socket.on('on', (data) => {
        turnOn(data.index, data.speed, data.direction);
    });

    socket.on('off', () => {
        turnOff()
    });

    socket.on('restart', (data) => {
        restart(data.index, data.speed, data.direction)
    });
  
}

export default sockets;