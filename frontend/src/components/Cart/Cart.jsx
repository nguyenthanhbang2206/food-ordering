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
  deleteCartItem,
} from "../State/Cart/Action";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllCartItems());
    fetchUserAddresses();
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
      setAddresses(response.data.data.deliveryAddresses || []);
    } catch (error) {
      console.error("Failed to fetch user addresses:", error);
    }
  };

  const handleIncrease = (id, quantity) => {
    dispatch(updateQuantityOfCartItem(id, quantity + 1));
  };

  const handleDecrease = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantityOfCartItem(id, quantity - 1));
    }
  };

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

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const grouped = groupCartItemsByRestaurant(cartItems);

    try {
      for (const restaurantId in grouped) {
        await dispatch(placeOrder(selectedAddress, Number(restaurantId)));
      }
      await dispatch(deleteCart());
      navigate("/");
    } catch (error) {
      alert("Failed to place order for some restaurants.");
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
      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }
      // Gom cartItems theo restaurantId
      const grouped = groupCartItemsByRestaurant(cartItems);
      try {
        for (const restaurantId in grouped) {
          await dispatch(placeOrder(newAddress, Number(restaurantId)));
        }
        await dispatch(deleteCart());
        navigate("/");
      } catch (error) {
        console.error("Failed to place order:", error);
        alert("Failed to place order. Please try again.");
      }
    },
  });

  const handleDelete = (id) => {
    dispatch(deleteCartItem(id));
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 p-6 bg-gradient-to-b from-[#E6E6FA] to-white min-h-screen">
        {/* Cart Items Section */}
        <main className="lg:w-2/3 w-full bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-[#5A20CB] flex items-center gap-2">
            <span role="img" aria-label="cart">
              🛒
            </span>{" "}
            Your Cart
          </h2>
          <div className="space-y-4">
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  onIncrease={() => handleIncrease(item.id, item.quantity)}
                  onDecrease={() => handleDecrease(item.id, item.quantity)}
                />
              ))
            ) : (
              <p className="text-gray-500 italic">Your cart is empty.</p>
            )}
          </div>
          <div className="mt-8 text-left border-t pt-4">
            <p className="text-xl font-bold">
              Total:{" "}
              <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </p>
          </div>
        </main>

        {/* Address and Place Order Section */}
        <aside className="lg:w-1/3 w-full bg-white shadow-xl rounded-2xl p-6 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-[#5A20CB] flex items-center gap-2">
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
                    ? "border-[#5A20CB] bg-[#E6E6FA]"
                    : "border-gray-200 bg-gray-50"
                } hover:border-[#5A20CB]`}
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
            className="mt-6 w-full !bg-[#5A20CB] !text-white py-2 rounded-lg hover:!bg-[#431a9e] font-semibold shadow"
          >
            + Add New Address
          </Button>
          <Button
            onClick={handlePlaceOrder}
            className="mt-4 w-full !bg-green-500 !text-white py-2 rounded-lg hover:!bg-green-600 font-semibold shadow"
          >
            Place Order
          </Button>
        </aside>
      </div>

      {/* Modal for Adding New Address */}
      <Modal open={isModalOpen} onClose={handleCloseAddressModal}>
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md mx-auto mt-20">
          <h2 className="text-2xl font-bold mb-6 text-[#5A20CB] text-center">
            Add New Address
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-5">
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
              className="w-full !bg-green-500 !text-white py-2 rounded-lg hover:!bg-green-600 font-semibold shadow"
            >
              Place order
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};
