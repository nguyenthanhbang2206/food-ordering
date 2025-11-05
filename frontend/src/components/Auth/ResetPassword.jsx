import React, { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${API_URL}/api/v1/auth/reset-password`, {
      token,
      newPassword,
    });

    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Đặt lại mật khẩu
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
     
    </div>
  );
};
