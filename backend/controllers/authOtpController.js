import User from "../models/User.js";
import OTP from "../models/Otp.js";
import otpGenerator from "otp-generator";
import mailSender from "../utils/mailSender.js";

function generateOTP() {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
}

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const otp = generateOTP();
    const newOTP = new OTP({ email, otp });
    await newOTP.save();

    const result = await mailSender(email, otp);

    res
      .status(200)
      .json({ success: true, message: "OTP sent successfully", result });
  } catch (error) {
    console.error("sendOTP error:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await OTP.findOne({ email });

    if (!record) {
      return res
        .status(400)
        .json({ success: false, message: "OTP not found or expired" });
    }

    if (record.otp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP" });
    }

    await OTP.deleteOne({ email });
    await User.updateOne({ email }, { $set: { isVerified: true } });

    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("verifyOTP error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
