import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createRestaurant, getMyRestaurant } from "../State/Restaurant/Action";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

export const CreateRestaurant = () => {
  const [formData, setFormData] = useState({
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
      street: "",
      ward: "",
      district: "",
      city: "",
    },
  });

  const [imageFiles, setImageFiles] = useState([]);
  const dispatch = useDispatch();
  const { restaurant, loading, error, message } = useSelector(
    (state) => state.restaurant
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [previewImages, setPreviewImages] = useState([]);

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
  const uploadImages = async () => {
    if (imageFiles.length === 0) {
      alert("Please select images to upload.");
      return [];
    }
    try {
      const urls = [];
      for (const file of imageFiles) {
        const url = await uploadToCloudinary(file, "image");
        if (url) urls.push(url);
      }
      return urls;
    } catch (error) {
      alert("Failed to upload images to Cloudinary.");
      return [];
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previewUrls]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImages = await uploadImages();
    if (uploadedImages.length === 0) return;
    const restaurantData = {
      ...formData,
      images: uploadedImages,
    };
    try {
      await dispatch(createRestaurant(restaurantData));
      setSnackbar({
        open: true,
        message: "Restaurant created successfully!",
        severity: "success",
      });
      dispatch(getMyRestaurant());
    } catch {
      setSnackbar({
        open: true,
        message: error || "An unknown error occurred.",
        severity: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Restaurant
        </h2>

        {message && (
          <div
            className={`mb-4 p-4 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          {/* Opening Hours */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Opening Hours
            </label>
            <input
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Facebook
            </label>
            <input
              type="text"
              name="contactInformation.facebook"
              value={formData.contactInformation.facebook}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instagram
            </label>
            <input
              type="text"
              name="contactInformation.instagram"
              value={formData.contactInformation.instagram}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Street
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Ward
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          {/* Preview Images */}
          <div className="col-span-2 overflow-x-auto">
            <div className="flex gap-4">
              {previewImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => {
                      setPreviewImages((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                      setImageFiles((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Upload Images */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
