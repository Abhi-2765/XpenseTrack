import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import User from "../models/User.js";
import { nanoid } from "nanoid";
import mailSender from "../utils/forgetPasswordMailSender.js";
import { sendOtpToEmail } from "./authOtpController.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        // check user already exists
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // extra validation for password length
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const mcpAPI = nanoid(16);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
            mcpAPI: mcpAPI
        });

        await newUser.save();

        // Send OTP automatically
        await sendOtpToEmail(email);

        res.status(201).json({ message: "User registered successfully. Please verify your email.", status: true });

    } catch (error) {
        console.log("Error registering user:", error);
        res.status(500).json({ message: "Internal server error", status: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials", status: false });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials", status: false });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Account not verified. Please verify your email.", status: false });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            message: "Logged in successfully",
            status: true
        });

    } catch (error) {
        console.log("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error", status: false });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully", status: true });
    } catch (error) {
        console.log("Error logging out user:", error);
        res.status(500).json({ message: "Internal server error", status: false });
    }
};

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a reset token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        await mailSender(email, token);

        user.resetToken = token;
        await user.save();

        res.status(200).json({ message: "Password reset email sent", status: true });
    } catch (error) {
        console.log("Error in forgetPassword:", error);
        res.status(500).json({ message: "Internal server error", status: false });
    }
}

export const checkAuth = async (req, res) => {
    const token = req.cookies?.token;

    if (!token) return res.status(401).json({ status: false });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId)
        res.status(200).json({ status: true, verified: user.isVerified, message: "User is authenticated.", email: user.email, mcpAPI: user.mcpAPI });
    } catch (error) {
        res.status(401).json({ status: false, message: 'Token is not valid.' });
    }
};