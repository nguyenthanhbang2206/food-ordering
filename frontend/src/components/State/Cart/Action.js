import api from "../../../config/api";
import {
  GET_ALL_CART_ITEM_REQUEST,
  GET_ALL_CART_ITEM_SUCCESS,
  GET_ALL_CART_ITEM_FAILURE,
  ADD_CART_ITEM_TO_CART_REQUEST,
  ADD_CART_ITEM_TO_CART_SUCCESS,
  ADD_CART_ITEM_TO_CART_FAILURE,
  UPDATE_QUANTITY_OF_CART_ITEM_REQUEST,
  UPDATE_QUANTITY_OF_CART_ITEM_SUCCESS,
  UPDATE_QUANTITY_OF_CART_ITEM_FAILURE,
  DELETE_CART_ITEM_REQUEST,
  DELETE_CART_ITEM_SUCCESS,
  DELETE_CART_ITEM_FAILURE,
  DELETE_CART_REQUEST,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAILURE,
  GET_CART_BY_USER_LOGIN_REQUEST,
  GET_CART_BY_USER_LOGIN_SUCCESS,
  GET_CART_BY_USER_LOGIN_FAILURE,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILURE,
  GET_ORDER_BY_USER_LOGIN_REQUEST,
  GET_ORDER_BY_USER_LOGIN_SUCCESS,
  GET_ORDER_BY_USER_LOGIN_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
} from "./ActionType";

// Get all cart items
export const getAllCartItems = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CART_ITEM_REQUEST });
  try {
    const response = await api.get("/cart/cartItems");
    dispatch({ type: GET_ALL_CART_ITEM_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_CART_ITEM_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch cart items",
    });
  }
};

// Add item to cart
export const addCartItemToCart = (foodId, quantity) => async (dispatch) => {
  dispatch({ type: ADD_CART_ITEM_TO_CART_REQUEST });
  try {
    const response = await api.post("/cart/cartItems", {
      foodId,
      quantity,
    });
    dispatch({
      type: ADD_CART_ITEM_TO_CART_SUCCESS,
      payload: response.data.data,
    });
    dispatch(getCartByUserLogin());
  } catch (error) {
    dispatch({
      type: ADD_CART_ITEM_TO_CART_FAILURE,
      payload: error.response?.data?.message || "Failed to add item to cart",
    });
  }
};

// Update quantity of cart item
export const updateQuantityOfCartItem =
  (cartItemId, quantity) => async (dispatch) => {
    dispatch({ type: UPDATE_QUANTITY_OF_CART_ITEM_REQUEST });
    try {
      const response = await api.put(`/cart/cartItems/${cartItemId}`, {
        quantity,
      });
      dispatch({
        type: UPDATE_QUANTITY_OF_CART_ITEM_SUCCESS,
        payload: response.data.data,
      });
      dispatch(getCartByUserLogin());
    } catch (error) {
      dispatch({
        type: UPDATE_QUANTITY_OF_CART_ITEM_FAILURE,
        payload:
          error.response?.data?.message ||
          "Failed to update cart item quantity",
      });
    }
  };

// Get cart by user login
export const getCartByUserLogin = () => async (dispatch) => {
  dispatch({ type: GET_CART_BY_USER_LOGIN_REQUEST });
  try {
    const response = await api.get("/cart");
    dispatch({
      type: GET_CART_BY_USER_LOGIN_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_BY_USER_LOGIN_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch cart",
    });
  }
};

// Delete cart item
export const deleteCartItem = (itemId) => async (dispatch) => {
  dispatch({ type: DELETE_CART_ITEM_REQUEST });
  try {
    await api.delete(`/cart/cartItems/${itemId}`);
    dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload: itemId });
    dispatch(getCartByUserLogin());
  } catch (error) {
    dispatch({
      type: DELETE_CART_ITEM_FAILURE,
      payload: error.response?.data?.message || "Failed to delete cart item",
    });
  }
};

// Delete entire cart
export const deleteCart = () => async (dispatch) => {
  dispatch({ type: DELETE_CART_REQUEST });
  try {
    await api.delete("/cart");
    dispatch({ type: DELETE_CART_SUCCESS });
    dispatch(getCartByUserLogin());
  } catch (error) {
    dispatch({
      type: DELETE_CART_FAILURE,
      payload: error.response?.data?.message || "Failed to delete cart",
    });
  }
};

// Place order
export const placeOrder =
  (selectedAddress, restaurantId) => async (dispatch) => {
    dispatch({ type: PLACE_ORDER_REQUEST });
    try {
      const response = await api.post("/orders", {
        deliveryAddress: selectedAddress,
        restaurantId,
      });
      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: response.data.data,
      });
      console.log("Order Response:", response.data);
    } catch (error) {
      dispatch({
        type: PLACE_ORDER_FAILURE,
        payload: error.response?.data?.message || "Failed to place order",
      });
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

// Get orders by user
export const getOrderByUserLogin = () => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_USER_LOGIN_REQUEST });
  try {
    const response = await api.get("/orders");
    dispatch({
      type: GET_ORDER_BY_USER_LOGIN_SUCCESS,
      payload: response.data.data.items,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_BY_USER_LOGIN_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch orders",
    });
  }
};

// Get order by ID
export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const response = await api.get(`/orders/${orderId}`);
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch order detail",
    });
  }
};
