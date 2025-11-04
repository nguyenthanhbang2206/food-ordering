import React from "react";
import { useNavigate } from "react-router-dom";

export const ThankYou = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#E6E6FA] to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-[#2563EB] mb-4">Thank You!</h1>
        <p className="text-lg mb-6">
          Your order has been placed successfully.
          <br />
          We appreciate your trust and will process your order soon.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-semibold shadow"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
