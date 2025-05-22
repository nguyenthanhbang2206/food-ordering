import React, { useState, useEffect } from "react";
import { CartItem } from "./CartItem";
import { Button, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  getAllCartItems,
  placeOrder,
  updateQuantityOfCartItem,
} from "../State/Cart/Action";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, loading, error } = useSelector((state) => state.cart); // Lấy dữ liệu từ Redux
  const { user } = useSelector((state) => state.auth); // Lấy thông tin người dùng từ Redux

  const [addresses, setAddresses] = useState([]); // Danh sách địa chỉ giao hàng
  const [selectedAddress, setSelectedAddress] = useState(null); // Địa chỉ được chọn
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllCartItems()); // Gọi API để lấy danh sách sản phẩm trong giỏ hàng
    fetchUserAddresses(); // Lấy danh sách địa chỉ giao hàng từ người dùng
  }, [dispatch]);

  const fetchUserAddresses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/users/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAddresses(response.data.data.deliveryAddresses || []); // Lấy danh sách địa chỉ từ thuộc tính deliveryAddresses
    } catch (error) {
      console.error("Failed to fetch user addresses:", error);
    }
  };

  // Tăng số lượng sản phẩm
  const handleIncrease = (id, quantity) => {
    dispatch(updateQuantityOfCartItem(id, quantity + 1)); // Gọi API để tăng số lượng
  };

  // Giảm số lượng sản phẩm
  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantityOfCartItem(id, quantity - 1)); // Gọi API để giảm số lượng
    }
  };

  // Tính tổng tiền
  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + item.food.price * item.quantity,
        0
      )
    : 0;

  const handleOpenAddressModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsModalOpen(false);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    const restaurantId = cartItems[0]?.food?.restaurant.id; // Lấy restaurantId từ sản phẩm đầu tiên
    if (!restaurantId) {
      alert("Restaurant ID is missing.");
      return;
    }

    console.log(selectedAddress + " " + restaurantId);

    await dispatch(placeOrder(selectedAddress, restaurantId)); // Gọi action placeOrder
    await dispatch(deleteCart());

    navigate("/");
  };

  // Formik và Yup để validate form thêm địa chỉ mới
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
      const restaurantId = cartItems[0]?.food?.restaurant.id; // Lấy restaurantId từ sản phẩm đầu tiên
      if (!restaurantId) {
        alert("Restaurant ID is missing.");
        return;
      }
      console.log(newAddress + " " + restaurantId);

      try {
        await dispatch(placeOrder(newAddress, restaurantId)); // Gọi action placeOrder
        // Gọi API deleteCart sau khi đặt hàng thành công
        await dispatch(deleteCart());
        navigate("/"); // Chuyển hướng về trang chủ
      } catch (error) {
        console.error("Failed to place order:", error);
        alert("Failed to place order. Please try again.");
      }
    },
  });

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Cart Items Section */}
        <main className="lg:w-2/3 w-full bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          <div className="space-y-4">
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => handleIncrease(item.id, item.quantity)}
                  onDecrease={() => handleDecrease(item.id, item.quantity)}
                />
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="mt-6 text-left">
            <p className="text-lg font-bold">
              Total:{" "}
              <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </p>
          </div>
        </main>

        {/* Address and Place Order Section */}
        <aside className="lg:w-1/3 w-full bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`p-2 border rounded-lg cursor-pointer ${
                  selectedAddress?.id === address.id ? "border-green-500" : ""
                }`}
                onClick={() => setSelectedAddress(address)}
              >
                <p>{`${address.street}, ${address.ward}, ${address.district}, ${address.city}`}</p>
              </div>
            ))}
          </div>
          <Button
            onClick={handleOpenAddressModal}
            className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-500"
          >
            Add New Address
          </Button>
          <Button
            onClick={handlePlaceOrder}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Place Order
          </Button>
        </aside>
      </div>

      {/* Modal for Adding New Address */}
      <Modal open={isModalOpen} onClose={handleCloseAddressModal}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md mx-auto mt-20">
          <h2 className="text-xl font-bold mb-4">Add New Address</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
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
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Place order
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};
