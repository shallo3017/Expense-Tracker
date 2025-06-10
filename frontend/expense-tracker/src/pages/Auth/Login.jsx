import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";
import { API_PATHS } from "../../utils/apiPaths";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        try {
          localStorage.setItem("token", token);
        } catch (storageError) {
          console.warn("Could not save token to localStorage:", storageError);
        }
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <AuthLayout>
      <div
        className="h-screen w-full bg-cover bg-center flex items-center justify-center px-4"
        style={{
          backgroundImage: "url('/logo-bg.jpeg')",
          backgroundBlendMode: "overlay",
          backgroundColor: "#f1f5f9",
        }}
      >
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm">
              Track your expenses with ease
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-5">
                <Input
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  label="Email Address"
                  placeholder="your@email.com"
                  type="email"
                />
                <Input
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-teal-600 hover:text-teal-700 hover:underline transition-all font-medium"
                >
                  Forgot password?
                </a>
              </div>

              <button
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-4 px-4 rounded-xl transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                type="submit"
              >
                Sign In
              </button>

              <div className="text-center pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-400">
              Secure • Simple • Smart Expense Tracking
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
