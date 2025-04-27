import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../State/Auth/Action";

export const CreateRestaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: {
      street: "",
      ward: "",
      district: "",
      city: "",
    },
    contactInformation: {
      email: "",
      phoneNumber: "",
      facebook: "",
      instagram: "",
    },
    openingHours: "",
    images: [],
  });

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRestaurant({ token, restaurantData: formData }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Restaurant</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Street</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ward</label>
            <input
              type="text"
              name="address.ward"
              value={formData.address.ward}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">District</label>
            <input
              type="text"
              name="address.district"
              value={formData.address.district}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="contactInformation.email"
              value={formData.contactInformation.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="contactInformation.phoneNumber"
              value={formData.contactInformation.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Opening Hours</label>
            <input
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Images (comma-separated URLs)</label>
            <input
              type="text"
              name="images"
              value={formData.images}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  images: e.target.value.split(","),
                }))
              }
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};