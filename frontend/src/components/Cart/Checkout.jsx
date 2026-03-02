import React, { useState, useEffect } from "react";
import { CartItem } from "./CartItem";
import { Button, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { placeOrder, deleteCartItem } from "../State/Cart/Action";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
export const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCartItems = location.state?.selectedCartItems || [];
  const handleOpenAddressModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsModalOpen(false);
  };
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  const fetchUserAddresses = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAddresses(response.data.data.deliveryAddresses || []);
    } catch (error) {
      console.error("Failed to fetch user addresses:", error);
    }
  };

  const groupCartItemsByRestaurant = (cartItems) => {
    const groups = {};
    cartItems.forEach((item) => {
      const restaurantId = item.food.restaurant.id;
      if (!groups[restaurantId]) {
        groups[restaurantId] = [];
      }
      groups[restaurantId].push(item);
    });
    return groups;
  };

  // Đặt hàng với địa chỉ đã chọn
  const handlePlaceOrder = async (address) => {
    if (!address) {
      alert("Please select a delivery address.");
      return;
    }
    if (!selectedCartItems.length) {
      alert("No items to checkout.");
      return;
    }
    const grouped = groupCartItemsByRestaurant(selectedCartItems);
    try {
      for (const restaurantId in grouped) {
        await dispatch(
          placeOrder(address, Number(restaurantId), grouped[restaurantId]),
        );
      }
      for (const item of selectedCartItems) {
        await dispatch(deleteCartItem(item.id));
      }
      navigate("/thank-you");
    } catch (error) {
      alert("Failed to place order.");
    }
  };

  // Thanh toán VNPAY
  const [vnpayLoading, setVnpayLoading] = useState(false);
  const handleVNPayPayment = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    if (!selectedCartItems.length) {
      alert("No items to checkout.");
      return;
    }

    setVnpayLoading(true);

    try {
      const grouped = groupCartItemsByRestaurant(selectedCartItems);

      const orderIds = [];

      for (const restaurantId in grouped) {
        const response = await axios.post(
          `${API_URL}/api/v1/orders`,
          {
            deliveryAddress: selectedAddress,
            restaurantId: Number(restaurantId),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const createdOrderId = response.data.data?.id;
        if (createdOrderId) {
          orderIds.push(createdOrderId);
        }
      }

      if (orderIds.length === 0) {
        alert("Không tạo được order.");
        setVnpayLoading(false);
        return;
      }

      const res = await axios.post(
        `${API_URL}/api/v1/payments/vnpay`,
        orderIds,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const paymentUrl = res.data.paymentUrl;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert("Không lấy được link thanh toán VNPAY.");
      }
    } catch (error) {
      console.error(error);
      alert("Thanh toán VNPAY thất bại.");
    } finally {
      setVnpayLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      city: "",
      district: "",
      ward: "",
      street: "",
    },
    validationSchema: Yup.object({
      city: Yup.string().required("City is required"),
      district: Yup.string().required("District is required"),
      ward: Yup.string().required("Ward is required"),
      street: Yup.string().required("Street is required"),
    }),
    onSubmit: async (values) => {
      const newAddress = {
        street: values.street,
        ward: values.ward,
        district: values.district,
        city: values.city,
      };
      if (!Array.isArray(selectedCartItems) || selectedCartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }
      // Gom cartItems theo restaurantId
      const grouped = groupCartItemsByRestaurant(selectedCartItems);
      try {
        for (const restaurantId in grouped) {
          await dispatch(placeOrder(newAddress, Number(restaurantId)));
        }
        for (const item of selectedCartItems) {
          await dispatch(deleteCartItem(item.id));
        }
        navigate("/thank-you");
      } catch (error) {
        console.error("Failed to place order:", error);
        alert("Failed to place order. Please try again.");
      }
    },
  });
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 p-6 bg-gradient-to-b from-[#E6E6FA] to-white min-h-screen">
        {/* Cart Items Section */}
        <main className="lg:w-2/3 w-full bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-[#2563EB] flex items-center gap-2">
            <span role="img" aria-label="cart">
              🛒
            </span>{" "}
            Your Cart
          </h2>
          <div className="space-y-4">
            {selectedCartItems.length > 0 ? (
              selectedCartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))
            ) : (
              <p className="text-gray-500 italic">No items selected.</p>
            )}
          </div>
          <div className="mt-8 text-left border-t pt-4">
            <p className="text-xl font-bold">
              Total:{" "}
              <span className="text-green-600">
                {selectedCartItems
                  .reduce(
                    (total, item) => total + item.food.price * item.quantity,
                    0,
                  )
                  .toFixed(2)}{" "}
                đ
              </span>
            </p>
          </div>
        </main>

        {/* Address and Place Order Section */}
        <aside className="lg:w-1/3 w-full bg-white shadow-xl rounded-2xl p-6 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-[#2563EB] flex items-center gap-2">
            <span role="img" aria-label="address">
              🏠
            </span>{" "}
            Delivery Address
          </h2>
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedAddress?.id === address.id
                    ? "border-[#2563EB] bg-[#E6E6FA]"
                    : "border-gray-200 bg-gray-50"
                } hover:border-[#2563EB]`}
                onClick={() => setSelectedAddress(address)}
              >
                <p className="font-medium text-gray-700">
                  {`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}
                </p>
              </div>
            ))}
          </div>
          <Button
            onClick={handleOpenAddressModal}
            className="mt-6 w-full !bg-[#2563EB] !text-white py-2 rounded-lg hover:!bg-[#431a9e] font-semibold shadow"
          >
            + Add New Address
          </Button>
          <Button
            style={{ display: "none" }} // Ẩn nút Place Order cũ
          />
          <Button
            onClick={handleVNPayPayment}
            className="mt-2 w-full !bg-blue-500 !text-white py-2 rounded-lg hover:!bg-blue-600 font-semibold shadow"
            disabled={
              !selectedAddress || selectedCartItems.length === 0 || vnpayLoading
            }
          >
            {vnpayLoading ? "Đang chuyển hướng VNPAY..." : "Thanh toán"}
          </Button>
        </aside>
      </div>

      {/* Modal for Adding New Address */}
      <Modal open={isModalOpen} onClose={handleCloseAddressModal}>
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md mx-auto mt-20">
          <h2 className="text-2xl font-bold mb-6 text-[#2563EB] text-center">
            Add New Address
          </h2>
          <form

            onSubmit={async (e) => {
              e.preventDefault();
              if (vnpayLoading) return;

              const newAddress = {
                city: formik.values.city,
                district: formik.values.district,
                ward: formik.values.ward,
                street: formik.values.street,
              };

              if (!selectedCartItems.length) {
                alert("Your cart is empty.");
                return;
              }

              try {
                setVnpayLoading(true);

                const grouped = groupCartItemsByRestaurant(selectedCartItems);
                const orderIds = [];

                // 🔥 Tạo nhiều order giống hệt handleVNPayPayment
                for (const restaurantId in grouped) {
                  const response = await axios.post(
                    `${API_URL}/api/v1/orders`,
                    {
                      deliveryAddress: newAddress,
                      restaurantId: Number(restaurantId),
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    },
                  );

                  const createdOrderId = response.data.data?.id;
                  if (createdOrderId) {
                    orderIds.push(createdOrderId);
                  }
                }

                if (orderIds.length === 0) {
                  alert("Không tạo được order.");
                  setVnpayLoading(false);
                  return;
                }

                // 🔥 Gọi API mới (gửi LIST orderIds)
                const res = await axios.post(
                  `${API_URL}/api/v1/payments/vnpay`,
                  orderIds,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  },
                );

                const paymentUrl = res.data.paymentUrl;

                if (paymentUrl) {
                  window.location.href = paymentUrl;
                } else {
                  alert("Không lấy được link thanh toán VNPAY.");
                }
              } catch (error) {
                alert("Thanh toán VNPAY thất bại.");
              } finally {
                setVnpayLoading(false);
              }
            }}
          >
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              fullWidth
              label="District"
              name="district"
              value={formik.values.district}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.district && Boolean(formik.errors.district)}
              helperText={formik.touched.district && formik.errors.district}
            />
            <TextField
              fullWidth
              label="Ward"
              name="ward"
              value={formik.values.ward}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.ward && Boolean(formik.errors.ward)}
              helperText={formik.touched.ward && formik.errors.ward}
            />
            <TextField
              fullWidth
              label="Street"
              name="street"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
            <Button
              type="submit"
              className="w-full !bg-blue-500 !text-white py-2 rounded-lg hover:!bg-blue-600 font-semibold shadow"
              disabled={vnpayLoading}
            >
              {vnpayLoading ? "Đang chuyển hướng VNPAY..." : "Thanh toán"}
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};
