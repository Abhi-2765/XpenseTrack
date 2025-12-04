import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const { setIsLoggedIn, setIsVerified } = useAuth();

  const onSubmit = async (data) => {
    console.log("Login data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email: data.email,
        password: data.password
      }, { withCredentials: true })

      if (response.status === 200) {
        setIsLoggedIn(true);
        setIsVerified(true);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 403) {
        // User is unverified, redirect to OTP page
        // We can assume the email is what they typed
        navigate("/verify-otp", { state: { email: data.email } });
      } else {
        alert("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your journey."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-[#00F5D4] hover:opacity-80 transition"
          >
            Sign Up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div>
          <input
            {...register("email", { required: "Email is required" })}
            className="block w-full rounded-lg border border-[#30363D] bg-white/5 px-4 py-3 text-white placeholder-[#8B949E] focus:bg-white/10 focus:border-[#00F5D4] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(0,245,212,0.3)] sm:text-sm"
            placeholder="Email address"
            type="email"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="block w-full rounded-lg border border-[#30363D] bg-white/5 px-4 py-3 text-white placeholder-[#8B949E] focus:bg-white/10 focus:border-[#00F5D4] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(0,245,212,0.3)] sm:text-sm"
            placeholder="Password"
            type="password"
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <a
            className="text-sm font-medium text-[#00F5D4] hover:opacity-80 transition"
            href="#"
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`group relative flex w-full justify-center rounded-lg px-3 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 ${isSubmitting
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#0077FF] hover:bg-opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#161B22] focus:ring-[#00F5D4]"
            }`}
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
