import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import dbConnection from './config/db.conn.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// EXPRESS MIDDLEWEARS
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

/******************************************** */
//IMPORT ROUTES
import userRoutes from './routes/userRoutes.js';



// ROUTES
app.use("/users", userRoutes);




/******************************************** */

//DONT TOUCH
const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
