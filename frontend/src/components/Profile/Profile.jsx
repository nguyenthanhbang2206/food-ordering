import React from "react";
import { ProfileNavigation } from "./ProfileNavigation";
import { Routes, Route } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import { Order } from "./Order";
import { Favorite } from "./Favorite";
import { Address } from "./Address";


export const Profile = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Profile Navigation */}
      <aside className="lg:w-1/4 w-full">
        <ProfileNavigation />
      </aside>

      {/* Profile Content */}
      <main className="lg:w-3/4 w-full bg-white shadow-md rounded-lg p-4">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="orders" element={<Order />} />
          <Route path="favorites" element={<Favorite />} />
          <Route path="address" element={<Address />} />
          <Route
            path="*"
            element={
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Welcome to Your Profile
                </h2>
                <p className="text-gray-600">
                  Select an option from the navigation menu to view or manage
                  your profile details.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};
