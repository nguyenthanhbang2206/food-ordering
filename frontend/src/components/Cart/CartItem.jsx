import DeleteIcon from "@mui/icons-material/Delete";

export const CartItem = ({ item, onIncrease, onDecrease, onDelete }) => {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.food.images[0]}
          alt={item.food.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <p className="font-semibold">{item.food.name}</p>
          <p className="text-gray-500">Price: ${item.food.price}</p>
          <div className="flex items-center space-x-2 mt-2">
            {onDecrease && (
              <button
                onClick={() => onDecrease(item.id, item.quantity)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
            )}
            <span>{item.quantity}</span>
            {onIncrease && (
              <button
                onClick={() => onIncrease(item.id, item.quantity)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            )}
            {/* Nút xóa */}
            {onDelete && (
              <button
                onClick={() => onDelete(item.id)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                title="Delete"
              >
                <DeleteIcon fontSize="small" />
              </button>
            )}
          </div>
        </div>
      </div>
      <p className="font-bold text-green-600">
        ${(item.food.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
};
