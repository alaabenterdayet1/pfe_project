import express from 'express';
import { register, login, verifyUser, generateOTP ,verifyOTP,createResetSession,updateUser,resetPassword} from '../controllers/authController.js';
import { Auth, localVariables } from '../middlewares/authMiddleware.js';

const router = express.Router();



//post routes
router.route('/register').post(register); // register route
router.route('/login').post(login); // login route
router.route('/verifyUser').post(verifyUser , (req, res) => {res.send({ message: 'User Verified' });}); // verify user route



//get routes
router.route('/generateOTP').get(verifyUser, localVariables, generateOTP); // generate random OTP route
router.route('/verifyOTP').get(verifyUser,  verifyOTP); // verify OTP route
router.route('/createResetSession').get( createResetSession); // create reset session route


//put routes
router.route('/resetPassword').put(resetPassword); // reset password route
router.route('/updateUser').put(Auth, updateUser); // update user route
export default router;
