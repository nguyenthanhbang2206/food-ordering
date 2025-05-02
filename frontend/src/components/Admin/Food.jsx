import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFoodByRestaurant,
  createFood,
  updateFood,
  deleteFood,
  getIngredientsByRestaurant,
  getCategoriesByRestaurant,
} from "../State/Restaurant/Action";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Food = () => {
  const dispatch = useDispatch();
  const { foods, loading, error, ingredients, categories } = useSelector(
    (state) => state.restaurant
  );
  const [selectedFood, setSelectedFood] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    cuisine: "",
    vegetarian: false,
    spicy: false,
    images: [],
    foodCategoryId: "",
    ingredients: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const theme = useTheme();

  // Gọi API để lấy danh sách món ăn, nguyên liệu và danh mục
  useEffect(() => {
    dispatch(getFoodByRestaurant());
    dispatch(getIngredientsByRestaurant());
    dispatch(getCategoriesByRestaurant());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleIngredientsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prev) => ({
      ...prev,
      ingredients: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const getStyles = (name, selectedIngredients, theme) => {
    return {
      fontWeight: selectedIngredients.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previewUrls]);
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) {
      alert("Please select images to upload.");
      return [];
    }

    const form = new FormData();
    imageFiles.forEach((file) => {
      form.append("files", file);
    });
    form.append("folder", "foods");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/files",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      alert(
        `Failed to upload images: ${
          error.response?.data?.message || error.message
        }`
      );
      return [];
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();

    const uploadedImages = await uploadImages();
    if (uploadedImages.length === 0) return;

    const foodData = {
      ...formData,
      images: uploadedImages,
    };

    console.log("Food Data:", foodData);
    dispatch(createFood(foodData));
    setFormData({
      id: "",
      name: "",
      description: "",
      price: "",
      cuisine: "",
      vegetarian: false,
      spicy: false,
      images: [],
      foodCategoryId: "",
      ingredients: [],
    });
    setImageFiles([]);
    setPreviewImages([]);
    setShowForm(false);
  };
  const navigate = useNavigate();
 
  const handleDeleteFood = (id) => {
    dispatch(deleteFood(id));
  };

  const handleViewFood = (food) => {
    setSelectedFood(food);
    setShowDetailModal(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Food</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setFormData({
              id: "",
              name: "",
              description: "",
              price: "",
              cuisine: "",
              vegetarian: false,
              spicy: false,
              images: [],
              foodCategoryId: "",
              ingredients: [],
            });
            setPreviewImages([]);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Food
        </button>
      </div>

      {/* Hiển thị trạng thái loading */}
      {loading && <p>Loading...</p>}

      {/* Hiển thị lỗi nếu có */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Form thêm hoặc cập nhật món ăn */}
      {showForm && (
        <form
          onSubmit={handleAddFood}
          className="mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleInputChange}
              placeholder="Cuisine"
              required
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                name="vegetarian"
                checked={formData.vegetarian}
                onChange={handleInputChange}
                className="mr-2"
              />
              Vegetarian
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="spicy"
                checked={formData.spicy}
                onChange={handleInputChange}
                className="mr-2"
              />
              Spicy
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />

            {/* Preview Images */}
            <div className="col-span-2 overflow-x-auto">
              <div className="flex gap-4">
                {previewImages.map((image, index) => (
                  <img
                    key={index}
                    // src={image}
                    src={`${image}`}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            
            </div>

            {/* Dropdown for Food Category */}
            <select
              name="foodCategoryId"
              value={formData.foodCategoryId}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Food Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Multi-select for Ingredients */}
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="ingredients-multi-select-label">
                  Ingredients
                </InputLabel>
                <Select
                  labelId="ingredients-multi-select-label"
                  id="ingredients-multi-select"
                  multiple
                  value={formData.ingredients}
                  onChange={handleIngredientsChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Ingredients"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={
                            ingredients.find((ingredient) => ingredient.id === value)
                              ?.name || "N/A"
                          }
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {ingredients.map((ingredient) => (
                    <MenuItem
                      key={ingredient.id}
                      value={ingredient.id}
                      style={getStyles(
                        ingredient.id,
                        formData.ingredients,
                        theme
                      )}
                    >
                      {ingredient.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              {"Add Food"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Hiển thị danh sách món ăn */}
      {!loading && foods && foods.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                Image
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                Price
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  <img
                    src={`http://localhost:8080/images/foods/${food.images[0]}`}
                    alt={food.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  {food.name}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  ${food.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  {categories.find((cat) => cat.id === food.foodCategory.id)
                    ?.name || "N/A"}
                </td>
                <td className="px-4 py-2 border-b text-sm text-gray-700">
                  <button
                    onClick={() => handleViewFood(food)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setFormData(food);
                      navigate(`/admin/restaurant/food/edit`, { state: { food } });
                      setPreviewImages(food.images || []);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFood(food.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No food items available.</p>
      )}
      {/* Modal for View Food Details */}
      <Modal
        open={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <h2 className="text-xl font-bold mb-4">Food Details</h2>
          {selectedFood && (
            <div>
              <p>
                <strong>Name:</strong> {selectedFood.name}
              </p>
              <p>
                <strong>Description:</strong> {selectedFood.description}
              </p>
              <p>
                <strong>Price:</strong> ${selectedFood.price.toFixed(2)}
              </p>
              <p>
                <strong>Cuisine:</strong> {selectedFood.cuisine}
              </p>
              <p>
                <strong>Vegetarian:</strong>{" "}
                {selectedFood.vegetarian ? "Yes" : "No"}
              </p>
              <p>
                <strong>Spicy:</strong> {selectedFood.spicy ? "Yes" : "No"}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                {selectedFood.foodCategory.name || "N/A"}
              </p>
              <p>
                <strong>Ingredients:</strong>{" "}
                {selectedFood.ingredients
                  .map((ingredient) => ingredient.name)
                  .join(", ")}
              </p>
              <div className="flex gap-4 mt-4">
                {selectedFood.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8080/images/foods/${image}`}
                    alt={`Food Image ${index}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          )}
          <div className="mt-4 flex justify-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowDetailModal(false)}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};