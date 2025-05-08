import {
  Divider,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CalendarToday } from "@mui/icons-material";
import { MenuCard } from "./MenuCard";
import {
  getAllFoods,
  getRestaurantById,
  getCategoriesByRestaurantId,
} from "../State/Restaurant/Action";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const RestaurantDetail = () => {
  const { foods, categories, loading, error, restaurant } = useSelector(
    (state) => state.restaurant
  );
  const { id: restaurantId } = useParams(); // Lấy restaurantId từ URL
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    available: true,
    cuisine: "",
    vegetarian: "",
    spicy: "",
    category: "",
    prices: [],
    sort: "price,desc",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    // Lấy thông tin chi tiết của restaurant
    dispatch(getRestaurantById(restaurantId));
  }, [restaurantId, dispatch]);
  // Gọi API khi filters thay đổi
  useEffect(() => {
    // Lấy danh sách categories
    dispatch(getCategoriesByRestaurantId(restaurantId));

    console.log(foods);
    // Lấy danh sách foods
    dispatch(getAllFoods(restaurantId, filters));
  }, [restaurantId, filters, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-full max-w-screen-xl mx-auto px-4 mt-10">
        <div className="relative">
          {/* Ảnh banner */}
          <img
            src={`http://localhost:8080/images/restaurants/${restaurant?.images[0]}`}
            alt={restaurant?.name}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <h3 className="text-4xl font-bold text-center">
              {restaurant?.name}
            </h3>
            <p className="text-lg text-center text-gray-300 mt-2">
              {restaurant?.description}
            </p>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <LocationOnIcon />
              <p>
                {restaurant?.address.street}, {restaurant?.address.ward},{" "}
                {restaurant?.address.district}, {restaurant?.address.city}
              </p>
              <CalendarToday sx={{ fontSize: 20, color: "white" }} />
              <span>{restaurant?.openingHours}</span>
            </div>
          </div>
        </div>
      </section>

      <Divider sx={{ width: "100vw", marginTop: "2rem" }} />

      {/* Main Content Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 mt-10">
        <Grid container spacing={4}>
          {/* Filter Section */}
          <Grid item xs={12} lg={4}>
            <div className="flex flex-col space-y-6">
              {/* Filter by Cuisine */}
              <div>
                <Typography variant="h5" gutterBottom>
                  Filter by Cuisine
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    onChange={(e) =>
                      handleFilterChange("cuisine", e.target.value)
                    }
                    name="cuisine"
                    value={filters.cuisine}
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value="vietnamese"
                      control={<Radio />}
                      label="Vietnamese"
                    />
                    <FormControlLabel
                      value="italian"
                      control={<Radio />}
                      label="Italian"
                    />
                    <FormControlLabel
                      value="chinese"
                      control={<Radio />}
                      label="Chinese"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              {/* Filter by Vegetarian */}
              <div>
                <Typography variant="h5" gutterBottom>
                  Filter by Vegetarian
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    onChange={(e) =>
                      handleFilterChange("vegetarian", e.target.value)
                    }
                    name="vegetarian"
                    value={filters.vegetarian}
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              {/* Filter by Spicy */}
              <div>
                <Typography variant="h5" gutterBottom>
                  Filter by Spicy
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    onChange={(e) =>
                      handleFilterChange("spicy", e.target.value)
                    }
                    name="spicy"
                    value={filters.spicy}
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              {/* Filter by Category */}
              <div>
                <Typography variant="h5" gutterBottom>
                  Filter by Category
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    name="category"
                    value={filters.category}
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="All"
                    />
                    {categories.map((category) => (
                      <FormControlLabel
                        key={category.id}
                        value={category.name}
                        control={<Radio />}
                        label={category.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </Grid>

          {/* Foods Section */}
          <Grid item xs={12} lg={8}>
            <div className="grid grid-cols-1 gap-6">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">Error: {error}</p>}
              {!loading &&
                foods.map((food) => <MenuCard key={food.id} food={food} />)}
            </div>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};
