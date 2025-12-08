import { trusted } from "mongoose";
import Transaction from "../models/Transaction.js";

const getSummary = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const currentMonthIncome = await Transaction.aggregate([
            { $match: { userId, type: "income", date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ]);

        const currentMonthExpense = await Transaction.aggregate([
            { $match: { userId, type: "expense", date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ]);

        const incomeResult = await Transaction.aggregate([
            { $match: { userId, type: "income" } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ]);

        const expenseResult = await Transaction.aggregate([
            { $match: { userId, type: "expense" } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
        ]);

        const income = incomeResult[0]?.totalAmount || 0;
        const expenses = expenseResult[0]?.totalAmount || 0;

        const summary = {
            balance: income - expenses,
            income: currentMonthIncome[0]?.totalAmount || 0,
            expenses: currentMonthExpense[0]?.totalAmount || 0,
            savings: income - expenses,
        };

        res.status(200).json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch summary" });
    }
};

const fetchYearlyCategoricalSpendings = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const startOfYear = new Date(new Date().getFullYear(), 0, 1);

        const categorySpendings = await Transaction.aggregate([
            {
                $match: {
                    userId,
                    type: "expense",
                    date: { $gte: startOfYear }
                }
            },
            {
                $group: {
                    _id: "$category",
                    totalSpent: { $sum: "$amount" }
                }
            },
            { $sort: { totalSpent: -1 } }
        ]);

        const labels = categorySpendings.map(c => c._id);
        const data = categorySpendings.map(c => c.totalSpent);

        return res.status(200).json({ labels, data });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch yearly category spending" });
    }
};


const fetchMonthlyCategoricalSpendings = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

        const categorySpendings = await Transaction.aggregate([
            {
                $match: {
                    userId,
                    type: "expense",
                    date: { $gte: startOfMonth }
                }
            },
            {
                $group: {
                    _id: "$category",
                    totalSpent: { $sum: "$amount" }
                }
            },
            { $sort: { totalSpent: -1 } }
        ]);

        const labels = categorySpendings.map(c => c._id);
        const data = categorySpendings.map(c => c.totalSpent);

        return res.status(200).json({ labels, data });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch monthly category spending" });
    }
};

const fetchMonthlyData = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const startOfYear = new Date(new Date().getFullYear(), 0, 1);

        const monthly = await Transaction.aggregate([
            {
                $match: {
                    userId,
                    date: { $gte: startOfYear }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        type: "$type"
                    },
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.month": 1 } }
        ]);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const income = Array(12).fill(0);
        const expenses = Array(12).fill(0);

        for (const rec of monthly) {
            const index = rec._id.month - 1;

            if (rec._id.type === "income") income[index] = rec.total;
            else expenses[index] = rec.total;
        }

        res.status(200).json({
            x: months,
            income,
            expenses
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch monthly data" });
    }
};

const fetchDailyData = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const day = today.getDay(); // Sun = 0
        const diff = (day === 0 ? -6 : 1 - day); // get Monday

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() + diff);

        const daily = await Transaction.aggregate([
            {
                $match: {
                    userId,
                    date: { $gte: startOfWeek }
                }
            },
            {
                $group: {
                    _id: {
                        day: { $dayOfWeek: "$date" }, // Sun=1 → Sat=7
                        type: "$type"
                    },
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { "_id.day": 1 } }
        ]);

        const income = Array(7).fill(0);
        const expenses = Array(7).fill(0);

        for (const rec of daily) {
            const mongoDay = rec._id.day; // 1–7
            const index = (mongoDay + 5) % 7; // Convert Sun=1 to last position

            if (rec._id.type === "income") income[index] = rec.total;
            else expenses[index] = rec.total;
        }

        res.status(200).json({
            x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            income,
            expenses
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch daily data" });
    }
};

export { getSummary, fetchMonthlyData, fetchDailyData, fetchMonthlyCategoricalSpendings, fetchYearlyCategoricalSpendings };
