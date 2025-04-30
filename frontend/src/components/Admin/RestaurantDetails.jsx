import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export const RestaurantDetails = () => {
  // Dữ liệu giả lập
  const restaurant = {
    owner: "John Doe",
    name: "The Gourmet Kitchen",
    openingHours: "Mon-Sun: 9:00 AM - 9:00 PM",
    status: "Open",
    address: {
      city: "Hà Nội",
      district: "Cầu Giấy",
      ward: "Dịch Vọng",
      street: "123 Main Street",
    },
    contactInformation: {
      email: "contact@gourmetkitchen.com",
      phoneNumber: "123-456-7890",
      facebook: "@gourmetkitchen",
      instagram: "@gourmetkitchen",
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Restaurant Details
      </h1>

      {/* Card 1 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          General Information
        </h2>
        <p className="text-lg text-gray-700 flex items-center mb-4">
          <PersonIcon className="text-blue-500 mr-2" />
          <strong className="mr-2">Owner:</strong> {restaurant.owner}
        </p>
        <p className="text-lg text-gray-700 flex items-center mb-4">
          <CheckCircleIcon className="text-green-500 mr-2" />
          <strong className="mr-2">Name:</strong> {restaurant.name}
        </p>
        <p className="text-lg text-gray-700 flex items-center mb-4">
          <AccessTimeIcon className="text-yellow-500 mr-2" />
          <strong className="mr-2">Opening Hours:</strong>{" "}
          {restaurant.openingHours}
        </p>
        <p className="text-lg text-gray-700 flex items-center">
          <CheckCircleIcon className="text-green-500 mr-2" />
          <strong className="mr-2">Status:</strong> {restaurant.status}
        </p>
      </div>

      {/* Row with Card 2 and Card 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Address</h2>
          <p className="text-lg text-gray-700 flex items-center mb-4">
            <LocationCityIcon className="text-blue-500 mr-2" />
            <strong className="mr-2">City:</strong> {restaurant.address.city}
          </p>
          <p className="text-lg text-gray-700 flex items-center mb-4">
            <LocationCityIcon className="text-blue-500 mr-2" />
            <strong className="mr-2">District:</strong>{" "}
            {restaurant.address.district}
          </p>
          <p className="text-lg text-gray-700 flex items-center mb-4">
            <LocationCityIcon className="text-blue-500 mr-2" />
            <strong className="mr-2">Ward:</strong> {restaurant.address.ward}
          </p>
          <p className="text-lg text-gray-700 flex items-center">
            <LocationCityIcon className="text-blue-500 mr-2" />
            <strong className="mr-2">Street:</strong>{" "}
            {restaurant.address.street}
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
            {restaurant.contactInformation.email}
          </p>
          <p className="text-lg text-gray-700 flex items-center mb-4">
            <PhoneIcon className="text-green-500 mr-2" />
            <strong className="mr-2">Phone Number:</strong>{" "}
            {restaurant.contactInformation.phoneNumber}
          </p>
          <p className="text-lg text-gray-700 flex items-center mb-4">
            <FacebookIcon className="text-blue-600 mr-2" />
            <strong className="mr-2">Facebook:</strong>{" "}
            {restaurant.contactInformation.facebook}
          </p>
          <p className="text-lg text-gray-700 flex items-center">
            <InstagramIcon className="text-pink-500 mr-2" />
            <strong className="mr-2">Instagram:</strong>{" "}
            {restaurant.contactInformation.instagram}
          </p>
        </div>
      </div>
    </div>
  );
};
