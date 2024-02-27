import express from 'express';
const router = express.Router();
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';

router.get('/', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);


export default router;
