import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUserLogin, getOrderById } from "../State/Cart/Action";

export const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, order } = useSelector((state) => state.cart);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    dispatch(getOrderByUserLogin());
  }, [dispatch]);

  const handleViewOrder = (orderId) => {
    setSelectedOrderId(orderId);
    dispatch(getOrderById(orderId));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!loading && orders && orders.length === 0 && (
        <p className="text-center">You have no orders.</p>
      )}
      {!loading && orders && orders.length > 0 && (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 text-left">Order ID</th>
              <th className="py-3 px-4 bg-gray-100 text-left">Status</th>
              <th className="py-3 px-4 bg-gray-100 text-left">Total Price</th>
              <th className="py-3 px-4 bg-gray-100 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4 capitalize">{order.status}</td>
                <td className="py-2 px-4 text-green-600 font-semibold">
                  ${order.totalPrice?.toLocaleString()}
                </td>
                <td className="py-2 px-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Hiển thị chi tiết đơn hàng */}
      {order && selectedOrderId === order.id && (
        <div className="mt-8 p-6 bg-gray-50 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Order Detail (ID: {order.id})</h2>
          <p>
            <span className="font-semibold">Status:</span> {order.status}
          </p>
          <p>
            <span className="font-semibold">Total Items:</span> {order.totalItems}
          </p>
          <p>
            <span className="font-semibold">Total Price:</span> ${order.totalPrice}
          </p>
          <div className="mt-2">
            <span className="font-semibold">Delivery Address:</span>
            <div className="ml-4">
              {order.deliveryAddress.street}, {order.deliveryAddress.ward}, {order.deliveryAddress.district}, {order.deliveryAddress.city}
            </div>
          </div>
          <div className="mt-4">
            <span className="font-semibold">Order Items:</span>
            <ul className="ml-4 list-disc">
              {order.orderItems.map((item) => (
                <li key={item.id} className="mb-2">
                  <div>
                    <span className="font-semibold">{item.food.name}</span> - {item.food.description}
                  </div>
                  <div>
                    Quantity: {item.quantity} | Price: ${item.food.price} | Total: ${item.totalPrice}
                  </div>
                  <div>
                    <img
                      src={`http://localhost:8080/images/foods/${item.food.images[0]}`}
                      alt={item.food.name}
                      className="w-20 h-20 object-cover rounded mt-1"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};