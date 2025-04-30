import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriesByRestaurant,
  createCategoryOfRestaurant,
  updateCategory,
  deleteCategory,
} from "../State/Restaurant/Action";

export const FoodCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.restaurant);

  const [formData, setFormData] = useState({ id: "", name: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Gọi API để lấy danh sách danh mục
  useEffect(() => {
    dispatch(getCategoriesByRestaurant());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    dispatch(createCategoryOfRestaurant({ name: formData.name }));
    setFormData({ id: "", name: "" });
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    dispatch(updateCategory(formData.id, { name: formData.name }));
    setFormData({ id: "", name: "" });
    setIsEditing(false);
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleEditClick = (category) => {
    setFormData(category);
    setIsEditing(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Food Categories</h1>

      {/* Hiển thị trạng thái loading */}
      {loading && <p>Loading...</p>}

      {/* Hiển thị lỗi nếu có */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Form thêm hoặc cập nhật danh mục */}
      <form
        onSubmit={isEditing ? handleUpdateCategory : handleAddCategory}
        className="mb-6"
      >
        <div className="flex items-center gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Category Name"
            required
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className={`px-4 py-2 text-white rounded-lg ${
              isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isEditing ? "Update" : "Add"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setFormData({ id: "", name: "" });
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Hiển thị bảng danh sách danh mục */}
      {!loading  && (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                ID
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  {category.id}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  {category.name}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="px-3 py-1 mr-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};