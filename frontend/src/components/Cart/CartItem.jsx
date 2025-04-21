import React from "react";

export const CartItem = ({ item, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="text-gray-500">Price: ${item.price}</p>
          <div className="flex items-center space-x-2 mt-2">
            <button
              onClick={() => onDecrease(item.id)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onIncrease(item.id)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <p className="font-bold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
};
