import React, { useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, resetPassword, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Logged in successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setError("");
        form.reset();
        navigate(location.state?.from || "/");
      })
      .catch((error) => setError(error.message));
  };

  const handleForgotPassword = () => {
    const email = prompt("Please enter your email for password reset:");
    if (!email) return;

    resetPassword(email)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Password reset email sent!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        const newUser = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
        };

        // Use HTTPS and handle errors properly
        axios
          .post("https://eventify-server-sigma.vercel.app/users", newUser)
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "Logged in with Google!",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((err) => {
            console.error("Error saving user:", err);
            Swal.fire({
              title: "Error!",
              text: "Failed to save user data.",
              icon: "error",
              confirmButtonText: "OK",
            });
          })
          .finally(() => {
            // Navigate even if saving user fails
            navigate(location.state?.from || "/");
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-96 transition-transform transform hover:scale-[1.02]"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Login
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       transition duration-200"
            required
          />
        </div>

        <div className="mb-5 relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       transition duration-200 pr-10"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[2.7rem] text-gray-500 dark:text-gray-300 cursor-pointer hover:text-gray-700 dark:hover:text-gray-100"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <div className="text-right mt-1">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
        >
          Login
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="px-3 text-gray-500 dark:text-gray-300 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        <button
          type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 font-medium text-gray-700 dark:text-gray-200">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg"alt="Google"className="w-5 h-5"/>Continue with Google</button>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-6 text-sm"> Don’t have an account?{" "}
          <Link to="/auth/register"className="text-blue-600 dark:text-blue-400 font-medium hover:underline"> Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;