import express from "express";
import authenticateUser from "../middleware/authenticationMiddleware.js";
import { fetchDailyData, fetchMonthlyData, getSummary, fetchYearlyCategoricalSpendings, fetchMonthlyCategoricalSpendings } from "../controllers/reportController.js";

const router = express.Router();

router.get("/summary", authenticateUser, getSummary);
router.get("/fetchMonthlyData", authenticateUser, fetchMonthlyData);
router.get("/fetchDailyData", authenticateUser, fetchDailyData);
router.get("/fetchYearlyCategoricalSpendings", authenticateUser, fetchYearlyCategoricalSpendings);
router.get("/fetchMonthlyCategoricalSpendings", authenticateUser, fetchMonthlyCategoricalSpendings);

export default router;