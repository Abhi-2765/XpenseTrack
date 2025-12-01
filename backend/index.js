import express from 'express';
import cors from 'cors';
import { publicEncrypt, privateDecrypt } from 'crypto';
import dotenv from 'dotenv';
import connectMongoDB from './connectDB.js';
import authRoute from './routes/authRoute.js'
import authOtpRoute from './routes/authOtpRoute.js'
import transactionRoute from './routes/transactionRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());


app.get('/', (req, res) => {
  const privateKey = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n");
  const publicKey = process.env.PUBLIC_KEY?.replace(/\\n/g, "\n");

  if (!privateKey || !publicKey) {
    return res.status(500).send("Environment variables PRIVATE_KEY or PUBLIC_KEY are missing.");
  }

  const message = req.body.message || "Hello, World!";
  const encryptedMessage = publicEncrypt(publicKey, Buffer.from(message));
  const decryptedMessage = privateDecrypt(privateKey, encryptedMessage);


  res.status(200).json({
    originalMessage: message,
    encryptedMessage: encryptedMessage.toString('base64'),
    decryptedMessage: decryptedMessage.toString()
  })
});

// Routes
app.use('/auth', authRoute);
app.use('/auth-otp', authOtpRoute);
app.use('/transactions', transactionRoute);

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
