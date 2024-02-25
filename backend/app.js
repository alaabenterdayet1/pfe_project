
//EXPRESS
import express from 'express';

const app = express();

//CONTROLLERS
import {router as eventsRouter} from './routes/Events.js';
import {router as registerEventsRouter} from './routes/RegisterEvents.js';


// JSON DATA HANDLING MIDDLEWARE
import bodyParser from 'body-parser';
app.use(bodyParser.json());

//CORS MIDDLEWEAR
import cors from 'cors';
app.use(cors());

/*ROUTING*/
app.use('/events',eventsRouter);
app.use('/registerEvents',registerEventsRouter);


app.listen(3000,()=>{
    console.log("Listening on port 3000");
});