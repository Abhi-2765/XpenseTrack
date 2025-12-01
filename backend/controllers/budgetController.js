import Budget from  '../models/Budget.js';

export const createBudget = async (req, res) => {
    try {
        const {userId, type, category, emoji, allotedAmount} = req.body;
        const newBudget = new Budget({
            userId,
            type,
            category,
            emoji,
            allotedAmount
        });
        const savedBudget = await newBudget.save();
        res.status(201).json({"message": "Budget created successfully", "budget": savedBudget});
    } catch (error) {
        res.status(500).json({"message": "Internal server error"});
    }
}