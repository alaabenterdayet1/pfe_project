import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    dbName: 'learnode', // Nom de votre base de données (facultatif)
}).then(() => {
    console.log('Connexion à la base de données réussie');
}).catch((err) => {
    console.error('Erreur de connexion à la base de données', err);
});

export default mongoose.connection;
