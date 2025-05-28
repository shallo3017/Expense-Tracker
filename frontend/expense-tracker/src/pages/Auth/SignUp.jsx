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
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col ">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Enter your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Raj Nayar"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="hellothere@example.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5 ">{error}</p>}

          <button className="btn-primary" type="submit">
            SIGN UP
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
