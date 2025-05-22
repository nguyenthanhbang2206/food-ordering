import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../State/Auth/Action";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const success = useSelector((state) => state.auth.success);

  // State cho form
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [showForm, setShowForm] = useState(false);

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">Loading user profile...</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ fullName, gender }));
    setShowForm(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-semibold">{user.fullName || "N/A"}</p>
          <p className="text-gray-500">{user.email || "N/A"}</p>
        </div>
      </div>

      {!showForm ? (
        <>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-medium w-1/3">Full Name:</span>
              <span className="w-2/3">{user.fullName || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium w-1/3">Gender:</span>
              <span className="w-2/3">{user.gender || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium w-1/3">Email:</span>
              <span className="w-2/3">{user.email || "N/A"}</span>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
            onClick={() => setShowForm(true)}
          >
            Update
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <label className="font-medium w-1/3">Full Name:</label>
            <input
              className="border rounded px-2 py-1 w-2/3"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-medium w-1/3">Gender:</label>
            <select
              className="border rounded px-2 py-1 w-2/3"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium w-1/3">Email:</span>
            <span className="w-2/3">{user.email || "N/A"}</span>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Save"}
            </button>
            <button
              type="button"
              className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 mt-4"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      )}
    </div>
  );
};