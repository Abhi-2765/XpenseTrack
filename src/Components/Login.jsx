import React, { useState } from "react";
import google from "../assets/google.svg";
import github from "../assets/github.svg";
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

const Login = ({ isLoggedIn }) => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [signUp, setSignUp] = useState("SignUp");

  const password = watch("password");

  const onSubmit = (data) => {
    toast.success(`${signUp} Successful!`, { position: toast.POSITION.TOP_RIGHT });
    reset();
  };

  if (isLoggedIn) return null;

  return (
    <div className="flex justify-center items-center h-screen bg-blue-950 text-white py-8">
      <div className="App">
        <ToastContainer/>
      </div>
      <div className="max-w-md mx-auto p-6 bg-white text-blue-950 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold mb-4">{signUp}</h1>

          {/* Email Input */}
          <div className="w-full mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && toast.error(errors.email.message)}
          </div>

          {/* Password Input */}
          <div className="w-full mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
                  message:
                    "Password must contain uppercase, lowercase, numbers, and special characters",
                },
              })}
            />
            {errors.password && toast.error(errors.password.message)}
          </div>

          {/* Confirm Password Input */}
          {signUp === "SignUp" && (
            <div className="w-full mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword &&
                toast.error(errors.confirmPassword.message)}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {signUp}
            </button>
          </div>
        </form>

        {/* Divider */}
        <hr className="my-4" />

        {/* Social Login Buttons */}
        <div className="flex flex-row justify-around mb-4">
          <button className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg shadow hover:bg-gray-200 transition mx-1">
            <img src={google} alt="Google" className="h-6 w-6" />
            <span>Sign in with Google</span>
          </button>
          <button className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg shadow hover:bg-gray-200 transition mx-1">
            <img src={github} alt="GitHub" className="h-6 w-6" />
            <span>Sign in with GitHub</span>
          </button>
        </div>

        {/* Toggle SignUp/Login */}
        <p className="text-center">
          {signUp === "SignUp" ? (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setSignUp("Login")}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setSignUp("SignUp")}
              >
                SignUp
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
