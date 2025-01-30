import mongoose from "mongoose";
import express from "express";
// import { User } from "../models/accountSchema.js";

const router = express.Router();

router.post("/:uid", async (req, res) => {
	try {
		const { user } = req.params.uid;
	} catch (error) {
		console.log(error.message);
		return res.status(500).send({ message: error.message });
	}
});

router.get("/:uid/:date", async (req, res) => {
	try {
		const { user } = req.params.uid;
		const { date } = req.params.date;
	} catch (error) {}
});

export default router;
