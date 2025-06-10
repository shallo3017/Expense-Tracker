import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      {/* CHANGE: Updated label styling to be more prominent */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* CHANGE: Enhanced input styling with better focus states using teal colors */}
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-white text-gray-800 px-4 py-3.5 border border-gray-200 rounded-xl outline-none transition-all duration-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 hover:border-gray-300 hover:shadow-sm text-sm"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {/* CHANGE: Updated password toggle icon positioning and colors */}
        {type === "password" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-teal-500 cursor-pointer hover:text-teal-600 transition-colors duration-200"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-gray-400 cursor-pointer hover:text-teal-500 transition-colors duration-200"
                onClick={() => toggleShowPassword()}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
