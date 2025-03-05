import express from 'express';
import { login, logout, singup } from '../controller/authController.js';

const router = express.Router();

router.post('/login', login)
router.post('/signup', singup)
router.post('/logout', logout);

export default router;