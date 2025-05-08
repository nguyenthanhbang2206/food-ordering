import React, { useState } from "react";
import { CartItem } from "./CartItem";
import { Button, Modal, TextField } from "@mui/material";
import { Address } from "./Address";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems } from "../State/Cart/Action"; // Import action để lấy danh sách sản phẩm trong giỏ hàng
import { updateQuantityOfCartItem } from "../State/Cart/Action"; // Import action để cập nhật số lượng sản phẩm trong giỏ hàng
export const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, loading, error } = useSelector((state) => state.cart); // Lấy dữ liệu từ Redux

  useEffect(() => {
    dispatch(getAllCartItems()); // Gọi API để lấy danh sách sản phẩm trong giỏ hàng
  }, [dispatch]);
  const [addresses, setAddresses] = useState([
    { id: 1, address: "123 Main St, City A" },
    { id: 2, address: "456 Elm St, City B" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOpenAddressModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsModalOpen(false);
  };

  // Formik và Yup để validate form
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
    onSubmit: (values) => {
      const newAddress = `${values.street}, ${values.ward}, ${values.district}, ${values.city}`;
      setAddresses((prev) => [
        ...prev,
        { id: prev.length + 1, address: newAddress },
      ]);
      handleCloseAddressModal();
    },
  });

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Cart Items Section */}
        <main className="lg:w-2/3 w-full bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))}
          </div>
          <div className="mt-6 text-left">
            <p className="text-lg font-bold">
              Total:{" "}
              <span className="text-green-600">${totalPrice.toFixed(2)}</span>
            </p>
          </div>
        </main>

        {/* Address and History Section */}
        <aside className="lg:w-1/3 w-full bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
          <div className="space-y-4">
            {addresses.map((address) => (
              <Address key={address.id} address={address.address} />
            ))}
          </div>
          <Button
            onClick={handleOpenAddressModal}
            className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-500"
          >
            Add New Address
          </Button>

          <h2 className="text-xl font-bold mt-6 mb-4">Order History</h2>
          <div className="space-y-2">
            <p className="text-gray-500">No previous orders found.</p>
          </div>
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
              Place Order
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};
