import express from 'express';
const router = express.Router();
import {
  login,
  register,
  logout,
  updateProfile,
  checkedUser,
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

router.get('/check', protectedRoute, checkedUser);

export default router;
