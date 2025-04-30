import React, { useState, useEffect } from "react";

export const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  // Giả lập dữ liệu hoặc gọi API để lấy danh sách ingredients
  useEffect(() => {
    // Dữ liệu giả lập
    const mockIngredients = [
      { id: 1, name: "Tomato" },
      { id: 2, name: "Cheese" },
      { id: 3, name: "Basil" },
      { id: 4, name: "Beef" },
    ];
    setIngredients(mockIngredients);

    // Nếu cần gọi API, thay thế đoạn trên bằng:
    // fetch("/api/ingredients")
    //   .then((response) => response.json())
    //   .then((data) => setIngredients(data))
    //   .catch((error) => console.error("Error fetching ingredients:", error));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Ingredients</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
              ID
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
              Name
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
