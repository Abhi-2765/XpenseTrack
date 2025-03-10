import { useState } from "react";
import google from "../assets/google.svg";
import { useForm } from "react-hook-form";
import { signInWithGoogle } from "../Configure/firebase";
import { useUserContext } from "../Context/UserProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [signUp, setSignUp] = useState("SignUp");
  const password = watch("password");

  // const {isLoggedIn} = useContext(AppContext);
  const {Login} = useUserContext();

  const onSubmit = (data) => {
    alert(`${signUp} Successful!`);
    console.log(data);
    reset();
  };

  if (Login) return null;

  return (
    <div className="flex justify-center items-center h-screen bg-blue-950 text-white px-4">
      <div className="w-full max-w-md bg-white text-blue-950 rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl font-bold mb-6 text-center">{signUp}</h1>

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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
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
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message: "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters",
                }                
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mb-6">
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition duration-200 text-lg"
            >
              {signUp}
            </button>
          </div>
        </form>

        {/* Divider */}
        <hr className="my-6" />

        {/* Social Login Buttons */}
        <div className="flex flex-row justify-around gap-2 mb-6">
          <button
            className="flex justify-center items-center gap-2 bg-gray-100 p-3 w-full rounded-lg shadow hover:bg-gray-200 transition"
            onClick={signInWithGoogle}
          >
            <img src={google} alt="Google" className="h-6 w-6" />
            <span>Sign in with Google</span>
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
              Need an account?{" "}
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
