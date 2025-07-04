// import { FaUser, FaCog, FaSignOutAlt, FaTasks, FaBell } from "react-icons/fa";
// import { useAuth } from "../AuthContext"; 
// import { useNavigate } from "react-router-dom"; 

// const Dashboard = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate(); 

//   const handleLogout = () => {
//     logout(); 
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white p-6">
//         <h2 className="text-2xl font-bold mb-6">Technoverse</h2>
//         <ul>
//           <li className="mb-4">
//             <a href="#" className="flex items-center gap-2 text-lg hover:text-gray-400">
//               <FaUser /> Profile
//             </a>
//           </li>
//           <li className="mb-4">
//             <a href="#" className="flex items-center gap-2 text-lg hover:text-gray-400">
//               <FaTasks /> Tasks
//             </a>
//           </li>
//           <li className="mb-4">
//             <a href="#" className="flex items-center gap-2 text-lg hover:text-gray-400">
//               <FaBell /> Notifications
//             </a>
//           </li>
//           <li className="mb-4">
//             <a href="#" className="flex items-center gap-2 text-lg hover:text-gray-400">
//               <FaCog /> Settings
//             </a>
//           </li>
//           <li>
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 text-lg text-red-400 hover:text-red-600 w-full text-left"
//             >
//               <FaSignOutAlt /> Logout
//             </button>
//           </li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="p-6 bg-white shadow-md rounded-lg">
//             <h3 className="text-xl font-semibold">Profile Overview</h3>
//             <p className="text-gray-600">Manage your profile information.</p>
//           </div>
//           <div className="p-6 bg-white shadow-md rounded-lg">
//             <h3 className="text-xl font-semibold">Pending Tasks</h3>
//             <p className="text-gray-600">Check your assigned tasks.</p>
//           </div>
//           <div className="p-6 bg-white shadow-md rounded-lg">
//             <h3 className="text-xl font-semibold">Recent Notifications</h3>
//             <p className="text-gray-600">Stay updated with latest updates.</p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;









import  { SetStateAction, useState } from "react";
import { FaUser, FaCog, FaSignOutAlt, FaTasks, FaBell } from "react-icons/fa";
import { useAuth } from "../AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import Profile from "./Profile";
import Tasks from "./Tasks";
import Notifications from "./Notifications";
import Settings from "./Settings";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeModal, setActiveModal] = useState(null);

  const handleLogout = () => {
    logout(); 
    navigate("/");
  };

  const openModal = (modalName: string | SetStateAction<null>) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Technoverse</h2>
        <ul>
          <li className="mb-4">
            <button 
              onClick={() => openModal("profile")} 
              className="flex items-center gap-2 text-lg hover:text-gray-400 w-full text-left"
            >
              <FaUser /> Profile
            </button>
          </li>
          <li className="mb-4">
            <button 
              onClick={() => openModal("tasks")} 
              className="flex items-center gap-2 text-lg hover:text-gray-400 w-full text-left"
            >
              <FaTasks /> Tasks
            </button>
          </li>
          <li className="mb-4">
            <button 
              onClick={() => openModal("notifications")} 
              className="flex items-center gap-2 text-lg hover:text-gray-400 w-full text-left"
            >
              <FaBell /> Notifications
            </button>
          </li>
          <li className="mb-4">
            <button 
              onClick={() => openModal("settings")} 
              className="flex items-center gap-2 text-lg hover:text-gray-400 w-full text-left"
            >
              <FaCog /> Settings
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-lg text-red-400 hover:text-red-600 w-full text-left"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Profile Overview</h3>
            <p className="text-gray-600">Manage your profile information.</p>
            <button 
              onClick={() => openModal("profile")} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Profile
            </button>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Pending Tasks</h3>
            <p className="text-gray-600">Check your assigned tasks.</p>
            <button 
              onClick={() => openModal("tasks")} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Tasks
            </button>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Recent Notifications</h3>
            <p className="text-gray-600">Stay updated with latest updates.</p>
            <button 
              onClick={() => openModal("notifications")} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Notifications
            </button>
          </div>
        </div>
      </main>

      {/* Modals */}
      <Profile isOpen={activeModal === "profile"} onClose={closeModal} />
      <Tasks isOpen={activeModal === "tasks"} onClose={closeModal} />
      <Notifications isOpen={activeModal === "notifications"} onClose={closeModal} />
      <Settings isOpen={activeModal === "settings"} onClose={closeModal} />
    </div>
  );
};

export default Dashboard;