// import { useState, useRef, useEffect } from "react";
// import { Menu, X, LogOut, User } from "lucide-react";
// import { Link as ScrollLink } from "react-scroll";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../src/components/AuthContext";

// const menuItems = [
//   { name: "Home", to: "home" },
//   { name: "About", to: "about" },
//   { name: "Events", to: "events" },
//   { name: "Vlogs", to: "vlogs" },
//   { name: "Courses", to: "courses" },
// ];

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//     };

//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setShowDropdown(false);
//     navigate("/");
//   };

//   const handleDashboard = () => {
//     setShowDropdown(false);
//     navigate("/dashboard");
//   };

//   const getInitial = () => {
//     if (!user) return "U";
//     return user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase();
//   };

//   return (
//     <nav className="fixed top-0 w-full bg-black/30 backdrop-blur z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <img
//               src="/public/Logo.png"
//               alt="Technovers Logo"
//               className="h-8 w-auto max-w-[7.25rem] rounded-lg object-contain"
//             />
          
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-6">
//             {menuItems.map((item) => (
//               <ScrollLink
//                 key={item.name}
//                 to={item.to}
//                 smooth
//                 duration={500}
//                 className="text-gray-300 hover:text-white text-sm font-medium cursor-pointer transition-transform hover:scale-105"
//               >
//                 {item.name}
//               </ScrollLink>
//             ))}

//             {/* Desktop Auth Buttons */}
//             {isAuthenticated ? (
//               <AuthButtons
//                 showDropdown={showDropdown}
//                 setShowDropdown={setShowDropdown}
//                 handleDashboard={handleDashboard}
//                 handleLogout={handleLogout}
//                 getInitial={getInitial}
//                 dropdownRef={dropdownRef}
//               />
//             ) : (
//               <button
//                 onClick={() => navigate("/auth")}
//                 className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-transform hover:scale-105"
//               >
//                 Login
//               </button>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-300 hover:text-white"
//               aria-label="Toggle menu"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-black/90 px-4 pb-4 space-y-2">
//           {menuItems.map((item) => (
//             <ScrollLink
//               key={item.name}
//               to={item.to}
//               smooth
//               duration={500}
//               onClick={() => setIsOpen(false)}
//               className="block text-gray-300 hover:text-white text-base font-medium"
//             >
//               {item.name}
//             </ScrollLink>
//           ))}

//           {isAuthenticated ? (
//             <div className="pt-4 border-t border-gray-700 space-y-2">
//               <button
//                 onClick={() => {
//                   handleDashboard();
//                   setIsOpen(false);
//                 }}
//                 className="flex items-center text-gray-300 hover:text-white w-full"
//               >
//                 <User className="h-5 w-5 mr-2" />
//                 Dashboard
//               </button>
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setIsOpen(false);
//                 }}
//                 className="flex items-center text-red-400 hover:text-red-300 w-full"
//               >
//                 <LogOut className="h-5 w-5 mr-2" />
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <button
//               onClick={() => {
//                 navigate("/auth");
//                 setIsOpen(false);
//               }}
//               className="bg-purple-600 w-full text-white px-4 py-2 rounded-md text-base font-medium hover:bg-purple-700 mt-4"
//             >
//               Login
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// interface AuthButtonsProps {
//   showDropdown: boolean;
//   setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
//   handleDashboard: () => void;
//   handleLogout: () => void;
//   getInitial: () => string;
//   dropdownRef: React.RefObject<HTMLDivElement>;
// }

// const AuthButtons = ({
//   showDropdown,
//   setShowDropdown,
//   handleDashboard,
//   handleLogout,
//   getInitial,
//   dropdownRef,
// }: AuthButtonsProps) => {
//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={() => setShowDropdown(!showDropdown)}
//         className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold hover:bg-purple-700 transition-colors"
//       >
//         {getInitial()}
//       </button>

//       {showDropdown && (
//         <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 border border-gray-200 py-1">
//           <button
//             onClick={handleDashboard}
//             className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             <User className="h-4 w-4 mr-2" />
//             Dashboard
//           </button>
//           <button
//             onClick={handleLogout}
//             className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//           >
//             <LogOut className="h-4 w-4 mr-2" />
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };





import { useState, useRef, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "../src/components/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  const handleDashboard = () => {
    setShowDropdown(false);
    navigate("/dashboard");
  };

  const getInitial = () => {
    if (!user) return "U";
    return user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase();
  };

  const menuItems = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Events", to: "events" },
    { name: "Vlogs", to: "vlogs" },
    { name: "Courses", to: "courses" },
  ];

  return (
   <nav className="fixed w-full bg-black/20 backdrop-blur-md z-50">
  <div className="flex justify-between items-center px-6 py-3">
    {/* Logo */}
    <div className="flex items-center rounded-md bg-white p-1">
      <img src="/Logo.png" alt="Technovers Logo" className="h-8 w-auto max-w-[7.25rem]" />
    </div>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center space-x-6">
      {menuItems.map((item) => (
        <ScrollLink
          key={item.name}
          to={item.to}
          smooth={true}
          duration={500}
          className="text-gray-300 hover:text-white text-sm font-medium cursor-pointer hover:scale-105 transition-all"
        >
          {item.name}
        </ScrollLink>
      ))}

      {isAuthenticated ? (
        <AuthButtons
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          handleDashboard={handleDashboard}
          handleLogout={handleLogout}
          getInitial={getInitial}
          dropdownRef={dropdownRef}
        />
      ) : (
        <button
          onClick={() => navigate("/auth")}
          className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition"
        >
          Login
        </button>
      )}
    </div>

    {/* Hamburger Icon - Mobile Only */}
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {isOpen && (
    <div className="flex flex-col px-6 pb-4 space-y-3 bg-black/80 backdrop-blur-md md:hidden">
      {menuItems.map((item) => (
        <ScrollLink
          key={item.name}
          to={item.to}
          smooth={true}
          duration={500}
          onClick={() => setIsOpen(false)}
          className="text-gray-300 hover:text-white text-base font-medium cursor-pointer"
        >
          {item.name}
        </ScrollLink>
      ))}

      {isAuthenticated ? (
        <div className="mt-4">
          <button
            onClick={() => {
              handleDashboard();
              setIsOpen(false);
            }}
            className="flex items-center w-full px-2 py-2 text-sm text-white hover:bg-white/10 rounded"
          >
            <User className="h-4 w-4 mr-2" />
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-2 py-2 text-sm text-red-400 hover:bg-white/10 rounded"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            navigate("/auth");
            setIsOpen(false);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition mt-3"
        >
          Login
        </button>
      )}
    </div>
  )}
</nav>

  );
};

export default Navbar;

// ----------------------------

interface AuthButtonsProps {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  handleDashboard: () => void;
  handleLogout: () => void;
  getInitial: () => string;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const AuthButtons = ({
  showDropdown,
  setShowDropdown,
  handleDashboard,
  handleLogout,
  getInitial,
  dropdownRef,
}: AuthButtonsProps) => {
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-white text-lg font-bold hover:bg-purple-700 transition-transform transform hover:scale-105"
      >
        {getInitial()}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button
            onClick={handleDashboard}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User className="h-4 w-4 mr-2" />
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
