import React from "react";

export const UserProfile = () => {
  const user = {
    fullName: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://via.placeholder.com/150",
    gender: "Male",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold">{user.fullName}</p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium">Full Name:</span>
          <span>{user.fullName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Gender:</span>
          <span>{user.gender}</span>
        </div>
      </div>
    </div>
  );
};
