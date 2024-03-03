import { Router } from 'express';
const router = Router();

import { getUserById, getUsers, createUser, updateUser, deleteUser, getLatestUser } from '../controllers/userController.js';

// Route pour obtenir tous les utilisateurs
router.route('/')
    .get(getUsers)
    .post(createUser);

// Route pour obtenir le dernier utilisateur créé
router.route('/latest')
    .get(getLatestUser);

// Route pour obtenir, mettre à jour et supprimer un utilisateur par ID
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export default router;
