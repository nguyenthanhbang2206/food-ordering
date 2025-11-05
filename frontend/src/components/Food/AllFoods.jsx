import React, { useEffect, useState } from "react";
import {
  Divider,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { MenuCard } from "../Restaurant/MenuCard";
const API_URL = process.env.REACT_APP_API_URL;
const CUISINE_OPTIONS = [
  "Việt Nam",
  "Trung Quốc",
  "Nhật Bản",
  "Hàn Quốc",
  "Thái Lan",
  "Ấn Độ",
  "Pháp",
  "Ý",
  "Tây Ban Nha",
  "Mexico",
  "Mỹ",
  "Brazil",
  "Thổ Nhĩ Kỳ",
  "Hy Lạp",
  "Đức",
  "Nga",
  "Anh",
  "Indonesia",
  "Malaysia",
  "Singapore",
];

export const AllFoods = () => {
  // ...existing state and logic...
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
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
  const [size] = useState(8);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách category toàn hệ thống
  // ...existing code...
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/v1/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(res.data.data || []);
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);
  // ...existing code...

  useEffect(() => {
    fetchFoods();
    // eslint-disable-next-line
  }, [filters, page, size]);

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const params = {
        page: page,
        size: size,
        available: filters.available,
        cuisine: filters.cuisine || undefined,
        vegetarian: filters.vegetarian !== "" ? filters.vegetarian : undefined,
        spicy: filters.spicy !== "" ? filters.spicy : undefined,
        category: filters.category || undefined,
        prices: filters.prices.length > 0 ? filters.prices : undefined,
      };
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/v1/foods`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoods(res.data.data.items || []);
      setPagination(res.data.data.pagination);
    } catch {
      setFoods([]);
      setPagination(null);
    }
    setLoading(false);
  };

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

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#E6E6FA] to-white min-h-screen">
      <section className="w-full max-w-screen-xl mx-auto px-4 mt-10">
        <h1 className="text-3xl font-bold text-[#2563EB] mb-8 text-center">
          All Foods
        </h1>
        {/* Sử dụng flex thay vì Grid để filter và foods nằm cùng dòng */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Section */}
          <div className="w-full lg:w-1/3">
            <div className="flex flex-col space-y-8 bg-white rounded-2xl shadow-lg p-6">
              {/* Filter by Cuisine */}
              <div>
                <Typography
                  variant="h5"
                  gutterBottom
                  className="font-bold text-[#2563EB]"
                >
                  Filter by Cuisine
                </Typography>
                <label className="block mb-2 text-gray-700 font-medium">
                  Cuisine
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-[#2563EB] bg-white"
                  value={filters.cuisine}
                  onChange={(e) =>
                    handleFilterChange("cuisine", e.target.value)
                  }
                >
                  <option value="">All</option>
                  {CUISINE_OPTIONS.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>
              {/* Filter by Vegetarian */}
              <div>
                <Typography
                  variant="h5"
                  gutterBottom
                  className="font-bold text-[#2563EB]"
                >
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
                <Typography
                  variant="h5"
                  gutterBottom
                  className="font-bold text-[#2563EB]"
                >
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
                <Typography
                  variant="h5"
                  gutterBottom
                  className="font-bold text-[#2563EB]"
                >
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
              {/* Sort by Price */}
              <div>
                <Typography
                  variant="h5"
                  gutterBottom
                  className="font-bold text-[#2563EB]"
                >
                  Sort by Price
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    onChange={handleSortChange}
                    name="sort"
                    value={filters.sort}
                  >
                    <FormControlLabel
                      value="price,desc"
                      control={<Radio />}
                      label="Giảm dần"
                    />
                    <FormControlLabel
                      value="price,asc"
                      control={<Radio />}
                      label="Tăng dần"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          {/* Foods Section */}
          <div className="w-full lg:w-2/3">
            {loading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <p>Loading...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.map((food) => (
                  <MenuCard key={food.id} food={food} />
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-2">
              <div>
                <button
                  className="px-4 py-2 rounded bg-[#2563EB] text-white font-semibold mr-2 shadow hover:bg-[#431a9e] transition"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 rounded bg-[#2563EB] text-white font-semibold shadow hover:bg-[#431a9e] transition"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={pagination && page >= pagination.totalPages}
                >
                  Next
                </button>
              </div>
              <div className="text-[#2563EB] font-semibold">
                Page {pagination ? pagination.page : page} /{" "}
                {pagination ? pagination.totalPages : 1}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
