import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import { PORT, DB_URL } from "./config.js";
import { User } from "./models/accountSchema.js";
import router from "./routes/accountsRoute.js";
import createRouter from "./routes/createRoute.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	return res.status(200).send("Hello World");
});

app.use("/create", createRouter);
app.use("/", router);

await mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		app.listen(process.env.PORT || 3000, () => {
			console.log("Listening in PORT 3000");
		});
	})
	.catch((error) => {
		console.log(error.message);
	});
