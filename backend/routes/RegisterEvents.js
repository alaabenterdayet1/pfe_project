import express from 'express';
const router = express.Router();
import {registerForEvent,getUsersForEvent,deleteRegistration} from '../controllers/registerEventsController.js'


router.route('/:eventId')     
    .post(registerForEvent)
    .get(getUsersForEvent);
router.route('/:registrationID')
    .delete(deleteRegistration)
export{router}