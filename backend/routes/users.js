import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUserToChat } from '../controller/userController.js';

const router = express.Router();

router.get('/', protectRoute, getUserToChat);

export default router;