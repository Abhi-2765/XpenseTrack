import express from "express";
import { verifyMCPAPI, getExpenseReport, getCategorizedExpenseReport } from "../controllers/mcpController.js";
const router = express.Router();

router.post('/verifyMCPAPI', verifyMCPAPI);
router.post('/getExpenseReport', getExpenseReport);
router.post('/getCategorizedExpenseReport', getCategorizedExpenseReport);

export default router;