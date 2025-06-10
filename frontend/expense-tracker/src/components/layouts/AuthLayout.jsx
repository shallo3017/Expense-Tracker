import React from "react";

const AuthLayout = ({ children }) => {
  return (
    // CHANGE: Removed fixed width constraints and padding to allow full screen centering
    // CHANGE: Simplified to just provide a clean background container
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-teal-50">
      {/* CHANGE: Removed the header text as it's now handled in the login component itself */}
      {children}
    </div>
  );
};

export default AuthLayout;
