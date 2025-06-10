// import React, { useContext } from "react";
// import { SIDE_MENU_DATA } from "../../utils/data";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/userContext";
// import CharAvatar from "../Cards/CharAvatar";

// const SideMenu = ({ activeMenu, isCollapsed = false }) => {
//   const { user, clearUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleClick = (route) => {
//     if (route === "/logout") {
//       handleLogout();
//       return;
//     }
//     navigate(route);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     clearUser();
//     navigate("/login");
//   };

//   return (
//     <div
//       className={`${
//         isCollapsed ? "w-20" : "w-64 fixed left-0 top-[61px] shadow-lg z-30" // Fixed positioning when expanded
//       } h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 ${
//         isCollapsed ? "sticky top-[61px] z-20" : ""
//       } transition-all duration-300 ease-in-out`} // Added smooth transition
//     >
//       {/* User Profile Section */}
//       <div
//         className={`flex flex-col items-center justify-center gap-3 mt-3 mb-7 ${
//           isCollapsed ? "mb-4" : ""
//         }`}
//       >
//         {user?.profileImageUrl ? (
//           <img
//             src={user?.profileImageUrl || ""}
//             alt="Profile"
//             className={`${
//               isCollapsed ? "w-10 h-10" : "w-20 h-20"
//             } bg-slate-400 rounded-full object-cover`}
//           />
//         ) : (
//           <CharAvatar
//             fullName={user?.fullName}
//             width={isCollapsed ? "w-10" : "w-20"}
//             height={isCollapsed ? "h-10" : "h-20"}
//             style={isCollapsed ? "text-sm" : "text-xl"}
//           />
//         )}
//         {!isCollapsed && (
//           <h5 className="text-gray-950 font-medium leading-6 text-center">
//             {user?.fullName || ""}
//           </h5>
//         )}
//       </div>

//       {/* Menu Items */}
//       {SIDE_MENU_DATA.map((item, index) => (
//         <div key={`menu_${index}`} className="relative group">
//           <button
//             className={`w-full flex items-center gap-4 text-[15px] ${
//               activeMenu === item.label
//                 ? "text-white bg-primary"
//                 : "text-gray-700 hover:bg-gray-50"
//             } ${
//               isCollapsed ? "justify-center px-3" : "px-6"
//             } py-3 rounded-lg mb-3`}
//             onClick={() => handleClick(item.path)}
//           >
//             <item.icon className="text-xl flex-shrink-0" />
//             {!isCollapsed && <span>{item.label}</span>}
//           </button>

//           {/* Tooltip for collapsed state */}
//           {isCollapsed && (
//             <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
//               {item.label}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };
// export default SideMenu;

import React, { useContext, useState } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import CharAvatar from "../Cards/CharAvatar";
import Modal from "../layouts/Modal";
import DeleteAlert from "../layouts/DeleteAlert";

const SideMenu = ({ activeMenu, isCollapsed = false }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [openLogoutAlert, setOpenLogoutAlert] = useState(false);

  const handleClick = (route) => {
    if (route === "/logout") {
      setOpenLogoutAlert(true);
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64 fixed left-0 top-[61px] shadow-lg z-30" // Fixed positioning when expanded
      } h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 ${
        isCollapsed ? "sticky top-[61px] z-20" : ""
      } transition-all duration-300 ease-in-out`} // Added smooth transition
    >
      {/* User Profile Section */}
      <div
        className={`flex flex-col items-center justify-center gap-3 mt-3 mb-7 ${
          isCollapsed ? "mb-4" : ""
        }`}
      >
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile"
            className={`${
              isCollapsed ? "w-10 h-10" : "w-20 h-20"
            } bg-slate-400 rounded-full object-cover`}
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width={isCollapsed ? "w-10" : "w-20"}
            height={isCollapsed ? "h-10" : "h-20"}
            style={isCollapsed ? "text-sm" : "text-xl"}
          />
        )}
        {!isCollapsed && (
          <h5 className="text-gray-950 font-medium leading-6 text-center">
            {user?.fullName || ""}
          </h5>
        )}
      </div>

      {/* Menu Items */}
      {SIDE_MENU_DATA.map((item, index) => (
        <div key={`menu_${index}`} className="relative group">
          <button
            className={`w-full flex items-center gap-4 text-[15px] ${
              activeMenu === item.label
                ? "text-white bg-primary"
                : "text-gray-700 hover:bg-gray-50"
            } ${
              isCollapsed ? "justify-center px-3" : "px-6"
            } py-3 rounded-lg mb-3`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl flex-shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </button>

          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
              {item.label}
            </div>
          )}
        </div>
      ))}

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={openLogoutAlert}
        onClose={() => setOpenLogoutAlert(false)}
        title="Logout Confirmation"
      >
        <DeleteAlert
          content="Are you sure you want to logout?"
          onDelete={handleLogout}
          onCancel={() => setOpenLogoutAlert(false)}
          showYesNo={true}
        />
      </Modal>
    </div>
  );
};

export default SideMenu;
