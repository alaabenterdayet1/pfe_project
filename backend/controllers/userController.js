import { UserModel } from '../models/User.js';
import { errorHandlerMiddleware } from '../middlewares/errorHandlerMiddleware.js'; // Import the errorHandlerMiddleware

// GET /users
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        // Pass the error to the errorHandlerMiddleware
        errorHandlerMiddleware(error, req, res);
    }
};

// GET /users/:id
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        // Pass the error to the errorHandlerMiddleware
        errorHandlerMiddleware(error, req, res);
    }
};

//CREATE USER
export const createUser = async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        // Pass the error to the errorHandlerMiddleware
        errorHandlerMiddleware(error, req, res);
    }
};

//UPDATE USER
export const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        // Pass the error to the errorHandlerMiddleware
        errorHandlerMiddleware(error, req, res);
    }
};

// DELETE USER
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        // Pass the error to the errorHandlerMiddleware
        errorHandlerMiddleware(error, req, res);
    }
};
export const getLatestUser = async (req, res) => {
    try {
        // Recherche du dernier utilisateur créé en triant par date de création décroissante
        const latestUser = await UserModel.findOne().sort({ createdAt: -1 });
        
        if (!latestUser) {
            return res.status(404).json({ error: "No users found" });
        }
        
        res.json(latestUser);
    } catch (error) {
        console.error("Error fetching latest user:", error);
        // Passer l'erreur au middleware de gestion des erreurs
        errorHandlerMiddleware(error, req, res);
    }
};