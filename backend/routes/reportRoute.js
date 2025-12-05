import express from "express";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import { getSummary } from "../controllers/reportController.js";

const router = express.Router();

router.get("/summary", authenticateUser, getSummary);

export default router;