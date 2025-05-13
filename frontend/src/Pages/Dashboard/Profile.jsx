import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile, deleteUserAccount } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar'; // Adjust import based on your actual Avatar library
import { Edit2, Trash2 } from 'lucide-react'; // Lucide icons for Edit and Delete

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ firstname: "", email: "" });
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUserProfile(); // Fetch user profile when component mounts
    }
  }, [token, navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile(token); // Fetch response from the API
      if (response?.success) {
        const data = response.data; // Correctly access the 'data' property
        setUserData(data);
        setFormData({
          firstname: data.name, // Set 'name' to 'firstname'
          email: data.email,
        });
      } else {
        toast.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error fetching profile data");
    }
  };

  const handleEdit = () => {
    setEditMode(true); 
  };

  const handleCancel = () => {
    setEditMode(false); 
    setFormData({
      firstname: userData?.name || "",
      email: userData?.email || "",
    });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        name: formData.firstname,
        email: formData.email,
        id: userData._id,
      };

      const response = await updateUserProfile(token, updatedData);

      if (response?.success) {
        setUserData(response.data); // Update user data in the UI
        toast.success("Profile updated successfully!");
        setEditMode(false);
      } else {
        toast.error("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await deleteUserAccount(token, userData._id);
        if (response) {
          toast.success("Account deleted successfully!");
          localStorage.removeItem("token"); 
          navigate("/login"); 
        }
      } catch (error) {
        toast.error("Error deleting account");
      }
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-sm">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-6">Manage Your Profile</h2>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <Avatar className="cursor-pointer w-24 h-24">
            <AvatarImage src={userData?.avatarUrl || "https://github.com/shadcn.png"} alt="User Avatar" />
            <AvatarFallback>{userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
        </div>

        {userData ? (
          <div className="text-center">
            {!editMode ? (
              <>
                <p className="text-xl font-semibold">{userData.name}</p>
                <p className="text-sm text-gray-500">{userData.email}</p>

                <div className="mt-6 flex justify-center gap-4">
                  {/* Edit Button with Lucide icon */}
                  <button
                    className="w-1/2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex justify-center items-center gap-2"
                    onClick={handleEdit}
                  >
                    <Edit2 size={16} /> Edit
                  </button>

                  {/* Delete Button with Lucide icon */}
                  <button
                    className="w-1/2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex justify-center items-center gap-2"
                    onClick={handleDelete}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium dark:text-gray-400 text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={formData.firstname}
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium dark:text-gray-400 text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="flex justify-between gap-4">
                  <button
                    className="w-1/2 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-1/2 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
