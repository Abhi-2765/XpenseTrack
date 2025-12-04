import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthProvider";


const Verification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [errorMessage, setErrorMessage] = useState("");
  const intervalRef = useRef(null);

  const { email: contextEmail, setIsLoggedIn, setIsVerified, setEmail } = useAuth();
  const location = useLocation();
  const email = location.state?.email || contextEmail;

  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      setEmail(email);
    }
  }, [email, setEmail]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (value, index) => {
    setErrorMessage("");
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus logic
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    } else if (!value && index > 0) {
      // Allows backspacing to the previous field
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;
    setErrorMessage("");
    try {
      console.log(email);
      await axios.post("http://localhost:5000/auth-otp/send-otp", {
        email: email,
      }, { withCredentials: true });
      setTimeLeft(120);
    } catch (err) {
      setErrorMessage("Failed to resend OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setErrorMessage("Please enter the full 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth-otp/verify-otp", {
        email: email,
        otp: enteredOtp,
      }, { withCredentials: true });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setIsVerified(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid OTP or verification failed.");
    }
  };

  return (
    <AuthLayout
      title="Verify OTP"
      subtitle="Enter the 6-digit code sent to your email."
      footer={
        <div className="flex flex-col items-center text-sm text-gray-400 space-y-2">
          <p>
            Time remaining:{" "}
            <span className="font-semibold text-[#00F5D4]">
              {formatTime(timeLeft)}
            </span>
          </p>
          <button
            type="button" // Use type="button" to prevent form submission
            onClick={handleResend}
            disabled={timeLeft > 0}
            className={`font-semibold transition ${timeLeft > 0
              ? "text-gray-500 cursor-not-allowed"
              : "text-[#00F5D4] hover:opacity-80"
              }`}
          >
            Resend OTP
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {errorMessage && (
          <p className="text-sm text-center text-red-400 bg-red-900/30 p-2 rounded-lg">
            {errorMessage}
          </p>
        )}
        <div className="flex justify-center gap-2 sm:gap-3 mx-auto">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                  // Manually trigger focus back on empty field when backspacing
                  document.getElementById(`otp-${index - 1}`)?.focus();
                }
              }}
              className="w-10 sm:w-12 h-12 sm:h-14 text-center text-lg sm:text-xl rounded-lg border border-[#30363D] bg-white/5 text-white focus:border-[#00F5D4] focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(0,245,212,0.3)] outline-none transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#0077FF] py-3 font-semibold text-white shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#161B22] focus:ring-[#00F5D4] transition-all duration-300"
        >
          Verify OTP
        </button>
      </form>
    </AuthLayout>
  );
};

export default Verification;
