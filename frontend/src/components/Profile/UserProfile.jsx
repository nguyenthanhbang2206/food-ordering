import React from "react";
import { useSelector } from "react-redux";

export const UserProfile = () => {
  const user = useSelector((state) => state.auth.user); // Lấy thông tin người dùng từ Redux store

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.avatar || "https://via.placeholder.com/150"} // Hiển thị avatar hoặc ảnh mặc định
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold">{user.fullName || "N/A"}</p>
          <p className="text-gray-500">{user.email || "N/A"}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium">Full Name:</span>
          <span>{user.fullName || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{user.email || "N/A"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Gender:</span>
          <span>{user.gender || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};