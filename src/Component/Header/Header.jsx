// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { FiMenu, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
// import { Logout } from "../../Redux/Features/AuthenticationServicesSlice";
// import sidelogo from "../../../public/Logo.png";

// export const Header = ({ toggleMobileSidebar }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading } = useSelector((state) => state.AuthOpration);

//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [user, setUser] = useState({});
//   const userMenuRef = useRef(null);

//   // Get current time/date
//   const [currentTime, setCurrentTime] = useState(new Date());
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const formattedTime = currentTime.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   const formattedDate = currentTime.toLocaleDateString("en-GB");

//   // Load user from localStorage
//   useEffect(() => {
//     const savedUser = localStorage.getItem("seller");
//     if (savedUser) setUser(JSON.parse(savedUser));
//   }, []);

//   // Close user menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//         setIsUserMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

//   const handleLogout = () => {
//     dispatch(Logout()).then(() => navigate("/seller/"));
//   };

//   return (
//     <header className="flex items-center justify-between px-4 bg-primary shadow-sm sticky top-0 z-30 h-16">
//       {/* Left: Mobile menu + Logo */}
//       <div className="flex items-center space-x-4">
//         <button
//           aria-label="Open Sidebar"
//           className="md:hidden p-2 rounded-md text-gray-100 hover:bg-gray-700"
//           onClick={toggleMobileSidebar}
//         >
//           <FiMenu className="h-6 w-6" />
//         </button>
//         <img
//           src={sidelogo}
//           alt="Seller Portal Logo"
//           className="h-16 w-16 border rounded-full"
//         />
//       </div>

//       {/* Right: Time + User Menu */}
//       <div className="flex items-center space-x-4">
//         {/* Time / Date */}
//         <div className="hidden sm:flex flex-col text-right mr-4">
//           <span className="text-white font-medium">{formattedTime}</span>
//           <span className="text-gray-200 text-xs">{formattedDate}</span>
//         </div>

//         {/* User menu */}
//         <div className="relative" ref={userMenuRef}>
//           <button
//             onClick={toggleUserMenu}
//             className="p-2 rounded-full text-white hover:bg-gray-700 transition-colors"
//             aria-label="User Menu"
//           >
//             <FiUser className="w-5 h-5" />
//           </button>

//           {isUserMenuOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//               {/* User info */}
//               <div className="px-4 py-2 border-b border-gray-100">
//                 <p className="text-sm font-medium text-gray-900">
//                   {user?.name || "Demo User"}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {user?.email || "user@example.com"}
//                 </p>
//               </div>

//               {/* Profile */}
//               <button
//                 onClick={() => navigate("/seller/userinfo")}
//                 className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               >
//                 <FiSettings className="mr-2" />
//                 Profile Settings
//               </button>

//               {/* Logout */}
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//               >
//                 <FiLogOut className="mr-2" />
//                 {loading ? "Logging out..." : "Logout"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiMenu,
  FiUser,
  FiLogOut,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Logout } from "../../Redux/Features/AuthenticationServicesSlice";
import sidelogo from "../../../public/Logo.png";
import toast from "react-hot-toast";

export const Header = ({ toggleMobileSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.AuthOpration);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState({});
  const userMenuRef = useRef(null);

  // Get current time/date
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = currentTime.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("seller");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser({ name: "Admin User", email: "admin@example.com" });
      }
    }
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = async () => {
    try {
      await dispatch(Logout()).unwrap().then(navigate("/seller/"));
      toast.success("Logout SuccessFull"); // wait till logout action complete
      // navigate immediately after success
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 lg:px-6 bg-primary shadow-sm border-b border-gray-200 sticky top-0 z-30 h-16">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Menu Button */}
        <button
          aria-label="Open Sidebar"
          className="lg:hidden p-2 rounded-md text-white-600 hover:bg-gray-100 transition-colors"
          onClick={toggleMobileSidebar}
        >
          <FiMenu className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={sidelogo}
            alt="Admin Portal Logo"
            className="h-11 w-11 rounded-lg object-cover border-2 border-gray-200"
          />
          <div className="hidden sm:block">
            <p className="text-xxl text-white">Welcome back, {user?.name}</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Time Display */}
        <div className="hidden md:flex flex-col items-end mr-4">
          <span className="text-sm font-medium text-white">
            {formattedTime}
          </span>
          <span className="text-xs text-white">{formattedDate}</span>
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={toggleUserMenu}
            className="flex items-center space-x-2 p-2 rounded-lg text-gray-700  transition-colors"
            aria-label="User Menu"
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-white">Administrator</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {user?.name?.charAt(0) || "A"}
              </span>
            </div>
          </button>

          {/* User Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "admin@example.com"}
                </p>
              </div>

              {/* Menu Items */}
              <button
                onClick={() => {
                  navigate("/seller/userinfo");
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FiSettings className="mr-3 h-4 w-4" />
                Profile Settings
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <FiLogOut className="mr-3 h-4 w-4" />
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
