import mongoose from "mongoose";
import express from "express";
import { User } from "../models/accountSchema.js";

const router = express.Router();

// router.post("/create", async (req, res) => {
// 	try {
// 		const { uid } = req.body;

// 		if (!uid) {
// 			return res.status(400).json({
// 				message: "Missing required field: uid",
// 			});
// 		}

// 		const existingUser = await User.findOne({ userId: uid });
// 		if (existingUser) {
// 			return res.status(409).json({
// 				message: "User already exists with this uid",
// 			});
// 		}

// 		const newUser = new User({
// 			userId: uid,
// 			logs: [],
// 		});

// 		await newUser.save();

// 		return res.status(201).json({
// 			message: "User created successfully",
// 			user: newUser,
// 		});
// 	} catch (error) {
// 		console.error(error.message);
// 		return res.status(500).json({
// 			message: "Internal Server Error",
// 		});
// 	}
// });

router.post("/:date", async (req, res) => {
	try {
		const { date } = req.params;
		const { uid, type, category, amount, note } = req.body;

		if (!uid || !type || !category || amount === undefined) {
			return res
				.status(400)
				.json({ message: "Missing required fields." });
		}

		const user = await User.findOne({ userId: uid });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const newTransaction = { type, category, amount, note: note || "" };

		const dateLog = user.logs.find((log) => log.date === date);

		if (dateLog) {
			dateLog.transactions.push(newTransaction);
		} else {
			user.logs.push({ date, transactions: [newTransaction] });
		}

		await user.save();

		return res
			.status(200)
			.json({ message: "Transaction added successfully", user });
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

router.post("/transactions", async (req, res) => {
	try {
		const { uid, date } = req.body; 

		if (!uid || !date) {
			return res
				.status(400)
				.json({ message: "Missing required fields: uid and date" });
		}

		const user = await User.findOne({ userId: uid });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const dateLog = user.logs.find((log) => log.date === date);
		if (!dateLog) {
			return res
				.status(404)
				.json({ message: "No transactions found for this date" });
		}

		return res.status(200).json({
			message: "Transactions retrieved successfully",
			transactions: dateLog.transactions,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

export default router;
