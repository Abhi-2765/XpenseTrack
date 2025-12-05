import Budget from '../models/Budget.js';

export const createBudget = async (req, res) => {
    try {
        const { name, emoji, type, amount } = req.body;
        const newBudget = new Budget({
            userId: req.userId,
            name: name,
            type: type,
            emoji: emoji,
            allotedAmount: amount
        });
        const savedBudget = await newBudget.save();
        res.status(201).json({ "message": "Budget created successfully" });
    } catch (error) {
        res.status(500).json({ "message": "Internal server error" });
    }
}

export const fetchBudget = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(500).json({ "message": "Unable to fetch information" });
        }

        const budgets = await Budget.find({ userId: userId }).select("-userId");

        res.status(200).json({ "budgets": budgets });
    } catch (error) {
        res.status(500).json({ "message": "Internal server error" });
    }
}