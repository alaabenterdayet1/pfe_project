import express from 'express';
const authRoutes = express.Router();


import { register, login } from '../controllers/authController.js';



// Route for user registration
authRoutes.post('/register', register);

// Route for user login
authRoutes.post('/login', login);

export default authRoutes;
