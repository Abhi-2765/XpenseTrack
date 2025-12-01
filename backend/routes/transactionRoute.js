import express from "express";
import {
  addTransaction,
  getTransactionHistory,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactionController.js";
import authenticateUser from "../middleware/authenticationMiddleware.js";

const router = express.Router();

// POST /api/transactions/add
router.post("/add", authenticateUser, addTransaction);

// POST /api/transactions/history
router.post("/history", authenticateUser, getTransactionHistory);

// DELETE /api/transactions/delete/:id
router.delete("/delete/:id", authenticateUser, deleteTransaction);

// PUT /api/transactions/update/:id
router.put("/update/:id", authenticateUser, updateTransaction);

export default router;
