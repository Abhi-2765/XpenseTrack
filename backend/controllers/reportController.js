import Transaction from "../models/Transaction.js";

const getSummary = async (req, res) => {
    try {
        const userId = req.userId;

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

export { getSummary };
