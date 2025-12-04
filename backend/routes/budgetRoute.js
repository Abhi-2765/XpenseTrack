import authenticateUser from '../middleware/authenticationMiddleware.js';
import { createBudget } from '../controllers/budgetController.js';

import express from 'express';

const router = express.Router();

router.post('/add', authenticateUser, createBudget);

export default router;