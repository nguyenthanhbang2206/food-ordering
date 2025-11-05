import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFood,
  getCategoriesByRestaurant,
  getIngredientsByRestaurant,
} from "../State/Restaurant/Action";
import axios from "axios";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useTheme,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

export const FoodEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { food } = location.state;
  const theme = useTheme();

  const { categories, ingredients } = useSelector((state) => state.restaurant);

  const [formData, setFormData] = useState({
    id: food.id,
    name: food.name,
    description: food.description,
    price: food.price,
    images: food.images,
    foodCategoryId: food.foodCategory.id,
    ingredients: food.ingredients.map((ingredient) => ingredient.id),
    cuisine: food.cuisine,
    vegetarian: food.vegetarian,
    spicy: food.spicy,
  });


  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState(food.images || []);

  useEffect(() => {
    dispatch(getCategoriesByRestaurant());
    dispatch(getIngredientsByRestaurant());
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
  };

  const uploadImages = async () => {
    // Upload tất cả file lên Cloudinary, trả về mảng url
    if (imageFiles.length === 0) {
      return formData.images; // Nếu không có ảnh mới, giữ nguyên ảnh cũ
    }
    const urls = [];
    for (const file of imageFiles) {
      const url = await uploadToCloudinary(file, "image");
      if (url) urls.push(url);
    }
    // Ghép ảnh cũ (còn lại) và ảnh mới
    return [...formData.images, ...urls];
  };
  const handleDeleteOldImage = (url) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== url),
    }));
  };

  const handleDeleteNewImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedImages = await uploadImages();
      const updatedFoodData = {
        ...formData,
        images: uploadedImages,
      };
      dispatch(updateFood(formData.id, updatedFoodData));
      navigate("/admin/restaurant/food");
    } catch (err) {
      // Không cần setSnackbar nữa
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Food</h1>
      <form onSubmit={handleSubmit}>
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
                          ingredients.find(
                            (ingredient) => ingredient.id === value
                          )?.name || "N/A"
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

        <div className="flex gap-4">
          {formData.images.map((image, index) => (
            <div key={`old-${index}`} className="relative">
              <img
                src={image}
                alt={`Old Preview ${index}`}
                className="w-24 h-24 object-cover rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={() => handleDeleteOldImage(image)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                x
              </button>
            </div>
          ))}
          {/* Hiển thị ảnh mới upload (dùng URL.createObjectURL) */}
          {imageFiles.map((file, index) => (
            <div key={`new-${index}`} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`New Preview ${index}`}
                className="w-24 h-24 object-cover rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={() => handleDeleteNewImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                x
              </button>
            </div>
          ))}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Update Food
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/restaurant/food")}
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
     
    </div>
  );
};
