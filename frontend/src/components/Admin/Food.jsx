import React, { useState, useEffect } from "react";

export const Food = () => {
  const [foods, setFoods] = useState([]);

  // Giả lập dữ liệu hoặc gọi API để lấy danh sách food
  useEffect(() => {
    // Dữ liệu giả lập
    const mockFoods = [
      {
        id: 1,
        name: "Pizza",
        ingredients: "Cheese, Tomato, Basil",
        price: 12.99,
        availability: true,
        image: "https://via.placeholder.com/100", // URL hình ảnh giả lập
      },
      {
        id: 2,
        name: "Burger",
        ingredients: "Beef, Lettuce, Tomato",
        price: 8.99,
        availability: false,
        image: "https://via.placeholder.com/100", // URL hình ảnh giả lập
      },
      {
        id: 3,
        name: "Pasta",
        ingredients: "Pasta, Cream, Mushroom",
        price: 10.5,
        availability: true,
        image: "https://via.placeholder.com/100", // URL hình ảnh giả lập
      },
    ];
    setFoods(mockFoods);

    // Nếu cần gọi API, thay thế đoạn trên bằng:
    // fetch("/api/foods")
    //   .then((response) => response.json())
    //   .then((data) => setFoods(data))
    //   .catch((error) => console.error("Error fetching foods:", error));
  }, []);

  // Xử lý xóa món ăn
  const handleDelete = (id) => {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);

    // Nếu cần gọi API để xóa, thay thế đoạn trên bằng:
    // fetch(`/api/foods/${id}`, { method: "DELETE" })
    //   .then(() => setFoods((prev) => prev.filter((food) => food.id !== id)))
    //   .catch((error) => console.error("Error deleting food:", error));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Food</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Image</th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Name</th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Ingredients</th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Price</th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Availability</th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b text-sm text-gray-700">
                <img src={food.image} alt={food.name} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-700">{food.name}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-700">{food.ingredients}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-700">${food.price.toFixed(2)}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-700">
                {food.availability ? "Available" : "Unavailable"}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-700">
                <button
                  onClick={() => handleDelete(food.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};