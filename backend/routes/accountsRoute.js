import express from "express";
import { User } from "../models/accountSchema.js";

const router = express.Router();

router.post("/transactions", async (req, res) => {
	try {
		const { uid, date, transaction } = req.body;
		const { type, category, amount, note = "" } = transaction;

		if (!uid || !type || !category || amount === undefined) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const user = await User.findOneAndUpdate(
			{ userId: uid, "logs.date": date },
			{
				$push: {
					"logs.$.transactions": { type, category, amount, note },
				},
			},
			{ new: true }
		);

		if (!user) {
			await User.findOneAndUpdate(
				{ userId: uid },
				{
					$push: {
						logs: {
							date,
							transactions: [{ type, category, amount, note }],
						},
					},
				},
				{ upsert: true, new: true }
			);
		}

		res.status(200).json({ message: "Transaction added successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.get("/transactions", async (req, res) => {
	try {
		const { uid, date } = req.query;

		if (!uid || !date) {
			return res
				.status(400)
				.json({ message: "Missing required fields: uid and date" });
		}

		const user = await User.findOne(
			{ userId: uid },
			{ logs: { $elemMatch: { date } } }
		);

		if (!user || !user.logs.length) {
			return res.status(200).json({
				message: "Transactions retrieved successfully",
				transactions: [],
			});
		}

		res.status(200).json({
			message: "Transactions retrieved successfully",
			transactions: user.logs[0].transactions || [],
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.delete("/transactions", async (req, res) => {
	try {
		const { uid, date, transactionId } = req.query;

		if (!uid || !date || !transactionId) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const user = await User.findOneAndUpdate(
			{ userId: uid, "logs.date": date },
			{ $pull: { "logs.$.transactions": { _id: transactionId } } },
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({ message: "Transaction not found" });
		}

		res.status(200).json({
			message: "Transaction deleted successfully",
			user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

export default router;
