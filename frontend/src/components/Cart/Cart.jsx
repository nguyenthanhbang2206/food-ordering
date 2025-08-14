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

  // NEW: State for selected cart items
  const [selectedItems, setSelectedItems] = useState([]);

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

  // NEW: Total price for selected items only
  const totalPrice = Array.isArray(cartItems)
    ? cartItems
        .filter((item) => selectedItems.includes(item.id))
        .reduce((total, item) => total + item.food.price * item.quantity, 0)
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

  // NEW: Checkout only selected items
  const handleCheckout = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }
    if (!Array.isArray(cartItems) || selectedItems.length === 0) {
      alert("Please select items to checkout.");
      return;
    }
    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    const grouped = groupCartItemsByRestaurant(selectedCartItems);

    try {
      for (const restaurantId in grouped) {
        await dispatch(
          placeOrder(
            selectedAddress,
            Number(restaurantId),
            grouped[restaurantId]
          )
        );
      }
      // Xóa các cartItem đã checkout
      for (const id of selectedItems) {
        await dispatch(deleteCartItem(id));
      }
      setSelectedItems([]);
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
      if (!Array.isArray(cartItems) || selectedItems.length === 0) {
        alert("Please select items to checkout.");
        return;
      }
      const selectedCartItems = cartItems.filter((item) =>
        selectedItems.includes(item.id)
      );
      const grouped = groupCartItemsByRestaurant(selectedCartItems);
      try {
        for (const restaurantId in grouped) {
          await dispatch(
            placeOrder(newAddress, Number(restaurantId), grouped[restaurantId])
          );
        }
        for (const id of selectedItems) {
          await dispatch(deleteCartItem(id));
        }
        setSelectedItems([]);
        navigate("/");
      } catch (error) {
        console.error("Failed to place order:", error);
        alert("Failed to place order. Please try again.");
      }
    },
  });

  const handleDelete = (id) => {
    dispatch(deleteCartItem(id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  // NEW: Handle select/deselect cart item
  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // NEW: Select all items
  const handleSelectAll = () => {
    if (Array.isArray(cartItems) && selectedItems.length !== cartItems.length) {
      setSelectedItems(cartItems.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };
  const handleGoToCheckout = () => {
    if (!selectedItems.length) {
      alert("Please select items to checkout.");
      return;
    }
    const selectedCartItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    navigate("/checkout", { state: { selectedCartItems } });
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
          <div className="mb-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                Array.isArray(cartItems) &&
                cartItems.length > 0 &&
                selectedItems.length === cartItems.length
              }
              onChange={handleSelectAll}
            />
            <span className="text-sm">Select All</span>
          </div>
          <div className="space-y-4">
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                  <CartItem
                    item={item}
                    onDelete={handleDelete}
                    onIncrease={() => handleIncrease(item.id, item.quantity)}
                    onDecrease={() => handleDecrease(item.id, item.quantity)}
                  />
                </div>
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

        {/* Place Order Section */}
        <aside className="lg:w-1/3 w-full bg-white shadow-xl rounded-2xl p-6 flex flex-col">
          {/* ...existing code... */}
          <Button
            onClick={handleGoToCheckout}
            className="mt-4 w-full !bg-green-500 !text-white py-2 rounded-lg hover:!bg-green-600 font-semibold shadow"
            disabled={selectedItems.length === 0}
          >
            Checkout Selected
          </Button>
        </aside>
      </div>
    </>
  );
};
