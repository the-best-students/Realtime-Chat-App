import { Router } from 'express';

import { protectedRoute } from '../middleware/protectRoute.js';
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from '../controllers/messageController.js';
const router = Router();
router.use(protectedRoute);
router.get('/contacts', getAllContacts);
router.get('/chats', getChatPartners);
router.get('/:id', getMessagesByUserId);
router.post('/send/:id', sendMessage);

export default router;
