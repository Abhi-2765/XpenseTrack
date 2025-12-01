import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

// Add a new transaction
export const addTransaction = async (req, res) => {
    try {
        const { amount, type, category, note } = req.body;

        const newTransaction = new Transaction({
            userId: req.user.userId,
            amount,
            type,
            category,
            note,
        });

        const savedTransaction = await newTransaction.save();
        res.status(201).json({ message: "Transaction added successfully", savedTransaction });
    } catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

// Get transaction history (with pagination and filters)
export const getTransactionHistory = async (req, res) => {
    try {
        const { page = 1, limit = 10, type, category, date } = req.body;

        if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        const query = { userId: new mongoose.Types.ObjectId(req.user.userId) };
        if (type) query.type = type;
        if (category) query.category = category;
        if (date) query.date = { $eq: new Date(date) };

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        const total = await Transaction.countDocuments(query);
        const transactions = await Transaction.find(query)
            .sort({ date: -1 })
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);

        res.status(200).json({
            totalPages: Math.ceil(total / limitNum),
            transactions,
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {

};

// Update transaction
export const updateTransaction = async (req, res) => {

};
