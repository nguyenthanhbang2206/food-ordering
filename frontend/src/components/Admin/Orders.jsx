import React, { useState, useEffect } from "react";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Giả lập dữ liệu hoặc gọi API để lấy danh sách orders
  useEffect(() => {
    // Dữ liệu giả lập
    const mockOrders = [
      { id: 1, customer: "John Doe", totalPrice: 120.5, status: "Pending" },
      { id: 2, customer: "Jane Smith", totalPrice: 85.0, status: "Completed" },
      {
        id: 3,
        customer: "Alice Johnson",
        totalPrice: 45.75,
        status: "Cancelled",
      },
    ];
    setOrders(mockOrders);

    // Nếu cần gọi API, thay thế đoạn trên bằng:
    // fetch("/api/orders")
    //   .then((response) => response.json())
    //   .then((data) => setOrders(data))
    //   .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
              ID
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
              Customer
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
              Total Price
            </th>
            <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b text-sm text-gray-700">
                {order.id}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-700">
                {order.customer}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-700">
                ${order.totalPrice.toFixed(2)}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-700">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
