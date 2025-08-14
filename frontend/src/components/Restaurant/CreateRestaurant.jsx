import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRestaurant, getMyRestaurant } from "../State/Restaurant/Action";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const CreateRestaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userRestaurant } = useSelector((state) => state.restaurant);

  useEffect(() => {
    if (userRestaurant) {
      navigate("/admin/restaurant/dashboard");
    }
  }, [userRestaurant, navigate]);

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

  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const { restaurant, loading, error, message } = useSelector(
    (state) => state.restaurant
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Handle input change
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

  // Handle image selection and upload immediately (multiple images)
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);

    // Keep previous images if needed, or clear for new batch
    let urls = [...formData.images];
    let previews = [...previewImages];

    for (const file of files) {
      const url = await uploadToCloudinary(file, "image");
      if (url) {
        urls.push(url);
        previews.push(url);
      }
    }
    setFormData((prev) => ({
      ...prev,
      images: urls,
    }));
    setPreviewImages(previews);
    setUploading(false);
  };

  // Remove image from preview and formData
  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) {
      alert("Image is uploading, please wait!");
      return;
    }
    if (!formData.images.length) {
      alert("Please select and upload images first!");
      return;
    }
    try {
      // Tạo restaurant và lấy kết quả trả về
      const result = await dispatch(createRestaurant(formData));
      setSnackbar({
        open: true,
        message: "Restaurant created successfully!",
        severity: "success",
      });
      // Redirect thẳng đến dashboard
      navigate("/admin/restaurant/dashboard");
      // Không cần gọi lại getMyRestaurant ở đây
      setFormData({
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
      setPreviewImages([]);
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
              disabled={uploading}
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
              disabled={uploading}
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
              disabled={uploading}
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
              disabled={uploading}
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
              disabled={uploading}
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
              disabled={uploading}
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
              disabled={uploading}
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
              disabled={uploading}
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
              disabled={uploading}
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
              disabled={uploading}
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
              disabled={uploading}
            />
          </div>

          {/* Preview Images */}
          <div className="col-span-2 overflow-x-auto">
            <div className="flex gap-4 flex-row">
              {previewImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
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
              disabled={uploading}
            />
            {uploading && (
              <div className="text-blue-600 mt-2">Uploading image…</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={uploading}
            >
              Create Restaurant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
