import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { addCartItemToCart } from "../State/Cart/Action";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
export const MenuCard = ({ food }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Ngăn click card
    if (quantity > 0) {
      try {
        await dispatch(addCartItemToCart(food.id, quantity));
        setSnackbar({
          open: true,
          message: "Thành công!",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Lỗi!",
          severity: "error",
        });
      }
    }
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/food/${food.id}`)}
    >
      <img
        src={food.images[0]}
        alt={food.name}
        className="w-32 h-32 object-cover rounded mb-2"
      />
      <div className="font-bold text-lg mb-1">{food.name}</div>
      <div className="text-gray-600 text-sm mb-1 text-center line-clamp-2">
        {food.description}
      </div>
      <div className="text-[#2563EB] font-semibold mb-2">{food.price} đ</div>
      <div className="text-sm text-gray-500 mb-2">
        Đã bán: <span className="font-bold">{food.sold}</span>
      </div>
      {/* Không hiển thị ingredient, chỉ còn nút thêm vào giỏ hàng */}
      <div className="flex items-center mt-2 space-x-2">
        <IconButton onClick={handleDecrease} color="primary" size="small">
          <RemoveIcon />
        </IconButton>
        <Typography>{quantity}</Typography>
        <IconButton onClick={handleIncrease} color="primary" size="small">
          <AddIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          size="small"
        >
          Add to Cart
        </Button>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
