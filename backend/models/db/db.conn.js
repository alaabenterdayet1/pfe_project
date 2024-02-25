import { MongoClient, ObjectId } from "mongodb";
import { config } from 'dotenv';
config();

let db = new MongoClient(process.env.URI).db("eventsmanagement");
export { db, ObjectId };