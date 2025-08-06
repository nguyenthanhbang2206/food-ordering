import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { addCartItemToCart } from "../State/Cart/Action";
export const MenuCard = ({ food }) => {
  const [quantity, setQuantity] = useState(1); // State để quản lý số lượng
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true); // Mặc định mở

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(addCartItemToCart(food.id, quantity)); // Gọi action addCartItemToCart
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div>
      <Accordion expanded={expanded} onChange={handleToggle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex items-center justify-between w-full bg-white">
            <div className="flex items-center space-x-4">
              <img
                src={food.images[0]}
                alt={food.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex flex-col">
                <Typography variant="subtitle1" className="font-semibold">
                  {food.name}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {food.description}
                </Typography>
              </div>
            </div>
            <Typography
              variant="subtitle1"
              className="font-bold text-green-600"
            >
              ${food.price.toFixed(2)}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            <strong>Ingredients:</strong>{" "}
            {food.ingredients.map((ingredient) => ingredient.name).join(", ")}
          </Typography>
          <div className="flex items-center mt-4 space-x-4">
            {/* Nút giảm số lượng */}
            <IconButton onClick={handleDecrease} color="primary">
              <RemoveIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            {/* Nút tăng số lượng */}
            <IconButton onClick={handleIncrease} color="primary">
              <AddIcon />
            </IconButton>
            {/* Nút thêm vào giỏ hàng */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
