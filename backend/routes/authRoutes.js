import express from 'express';
const router = express.Router();
import { login, register, logout } from '../controllers/authController.js';

// Dummy login route
router.get('/login', login);

// Dummy register route
router.get('/register', register);

// Dummy logout route
router.get('/logout', logout);

export default router;
