import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${API_URL}/api/v1/auth/forgot-password`, {
      email,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Quên mật khẩu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </div>
  );
};
