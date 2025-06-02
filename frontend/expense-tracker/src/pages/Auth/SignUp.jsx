import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
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

  //Handle SignUp Form Submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    setError("");

    //SignUp API call
    try {
      //upload image if present
      if (profilePic) {
        try {
          const imageUploadRes = await uploadImage(profilePic);
          profileImageUrl = imageUploadRes?.imageUrl || "";
        } catch (imageError) {
          console.error("Image upload failed:", imageError);
          // You might want to show an error or continue without the image
        }
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        fullName: fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;
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
              Create Account
            </h1>
            <p className="text-sm text-gray-600">
              Join us today and get started
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-10">
            <form onSubmit={handleSignUp} className="space-y-5">
              {/* Profile Photo Section */}
              <div className="flex justify-center mb-6">
                <ProfilePhotoSelector
                  image={profilePic}
                  setImage={setProfilePic}
                />
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <Input
                  value={fullName}
                  onChange={({ target }) => setFullName(target.value)}
                  label="Full Name"
                  placeholder="Enter your full name"
                  type="text"
                />

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
                  placeholder="Create a secure password"
                  type="password"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                type="submit"
              >
                Create Account
              </button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-violet-600 hover:text-violet-700 font-semibold hover:underline transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
