import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import User from "../models/User.js";
import mailSender from "../utils/forgetPasswordMailSender.js";

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

        const newUser = new User({
            status: true,
            email: user.email,
        });

    } catch (error) {
        console.log("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error", status: false });
    }
};

// Logout controller
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
    console.log(token);
    console.log(req.cookies);

    if (!token) return res.status(401).json({ status: false });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId)
        res.status(200).json({ status: true, verified: user.isVerified, message: "User is authenticated.", email: user.email });
    } catch (error) {
        res.status(401).json({ status: false, message: 'Token is not valid.' });
    }
};