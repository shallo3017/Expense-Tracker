import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/userContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative">
      <Navbar activeMenu={activeMenu} onToggleSideBar={toggleSidebar} />
      {user && (
        <div className="flex">
          {/* Sidebar container - always maintains w-20 to prevent content shifting */}
          <div className="w-20 flex-shrink-0">
            <SideMenu activeMenu={activeMenu} isCollapsed={isCollapsed} />
          </div>

          {/* Main content area */}
          <div className="flex-1 mx-5">{children}</div>

          {/* Invisible backdrop for expanded sidebar - just for click handling */}
          {!isCollapsed && (
            <div
              className="fixed top-[61px] left-64 right-0 bottom-0 z-20 transition-opacity duration-300 ease-in-out"
              onClick={toggleSidebar}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
