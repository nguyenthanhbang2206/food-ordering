import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyRestaurant,
  updateStatusOfRestaurant,
  updateRestaurant,
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
  const { userRestaurant, loading, error } = useSelector(
    (state) => state.restaurant
  );

  // Gọi API để lấy thông tin nhà hàng
  useEffect(() => {
    dispatch(getMyRestaurant());
  }, [dispatch]);

  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    openingHours: "",
    contactInformation: {
      email: "",
      phoneNumber: "",
      facebook: "",
      instagram: "",
    },
    images: [],
    address: {
      city: "",
      district: "",
      ward: "",
      street: "",
    },
  });

  useEffect(() => {
    if (userRestaurant) {
      setForm({
        name: userRestaurant.name || "",
        description: userRestaurant.description || "",
        openingHours: userRestaurant.openingHours || "",
        contactInformation: userRestaurant.contactInformation || {
          email: "",
          phoneNumber: "",
          facebook: "",
          instagram: "",
        },
        images: userRestaurant.images || [],
        address: userRestaurant.address || {
          city: "",
          district: "",
          ward: "",
          street: "",
        },
      });
    }
  }, [userRestaurant]);

  const handleStatusToggle = () => {
    dispatch(updateStatusOfRestaurant());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["email", "phoneNumber", "facebook", "instagram"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        contactInformation: { ...prev.contactInformation, [name]: value },
      }));
    } else if (["city", "district", "ward", "street"].includes(name)) {
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({
      ...prev,
      images: files.map((file) => file.name), // hoặc upload file và lấy url
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRestaurant(form));
    setShowEdit(false);
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
        <div>
          <button
            onClick={() => setShowEdit(true)}
            className="px-4 py-2 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 mr-2"
          >
            Edit
          </button>
          <button
            onClick={handleStatusToggle}
            className={`px-4 py-2 rounded-lg text-white ${
              userRestaurant.open
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {userRestaurant.open ? "Set to Closed" : "Set to Open"}
          </button>
        </div>
      </div>

      {showEdit ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Opening Hours</label>
            <input
              name="openingHours"
              value={form.openingHours}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Contact Information
            </label>
            <input
              name="email"
              value={form.contactInformation.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border px-3 py-2 rounded mb-2"
              required
            />
            <input
              name="phoneNumber"
              value={form.contactInformation.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border px-3 py-2 rounded mb-2"
              required
            />
            <input
              name="facebook"
              value={form.contactInformation.facebook}
              onChange={handleChange}
              placeholder="Facebook"
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <input
              name="instagram"
              value={form.contactInformation.instagram}
              onChange={handleChange}
              placeholder="Instagram"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Address</label>
            <input
              name="city"
              value={form.address.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border px-3 py-2 rounded mb-2"
              required
            />
            <input
              name="district"
              value={form.address.district}
              onChange={handleChange}
              placeholder="District"
              className="w-full border px-3 py-2 rounded mb-2"
              required
            />
            <input
              name="ward"
              value={form.address.ward}
              onChange={handleChange}
              placeholder="Ward"
              className="w-full border px-3 py-2 rounded mb-2"
              required
            />
            <input
              name="street"
              value={form.address.street}
              onChange={handleChange}
              placeholder="Street"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowEdit(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              General Information
            </h2>
            <p className="text-lg text-gray-700 flex items-center mb-4">
              <PersonIcon className="text-blue-500 mr-2" />
              <strong className="mr-2">Owner:</strong>{" "}
              {userRestaurant.owner.fullName}
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
                <strong className="mr-2">City:</strong>{" "}
                {userRestaurant.address.city}
              </p>
              <p className="text-lg text-gray-700 flex items-center mb-4">
                <LocationCityIcon className="text-blue-500 mr-2" />
                <strong className="mr-2">District:</strong>{" "}
                {userRestaurant.address.district}
              </p>
              <p className="text-lg text-gray-700 flex items-center mb-4">
                <LocationCityIcon className="text-blue-500 mr-2" />
                <strong className="mr-2">Ward:</strong>{" "}
                {userRestaurant.address.ward}
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
        </>
      )}
    </div>
  );
};
