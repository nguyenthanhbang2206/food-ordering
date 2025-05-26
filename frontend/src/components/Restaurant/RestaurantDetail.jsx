

import {
  Divider,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CalendarToday } from "@mui/icons-material";
import { MenuCard } from "./MenuCard";
import {
  getAllFoods,
  getRestaurantById,
  getCategoriesByRestaurantId,
} from "../State/Restaurant/Action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const RestaurantDetail = () => {
  const { foods, categories, loading, error, restaurant, pagination } =
    useSelector((state) => state.restaurant);
  const { id: restaurantId } = useParams();
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
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1);
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && (!pagination || newPage <= pagination.totalPages)) {
      setPage(newPage);
    }
  };
  const handleSortChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      sort: e.target.value,
    }));
    setPage(1);
  };
  const handleSizeChange = (e) => {
    setSize(Number(5));
    setPage(1);
  };

  useEffect(() => {
    dispatch(getRestaurantById(restaurantId));
    dispatch(getCategoriesByRestaurantId(restaurantId));
    dispatch(getAllFoods(restaurantId, filters, page, size));
  }, [restaurantId, filters, page, size, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#E6E6FA] to-white min-h-screen">
      {/* Banner */}
      <section className="w-full max-w-screen-xl mx-auto px-4 mt-10">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          {/* Ảnh banner */}
          <img
            src={
              restaurant?.images && restaurant.images.length > 0
                ? `http://localhost:8080/images/restaurants/${restaurant.images[0]}`
                : "/default-restaurant.jpg"
            }
            alt={restaurant?.name}
            className="w-full max-h-[400px] object-cover"
            style={{ filter: "brightness(0.85) blur(0px)" }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white px-4">
            <h3 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg">
              {restaurant?.name}
            </h3>
            <p className="text-lg md:text-xl text-center text-gray-200 mt-2 max-w-2xl">
              {restaurant?.description}
            </p>
            <div className="flex flex-wrap justify-center items-center space-x-4 mt-4 text-base md:text-lg">
              <span className="flex items-center gap-1">
                <LocationOnIcon sx={{ fontSize: 22 }} />
                {restaurant?.address &&
                  `${restaurant.address.street}, ${restaurant.address.ward}, ${restaurant.address.district}, ${restaurant.address.city}`}
              </span>
              <span className="flex items-center gap-1">
                <CalendarToday sx={{ fontSize: 20 }} />
                {restaurant?.openingHours}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Divider sx={{ width: "100vw", marginTop: "2rem" }} />

      {/* Main Content Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 mt-10">
        <Grid container spacing={6}>
          {/* Filter Section */}
          <Grid item xs={12} lg={4}>
            <div className="flex flex-col space-y-8 bg-white rounded-2xl shadow-lg p-6">
              {/* Filter by Cuisine */}
              <div>
                <Typography variant="h5" gutterBottom className="font-bold text-[#5A20CB]">
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
                    <FormControlLabel value="" control={<Radio />} label="All" />
                    <FormControlLabel value="vietnamese" control={<Radio />} label="Vietnamese" />
                    <FormControlLabel value="italian" control={<Radio />} label="Italian" />
                    <FormControlLabel value="chinese" control={<Radio />} label="Chinese" />
                  </RadioGroup>
                </FormControl>
              </div>

              {/* Filter by Vegetarian */}
              <div>
                <Typography variant="h5" gutterBottom className="font-bold text-[#5A20CB]">
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
                    <FormControlLabel value="" control={<Radio />} label="All" />
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </div>

              {/* Filter by Spicy */}
              <div>
                <Typography variant="h5" gutterBottom className="font-bold text-[#5A20CB]">
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
                    <FormControlLabel value="" control={<Radio />} label="All" />
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </div>

              {/* Filter by Category */}
              <div>
                <Typography variant="h5" gutterBottom className="font-bold text-[#5A20CB]">
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
                    <FormControlLabel value="" control={<Radio />} label="All" />
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
              {/* Sort by Price */}
              <div>
                <Typography variant="h5" gutterBottom className="font-bold text-[#5A20CB]">
                  Sort by Price
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    onChange={handleSortChange}
                    name="sort"
                    value={filters.sort}
                  >
                    <FormControlLabel value="price,desc" control={<Radio />} label="Giảm dần" />
                    <FormControlLabel value="price,asc" control={<Radio />} label="Tăng dần" />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </Grid>

          {/* Foods Section */}
          <Grid item xs={12} lg={8}>
            <div className="grid grid-cols-1 gap-6">
              {loading && <p>Loading...</p>}
              {!loading &&
                foods.map((food) => <MenuCard key={food.id} food={food} />)}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-2">
              <div>
                <button
                  className="px-4 py-2 rounded bg-[#5A20CB] text-white font-semibold mr-2 shadow hover:bg-[#431a9e] transition"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 rounded bg-[#5A20CB] text-white font-semibold shadow hover:bg-[#431a9e] transition"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={pagination && page >= pagination.totalPages}
                >
                  Next
                </button>
              </div>
              <div className="text-[#5A20CB] font-semibold">
                Page {page} / {pagination ? pagination.totalPages : 1}
              </div>
            </div>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};