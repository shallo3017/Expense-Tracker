import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu, onToggleSideBar }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    onToggleSideBar();
  };

  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-teal-700 hover:text-teal-800 hover:bg-teal-50 p-1 rounded-lg transition-colors"
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <button
        className="hidden lg:flex items-center justify-center text-teal-700 hover:text-teal-800 hover:bg-teal-50 p-2 rounded-lg transition-colors w-12 h-12 -ml-3"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <HiOutlineMenu className="text-2xl" />
        ) : (
          <HiOutlineX className="text-2xl" />
        )}
      </button>

      <div className="flex items-center gap-3">
        {/* App Name */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
          Expenso
        </h2>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white lg:hidden shadow-lg">
          <SideMenu activeMenu={activeMenu} isCollapsed={false} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
