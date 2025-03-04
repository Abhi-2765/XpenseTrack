import mongoose from "mongoose";
import express from "express";
import { User } from "../models/accountSchema.js";

const createRouter = express.Router();

createRouter.post("/user", async (req, res) => {
	try {
		const { uid } = req.body;

		if (!uid) {
			return res.status(400).json({
				message: "Missing required field: uid",
			});
		}

		const existingUser = await User.findOne({ userId: uid });
		if (existingUser) {
			return res.status(409).json({
				message: "User already exists with this uid",
			});
		}

		const newUser = new User({
			userId: uid,
			logs: [],
		});

		await newUser.save();

		return res.status(201).json({
			message: "User created successfully",
			user: newUser,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
});

export default createRouter;
