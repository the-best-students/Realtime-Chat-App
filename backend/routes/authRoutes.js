import express from 'express';
const router = express.Router();
import {
  login,
  register,
  logout,
  updateProfile,
} from '../controllers/authController.js';
import { protectedRoute } from '../middleware/protectRoute.js';

// Dummy login route
router.post('/login', login);

// Dummy register route
router.post('/register', register);

// Dummy logout route
router.post('/logout', logout);

// update profile

router.put('/updatePro', protectedRoute, updateProfile);

export default router;
