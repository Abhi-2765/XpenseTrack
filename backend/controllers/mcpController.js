import User from "../models/User.js";
import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

export const verifyMCPAPI = async (req, res) => {
    console.log("Hi MCP");
    try {
        const { mcpAPI } = req.body;
        const user = await User.findOne({ mcpAPI });
        if (!user) {
            return res.status(404).json({ message: "User not found", status: false });
        }
        res.status(200).json({ message: "MCP API verified successfully", userId: user._id, status: true });
    } catch (error) {
        console.log("Error verifying MCP API:", error);
        res.status(500).json({ message: "Internal server error", status: false });
    }
}

export const getExpenseReport = async (req, res) => {
    try {
        const userId = req.headers["userid"];
        const { start_date, end_date } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "UserId missing", status: false });
        }

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        const transactions = await Transaction.find({
            userId,
            type: "expense",
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: -1 });

        const expenseReport = {};

        transactions.forEach(txn => {
            const dateKey = txn.date.toISOString().split("T")[0];

            expenseReport[dateKey] ??= {};
            expenseReport[dateKey][txn.category] ??= 0;
            expenseReport[dateKey][txn.category] += txn.amount;
        });

        return res.status(200).json(expenseReport);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", status: false });
    }
};

export const getCategorizedExpenseReport = async (req, res) => {
    try {
        const userId = req.headers["userid"];
        const { category, start_date, end_date } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "UserId missing", status: false });
        }

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        const transactions = await Transaction.find({
            userId,
            type: "expense",
            category,
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: -1 });

        const categorizedExpenseReport = {
            [category]: {}
        };

        transactions.forEach(txn => {
            const dateKey = txn.date.toISOString().split("T")[0];

            categorizedExpenseReport[category][dateKey] ??= 0;
            categorizedExpenseReport[category][dateKey] += txn.amount;
        });

        return res.status(200).json(categorizedExpenseReport);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", status: false });
    }
};
