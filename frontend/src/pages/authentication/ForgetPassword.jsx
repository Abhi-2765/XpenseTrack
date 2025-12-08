import { useForm } from "react-hook-form";
import axios from "axios";
import AuthLayout from "../../components/AuthLayout";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Forgot password data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
            await axios.post("http://localhost:5000/auth/forgot-password", {
                email: data.email,
                confirmEmail: data.confirmEmail
            }, { withCredentials: true });
            alert("If your email exists, a reset link has been sent.");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthLayout>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <div>
                    <input
                        {...register("email", { required: "Email is required" })}
                        className="block w-full rounded-lg border border-[#30363D] bg-white/5 px-4 py-3 text-white placeholder-[#8B949E] focus:bg-white/10 focus:border-[#00F5D4] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(0,245,212,0.3)] sm:text-sm"
                        placeholder="Enter your email address"
                        type="email"
                        disabled={isSubmitting}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                    )}
                </div>

                {/* Confirm Email */}
                <div>
                    <input
                        {...register("confirmEmail", {
                            required: "Please confirm your email",
                            validate: (value, { email }) =>
                                value === email || "Emails do not match",
                        })}
                        className="block w-full rounded-lg border border-[#30363D] bg-white/5 px-4 py-3 text-white placeholder-[#8B949E] focus:bg-white/10 focus:border-[#00F5D4] focus:ring-0 focus:shadow-[0_0_0_3px_rgba(0,245,212,0.3)] sm:text-sm"
                        placeholder="Confirm your email address"
                        type="email"
                        disabled={isSubmitting}
                    />
                    {errors.confirmEmail && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.confirmEmail.message}
                        </p>
                    )}
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
                    {isSubmitting ? "Sending link..." : "Send Reset Link"}
                </button>
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;
