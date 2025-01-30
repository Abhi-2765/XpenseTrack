import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, DB_URL } from "./config.js";
import { AccountSchema } from "./models/accountSchema.js";
import router from "./routes/accountsRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	return res.status(200).send("Hello World");
});

app.use("/account", router);

await mongoose
	.connect(DB_URL)
	.then(() => {
		app.listen(PORT, () => {
			console.log("Listening in PORT 3000");
		});
	})
	.catch((error) => {
		console.log(error.message);
	});
