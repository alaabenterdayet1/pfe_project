import express from 'express';
const router = express.Router();


import {updateEvent, addEvent, getAllEvents,deleteEvent} from '../controllers/eventsController.js'

router.route('/')
    .get(getAllEvents)
    .post(addEvent)
    .put(updateEvent)
router.route('/:id')
    .delete(deleteEvent)
export{router}