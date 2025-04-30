import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientsByRestaurant,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../State/Restaurant/Action";

export const Ingredients = () => {
  const dispatch = useDispatch();
  const { ingredients, loading, error } = useSelector((state) => state.restaurant);

  const [formData, setFormData] = useState({ id: "", name: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Gọi API để lấy danh sách nguyên liệu
  useEffect(() => {
    dispatch(getIngredientsByRestaurant());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    dispatch(createIngredient({ name: formData.name }));
    setFormData({ id: "", name: "" });
  };

  const handleUpdateIngredient = (e) => {
    e.preventDefault();
    dispatch(updateIngredient(formData.id, { name: formData.name }));
    setFormData({ id: "", name: "" });
    setIsEditing(false);
  };

  const handleDeleteIngredient = (id) => {
    dispatch(deleteIngredient(id));
  };

  const handleEditClick = (ingredient) => {
    setFormData(ingredient);
    setIsEditing(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Ingredients</h1>

      {/* Hiển thị trạng thái loading */}
      {loading && <p>Loading...</p>}

      {/* Hiển thị lỗi nếu có */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Form thêm hoặc cập nhật nguyên liệu */}
      <form
        onSubmit={isEditing ? handleUpdateIngredient : handleAddIngredient}
        className="mb-6"
      >
        <div className="flex items-center gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ingredient Name"
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

      {/* Hiển thị bảng danh sách nguyên liệu */}
      {!loading && (
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
            {ingredients.map((ingredient) => (
              <tr key={ingredient.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  {ingredient.id}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  {ingredient.name}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  <button
                    onClick={() => handleEditClick(ingredient)}
                    className="px-3 py-1 mr-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteIngredient(ingredient.id)}
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