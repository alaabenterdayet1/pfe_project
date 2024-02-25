 import { registrationsCollection } from '../models/registerEvents.model.js';
 import {ObjectId} from 'mongodb';
class User {
    constructor(id, firstName, lastName, email, telephone) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.telephone = telephone;
    }
}

const registerForEvent = (req, res) => {
    const eventId = req.params.eventId;

    const user = req.body.user;
    console.log(user);

    const registration = {
        eventId : eventId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        telephone: user.telephone
    }


    registrationsCollection
        .insertOne(registration)
        .then(dbRes => {
            res.json(dbRes);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
};

const getUsersForEvent = (req, res) => {
    const eventId = req.params.eventId;
    registrationsCollection
        .find({ eventId: eventId })
        .toArray()
        .then(registrations => {
            res.json(registrations);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });

};
const deleteRegistration = (req, res) => {
    const id = req.params.registrationID;
    registrationsCollection
        .deleteOne({ _id: new ObjectId(id) })
        .then(dbRes => {
            res.json(dbRes);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
};
export { registerForEvent, getUsersForEvent,deleteRegistration, User };
