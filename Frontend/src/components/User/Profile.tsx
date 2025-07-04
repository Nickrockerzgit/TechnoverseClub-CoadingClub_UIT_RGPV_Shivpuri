import  { useState } from "react";
import { FaCamera, FaEdit, FaKey } from "react-icons/fa";

const Profile = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Frontend Developer with 3 years of experience",
    avatar: "",
    phone: "+91 9876543210",
    location: "Mumbai, India",
    joinDate: "January 2023"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({...profileData});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    setProfileData({...editedData});
    setIsEditing(false);
    // Here you would typically make an API call to update the profile
  };

  const handlePasswordChange = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    // Here you would typically make an API call to update the password
    setPasswordError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    alert("Password updated successfully!");
  };

  const handleAvatarChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData({
          ...editedData,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 bg-gray-50 p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img 
                  src={profileData.avatar} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
                    <FaCamera />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>
              <h3 className="text-xl font-semibold mt-4">{profileData.name}</h3>
              <p className="text-gray-600">{profileData.email}</p>
            </div>
            
            <ul>
              <li 
                className={`mb-2 p-2 rounded cursor-pointer ${activeTab === "profile" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile Information
              </li>
              <li 
                className={`mb-2 p-2 rounded cursor-pointer ${activeTab === "security" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"}`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </li>
            </ul>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4 p-6">
            {activeTab === "profile" && (
              <div>
                <div className="flex justify-between mb-6">
                  <h3 className="text-xl font-semibold">Profile Information</h3>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setIsEditing(false);
                          setEditedData({...profileData});
                        }}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveProfile}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
                
                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium">{profileData.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Email</p>
                      <p className="font-medium">{profileData.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Phone</p>
                      <p className="font-medium">{profileData.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Location</p>
                      <p className="font-medium">{profileData.location}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-500 mb-1">Bio</p>
                      <p className="font-medium">{profileData.bio}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Member Since</p>
                      <p className="font-medium">{profileData.joinDate}</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-500 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={editedData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={editedData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1">Phone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={editedData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1">Location</label>
                      <input 
                        type="text" 
                        name="location"
                        value={editedData.location}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-500 mb-1">Bio</label>
                      <textarea 
                        name="bio"
                        value={editedData.bio}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "security" && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                  <div className="mb-4">
                    <label className="block text-gray-500 mb-1">Current Password</label>
                    <input 
                      type="password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-500 mb-1">New Password</label>
                    <input 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-500 mb-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  {passwordError && (
                    <p className="text-red-500 mb-4">{passwordError}</p>
                  )}
                  <button 
                    type="submit"
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    <FaKey /> Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;











