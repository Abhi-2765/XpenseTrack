import authenticateUser from '../middleware/authenticationMiddleware.js';
import { createBudget, fetchBudget } from '../controllers/budgetController.js';

import express from 'express';

const router = express.Router();

router.post('/add', authenticateUser, createBudget);
router.get('/fetch', authenticateUser, fetchBudget);

export default router;