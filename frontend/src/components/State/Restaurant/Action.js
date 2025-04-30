import axios from "axios";
import {
  GET_MY_RESTAURANT_FAILURE,
  GET_MY_RESTAURANT_REQUEST,
  GET_MY_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  GET_CATEGORY_OF_RESTAURANT_REQUEST,
  GET_CATEGORY_OF_RESTAURANT_SUCCESS,
  GET_CATEGORY_OF_RESTAURANT_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
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
export const getAllRestaurant = () => async (dispatch) => {
  dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/admin/restaurants`,
      getAuthHeaders()
    );
    dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || {
        message: error.message || "Failed to fetch restaurant",
      },
    });
  }
};

export const getMyRestaurant = () => async (dispatch) => {
  dispatch({ type: GET_MY_RESTAURANT_REQUEST });
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/admin/my-restaurant`,
      getAuthHeaders()
    );
    dispatch({ type: GET_MY_RESTAURANT_SUCCESS, payload: response.data.data });
  } catch (error) {
    console.log(error.response?.data);
    dispatch({
      type: GET_MY_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || {
        message: error.message || "Failed to fetch restaurant",
      },
    });
  }
};

export const createRestaurant = (restaurantData) => async (dispatch) => {
  dispatch({ type: CREATE_RESTAURANT_REQUEST });
  try {
    console.log(restaurantData);
    const response = await axios.post(
      `${BASE_URL}/api/v1/admin/restaurants`,
      restaurantData,
      getAuthHeaders()
    );
    dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: CREATE_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || {
        message: error.message || "Failed to create restaurant",
      },
    });
  }
};
export const updateRestaurant = (restaurantData) => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_REQUEST });
  try {
    console.log(restaurantData);
    const response = await axios.put(
      `${BASE_URL}/api/v1/admin/restaurants`,
      restaurantData,
      getAuthHeaders()
    );
    dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: UPDATE_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || {
        message: error.message || "Failed to create restaurant",
      },
    });
  }
};
export const deleteRestaurant = ({restaurantId}) => async (dispatch) => {
  dispatch({ type: DELETE_RESTAURANT_REQUEST });
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/admin/restaurants/${restaurantId}`,
      {},
      getAuthHeaders()
    );
    dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: DELETE_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || {
        message: error.message || "Failed to create restaurant",
      },
    });
  }
};
export const updateStatusOfRestaurant = () => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/admin/restaurants/status`,
      {},
      getAuthHeaders()
    );
    dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: UPDATE_RESTAURANT_STATUS_FAILURE,
      payload: error.response?.data?.message || {
        message: error.message || "Failed to create restaurant",
      },
    });
  }
};
export const getCategoriesByRestaurant = () => async (dispatch) => {
  dispatch({ type: GET_CATEGORY_OF_RESTAURANT_REQUEST });
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/admin/restaurants/categories`,
      {},
      getAuthHeaders()
    );
    dispatch({ type: GET_CATEGORY_OF_RESTAURANT_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_OF_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || {
        message: error.message || "Failed to create restaurant",
      },
    });
  }
};
export const createCategoryOfRestaurant = (categoryData) => async (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_REQUEST });
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/admin/restaurants/categories`,
      categoryData,
      getAuthHeaders()
    );
    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAILURE,
      payload: error.response?.data?.message || {
        message: error.message || "Failed to create restaurant",
      },
    });
  }
};