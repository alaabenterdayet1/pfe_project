import {
    eventsCollection
} from '../models/events.model.js';
import {
    ObjectId
} from 'mongodb';
const getAllEvents = (req, res) => {
    eventsCollection
        .find({
            $or: [{
                hidden: false
            }, {
                hidden: {
                    $exists: false
                }
            }]
        })
        .toArray()
        .then(allEvents => {
            res.json(allEvents);
        });

}


const addEvent = (req, res) => {
    const newEvent = {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        hidden: false
    }
    eventsCollection
        .insertOne(newEvent)
        .then(dbRes => {
            res.json(dbRes);
        })
}

const updateEvent = (req, res) => {
    const id = req.body._id
    delete req.body._id;
    const updatedEvent = req.body
    eventsCollection
        .findOneAndUpdate({
            _id: new ObjectId(id)
        }, {
            $set: updatedEvent
        }, {
            returnOriginal: false
        })
        .then(dbRes => {
            res.json(dbRes)
        })
        .catch(err => {
            console.log(err)
        })
}
const deleteEvent = (req, res) => {
    const id = req.params.id
    eventsCollection
        .findOneAndUpdate({
            _id: new ObjectId(id)
        }, {
            $set: {
                hidden: true
            }
        })
        .then(dbRes => {
            res.json(dbRes)
        })
        .catch(err => {
            console.log(err)
        })
}
export {getAllEvents, addEvent, updateEvent, deleteEvent}