import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token)
            return res.status(401).json({ message: "User is not authenticated." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user)
            return res.status(401).json({ message: "User not found." });

        req.userId = user._id;
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError")
            return res.status(401).json({ message: "Token expired." });

        return res.status(401).json({ message: "Token is not valid." });
    }
};

export default authenticateUser;
