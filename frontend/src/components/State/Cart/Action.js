import axios from "axios";
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
} from "./ActionType";

const BASE_URL = "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all cart items
export const getAllCartItems = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CART_ITEM_REQUEST });
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/cart`,
      getAuthHeaders()
    );
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
    const response = await axios.post(
      `${BASE_URL}/api/v1/cart/cartItems`,
      { foodId, quantity },
      getAuthHeaders()
    );
    dispatch({
      type: ADD_CART_ITEM_TO_CART_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CART_ITEM_TO_CART_FAILURE,
      payload: error.response?.data?.message || "Failed to add item to cart",
    });
  }
};

// Update quantity of cart item
export const updateQuantityOfCartItem =
  (itemId, quantity) => async (dispatch) => {
    dispatch({ type: UPDATE_QUANTITY_OF_CART_ITEM_REQUEST });
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/cart/${itemId}`,
        { quantity },
        getAuthHeaders()
      );
      dispatch({
        type: UPDATE_QUANTITY_OF_CART_ITEM_SUCCESS,
        payload: response.data.data,
      });
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
    const response = await axios.get(
      `${BASE_URL}/api/v1/cart`,
      getAuthHeaders()
    );
    dispatch({
      type: GET_CART_BY_USER_LOGIN_SUCCESS,
      payload: response.data.data, // Payload chứa thông tin cart
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
    await axios.delete(`${BASE_URL}/api/v1/cart/${itemId}`, getAuthHeaders());
    dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload: itemId });
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
    await axios.delete(`${BASE_URL}/api/v1/cart`, getAuthHeaders());
    dispatch({ type: DELETE_CART_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_CART_FAILURE,
      payload: error.response?.data?.message || "Failed to delete cart",
    });
  }
};
