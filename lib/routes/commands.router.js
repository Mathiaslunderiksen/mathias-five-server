import express from 'express';
import {turnOn, turnOff} from "../handlers/commands.handler.js";
// Setting Routes
const commandsRouter = express.Router();

commandsRouter.get('/commands/on', async (req, res) => {

    turnOn();
    return res.json({status: true});

});

commandsRouter.get('/commands/off', async (req, res) => {

    turnOff();
    return res.json({status: true});
    
});

export default commandsRouter;