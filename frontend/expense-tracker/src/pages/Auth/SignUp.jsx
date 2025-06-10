import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import AuthLayout from "../../components/layouts/AuthLayout";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) return setError("Please enter your full name");
    if (!validateEmail(email))
      return setError("Please enter a valid email address");
    if (password.length < 8)
      return setError("Password must be at least 8 characters long");

    setError("");

    try {
      if (profilePic) {
        try {
          const imageUploadRes = await uploadImage(profilePic);
          profileImageUrl = imageUploadRes?.imageUrl || "";
        } catch (err) {
          console.error("Image upload failed:", err);
        }
      }

      const res = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again later.";
      setError(msg);
    }
  };

  return (
    <AuthLayout>
      <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-8 bg-white overflow-hidden">
        {/* Background App Logo */}
        <img
          src="/logo-bg.jpeg" // Place this in /public
          alt="App Background Logo"
          className="absolute inset-0 mx-auto opacity-10 w-[80%] max-w-[700px] object-contain z-0 pointer-events-none"
        />

        {/* Main Card */}
        <div className="relative z-10 w-full max-w-lg mx-auto bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Create Account
            </h1>
            <p className="text-sm text-gray-500">
              Join us today and get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Profile Photo */}
            <div className="flex justify-center">
              <ProfilePhotoSelector
                image={profilePic}
                setImage={setProfilePic}
              />
            </div>

            {/* Input Fields */}
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="your@email.com"
              type="email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Create a secure password"
              type="password"
            />

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3.5 px-4 rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-sm text-center text-gray-600 mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
