import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyRestaurant,
  updateStatusOfRestaurant,
} from "../State/Restaurant/Action";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export const RestaurantDetails = () => {
  const dispatch = useDispatch();
  const { userRestaurant, loading, error } = useSelector((state) => state.restaurant);

  // Gọi API để lấy thông tin nhà hàng
  useEffect(() => {
    dispatch(getMyRestaurant());
  }, [dispatch]);

  const handleStatusToggle = () => {
    dispatch(updateStatusOfRestaurant());
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!userRestaurant) {
    return <p>No restaurant data available.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Restaurant Details</h1>
        <button
          onClick={handleStatusToggle}
          className={`px-4 py-2 rounded-lg text-white ${
            userRestaurant.open ?  "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {userRestaurant.open ? "Set to Closed" : "Set to Open"}
        </button>
      </div>

      {/* Card 1 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          General Information
        </h2>
        <p className="text-lg text-gray-700 flex items-center mb-4">
          <PersonIcon className="text-blue-500 mr-2" />
          <strong className="mr-2">Owner:</strong> {userRestaurant.owner.fullName}
        </p>
        <p className="text-lg text-gray-700 flex items-center mb-4">
          <CheckCircleIcon className="text-green-500 mr-2" />
          <strong className="mr-2">Name:</strong> {userRestaurant.name}
        </p>
        <p className="text-lg text-gray-700 flex items-center mb-4">
          <AccessTimeIcon className="text-yellow-500 mr-2" />
          <strong className="mr-2">Opening Hours:</strong>{" "}
          {userRestaurant.openingHours}
        </p>
        <p className="text-lg text-gray-700 flex items-center">
          <CheckCircleIcon
            className={`mr-2 ${
              userRestaurant.open ? "text-green-500" : "text-red-500"
            }`}
          />
          <strong className="mr-2">Status:</strong>
          {userRestaurant.open ? "Open" : "Closed"}
        </p>
      </div>

      {/* Row with Card 2 and Card 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Address</h2>
          <p className="text-lg text-gray-700 flex items-center mb-4">
            <LocationCityIcon className="text-blue-500 mr-2" />
            <strong className="mr-2">City:</strong> {userRestaurant.address.city}
          </p>
          <p className="text-lg text-gray-700 flex items-center mb-4">
            <LocationCityIcon className="text-blue-500 mr-2" />
            <strong className="mr-2">District:</strong>{" "}
            {userRestaurant.address.district}
          </p>
          <p className="text-lg text-gray-700 flex items-center mb-4">
            <LocationCityIcon className="text-blue-500 mr-2" />
            <strong className="mr-2">Ward:</strong> {userRestaurant.address.ward}
          </p>
          <p className="text-lg text-gray-700 flex items-center">
            <LocationCityIcon className="text-blue-500 mr-2" />
            <strong className="mr-2">Street:</strong>{" "}
            {userRestaurant.address.street}
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Contact Information
          </h2>
          <p className="text-lg text-gray-700 flex items-center mb-4">
            <EmailIcon className="text-red-500 mr-2" />
            <strong className="mr-2">Email:</strong>{" "}
            {userRestaurant.contactInformation.email}
          </p>
          <p className="text-lg text-gray-700 flex items-center mb-4">
            <PhoneIcon className="text-green-500 mr-2" />
            <strong className="mr-2">Phone Number:</strong>{" "}
            {userRestaurant.contactInformation.phoneNumber}
          </p>
          <p className="text-lg text-gray-700 flex items-center mb-4">
            <FacebookIcon className="text-blue-600 mr-2" />
            <strong className="mr-2">Facebook:</strong>{" "}
            {userRestaurant.contactInformation.facebook}
          </p>
          <p className="text-lg text-gray-700 flex items-center">
            <InstagramIcon className="text-pink-500 mr-2" />
            <strong className="mr-2">Instagram:</strong>{" "}
            {userRestaurant.contactInformation.instagram}
          </p>
        </div>
      </div>
    </div>
  );
};