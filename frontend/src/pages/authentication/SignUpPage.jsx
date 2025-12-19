import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

const Signup = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const { setEmail } = useAuth();

  const navigate = useNavigate();

  // creating account
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201 || response.status === 200) {
        // OTP is sent automatically by the backend
        setEmail(data.email);
        navigate("/verify-otp", { state: { email: data.email } });
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert("User already exists or invalid input");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join us and start your journey."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#00F5D4] hover:opacity-80 transition"
          >
            Log In
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <input
            {...register("name", { required: "Full name is required" })}
            className="block w-full rounded-lg border border-[#30363D] bg-white/5 px-4 py-3 text-white placeholder-[#8B949E] focus:bg-white/10 focus:border-[#00F5D4] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(0,245,212,0.3)] sm:text-sm"
            placeholder="Full Name"
            type="text"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

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
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
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

        {/* Confirm Password */}
        <div>
          <input
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="block w-full rounded-lg border border-[#30363D] bg-white/5 px-4 py-3 text-white placeholder-[#8B949E] focus:bg-white/10 focus:border-[#00F5D4] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(0,245,212,0.3)] sm:text-sm"
            placeholder="Confirm Password"
            type="password"
            disabled={isSubmitting}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`group relative flex w-full justify-center rounded-lg px-3 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 ${isSubmitting
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#0077FF] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#161B22] focus:ring-[#00F5D4]"
            }`}
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
