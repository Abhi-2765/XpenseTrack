import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true,
		enum: ["income", "expense"],
	},
	category: {
		type: String,
		required: true,
		trim: true,
	},
	amount: {
		type: Number,
		required: true,
		min: 0,
	},
	note: {
		type: String,
		trim: true,
		default: "",
	},
});

const DailyLogSchema = new mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	transactions: [TransactionSchema],
});

const AccountSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			unique: true,
		},
		logs: [DailyLogSchema],
	},
	{
		collection: "user_data",
	}
);



export const User = mongoose.model("User", AccountSchema);
