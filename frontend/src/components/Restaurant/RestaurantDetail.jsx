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

const menu = [1, 1, 1, 1, 1, 1];
const categories = ["pizza", "burger", "sushi", "salad", "dessert", "drink"];
const foodTypes = [
  { label: "All", value: "all" },
  { label: "Cuisine", value: "cuisine" },
  { label: "Spicy", value: "spicy" },
  { label: "Category", value: "category" },
];

export const RestaurantDetail = () => {
  const [foodType, setFoodType] = useState("all");
  const [category, setCategory] = useState("");

  const handleFoodTypeFilter = (e) => {
    setFoodType(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Banner Section */}
      <section className="w-full max-w-screen-xl mx-auto px-4 mt-10">
        <h3>Fast food</h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
              <img
                className="w-[100vw] h-[50vh] object-cover"
                src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ="
                alt="Restaurant Banner"
              />
            </Grid>
          </Grid>
        </div>
        <div className="w-[50vw] z-10 text-center absolute bottom-10">
          <p className="text-4xl font-bold text-white">Name</p>
          <p className="z-10 font-bold text-white">Desc</p>
          <div className="flex justify-center items-center space-x-2 text-white">
            <LocationOnIcon />
            <span>HN</span>
            <CalendarToday sx={{ fontSize: 20, color: "white" }} />
            <span>Time</span>
          </div>
        </div>
      </section>

      <Divider sx={{ width: "100vw", marginTop: "2rem" }} />

      {/* Main Content Section */}
      <section className="flex justify-center mt-10 w-full px-4 lg:px-20">
        <Grid container spacing={4}>
          {/* Filter Section (Left) */}
          <Grid item xs={12} lg={3}>
            <div className="space-y-8 sticky top-28">
              <div>
                <Typography variant="h5" gutterBottom>
                  Filter by food type
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    onChange={handleFoodTypeFilter}
                    name="foodType"
                    value={foodType}
                  >
                    {foodTypes.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>

              <Divider />

              <div>
                <Typography variant="h5" gutterBottom>
                  Filter by Category
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    onChange={handleCategoryFilter}
                    name="category"
                    value={category}
                  >
                    {categories.map((item) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={<Radio />}
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} lg={9}>
  <div className="grid grid-cols-1 gap-6">
    {menu.map((item, index) => (
      <MenuCard key={index} />
    ))}
  </div>
</Grid>
        </Grid>
      </section>
    </div>
  );
};
