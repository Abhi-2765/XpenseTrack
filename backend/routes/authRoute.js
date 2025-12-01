import express from 'express';
import { forgetPassword, login, logout, register, checkAuth } from '../controllers/authController.js';
const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.post('/logout', logout);

router.post('/forget-password', forgetPassword);

router.get('/check-auth', checkAuth);

export default router;