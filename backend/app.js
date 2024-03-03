import dotenv from 'dotenv';
dotenv.config();
/************************************ */
import express from 'express';
import dbConnection from './config/db.conn.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js'; 

const app = express();

// EXPRESS MIDDLEWARES
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(errorHandlerMiddleware);
app.disable('x-powered-by');     
/******************************************** */

// IMPORT ROUTES
import  userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';


// ROUTES
app.use("/users", userRouter);
app.use("/auth", authRouter);

/******************************************** */

//DONT TOUCH
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
