import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderByRestaurant,
  updateOrderStatus,
} from "../State/Restaurant/Action";
import { getOrderById } from "../State/Cart/Action";
const ORDER_STATUSES = ["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"];
export const Orders = () => {
  const dispatch = useDispatch();
  const { restaurantOrders, loading, error, pagination } = useSelector(
    (state) => state.restaurant
  );
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusMap, setStatusMap] = useState({}); // { [orderId]: status }

  useEffect(() => {
    dispatch(getOrderByRestaurant(page, size));
  }, [dispatch, page, size]);

  const handleViewOrder = (orderId) => {
    dispatch(getOrderById(orderId)).then((action) => {
      // Nếu dùng redux-thunk, action.payload sẽ là order chi tiết
      if (action && action.payload) {
        setSelectedOrder(action.payload);
      }
    });
  };
  const handleStatusChange = (orderId, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && (!pagination || newPage <= pagination.totalPages)) {
      setPage(newPage);
    }
  };

  // Gọi API cập nhật trạng thái ở bảng
  const handleUpdateStatus = (orderId) => {
    const newStatus = statusMap[orderId];
    if (!newStatus) return;
    dispatch(updateOrderStatus(orderId, newStatus));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
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
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {restaurantOrders &&
              restaurantOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b text-sm text-gray-700">
                    {order.id}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">
                    {order.customer?.fullName || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">
                    ${order.totalPrice?.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">
                    <select
                      className="border rounded px-2 py-1"
                      value={statusMap[order.id] || order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
                      disabled={
                        (statusMap[order.id] || order.status) === order.status
                      }
                      onClick={() => handleUpdateStatus(order.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b text-sm text-gray-700">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-2">
          <div>
            <button
              className="px-3 py-1 rounded bg-gray-200 mr-2"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded bg-gray-200"
              onClick={() => handlePageChange(page + 1)}
              disabled={pagination && page >= pagination.totalPages}
            >
              Next
            </button>
          </div>
          <div>
            Page {page} / {pagination ? pagination.totalPages : 1}
          </div>
        </div>
      </div>

      {/* Chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="p-2 sm:p-6 mt-8 p-6 bg-gray-50 rounded shadow">
          <h2 className="text-xl font-bold mb-4">
            Order Detail (ID: {selectedOrder.id})
          </h2>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {selectedOrder.status}
          </p>
          <p>
            <span className="font-semibold">Total Items:</span>{" "}
            {selectedOrder.totalItems}
          </p>
          <p>
            <span className="font-semibold">Total Price:</span> $
            {selectedOrder.totalPrice}
          </p>
          <div className="mt-2">
            <span className="font-semibold">Delivery Address:</span>
            <div className="ml-4">
              {selectedOrder.deliveryAddress
                ? `${selectedOrder.deliveryAddress.street}, ${selectedOrder.deliveryAddress.ward}, ${selectedOrder.deliveryAddress.district}, ${selectedOrder.deliveryAddress.city}`
                : "N/A"}
            </div>
          </div>
          <div className="mt-4">
            <span className="font-semibold">Order Items:</span>
            <ul className="ml-4 list-disc">
              {selectedOrder.orderItems &&
                selectedOrder.orderItems.map((item) => (
                  <li key={item.id} className="mb-2">
                    <div>
                      <span className="font-semibold">{item.food.name}</span> -{" "}
                      {item.food.description}
                    </div>
                    <div>
                      Quantity: {item.quantity} | Price: ${item.food.price} |
                      Total: ${item.totalPrice}
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
          <button
            className="mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => setSelectedOrder(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
