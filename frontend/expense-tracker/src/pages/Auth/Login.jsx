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

    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      console.log(token);
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-10">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Input Fields */}
              <div className="space-y-4">
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

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Forgot Password Link */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-violet-600 hover:text-violet-700 hover:underline transition-all duration-200 font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                type="submit"
              >
                Sign In
              </button>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-violet-600 hover:text-violet-700 font-semibold hover:underline transition-colors duration-200"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
    // <AuthLayout>
    //   <p>Hello there</p>
    // </AuthLayout>
  );
};

export default Login;
