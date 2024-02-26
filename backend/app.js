import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import userRoutes from './routes/userRoutes.js';
import dbConnection from './config/db.conn.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Express middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));




// Routes
app.use("/users", userRoutes);






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
