import React, { useState, useEffect } from "react";

export const FoodCategories = () => {
  const [categories, setCategories] = useState([]);

  // Giả lập dữ liệu hoặc gọi API để lấy danh sách food categories
  useEffect(() => {
    // Dữ liệu giả lập
    const mockCategories = [
      { id: 1, name: "Pizza" },
      { id: 2, name: "Burger" },
      { id: 3, name: "Pasta" },
      { id: 4, name: "Salad" },
    ];
    setCategories(mockCategories);

    // Nếu cần gọi API, thay thế đoạn trên bằng:
    // fetch("/api/food-categories")
    //   .then((response) => response.json())
    //   .then((data) => setCategories(data))
    //   .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Food Categories</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">ID</th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b text-sm text-gray-700">{category.id}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-700">{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};