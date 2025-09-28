import express from 'express';
const router = express.Router();
import { login, register, logout } from '../controllers/authController.js';

// Dummy login route
router.post('/login', login);

// Dummy register route
router.post('/register', register);

// Dummy logout route
router.post('/logout', logout);

export default router;
