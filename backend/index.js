import express from 'express';
import cors from 'cors';
import { publicEncrypt, privateDecrypt } from 'crypto';
import dotenv from 'dotenv';
import connectMongoDB from './connectDB.js';
import authRoute from './routes/authRoute.js'
import authOtpRoute from './routes/authOtpRoute.js'
import transactionRoute from './routes/transactionRoute.js';
import budgetRoute from './routes/budgetRoute.js';
import reportRoute from './routes/reportRoute.js';
import mcpRoute from './routes/mcpRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["https://xpensetrack.onrender.com", "https://xpensetrackmcp.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-MCP-KEY", "userid"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", true);

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/auth', authRoute);
app.use('/auth-otp', authOtpRoute);
app.use('/transactions', transactionRoute);
app.use('/budget', budgetRoute)
app.use('/report', reportRoute);
app.use('/mcp', mcpRoute);

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
