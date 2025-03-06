import express from 'express';
import { getSendToMessage, sendMessage } from '../controller/messageController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/:id", protectRoute, getSendToMessage);
router.post("/send/:id", protectRoute, sendMessage);


export default router;