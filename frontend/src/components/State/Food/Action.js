import axios from "axios";
import {
  CREATE_FOOD_REQUEST,
  CREATE_FOOD_SUCCESS,
  CREATE_FOOD_FAILURE,
  UPDATE_FOOD_REQUEST,
  UPDATE_FOOD_SUCCESS,
  UPDATE_FOOD_FAILURE,
  DELETE_FOOD_REQUEST,
  DELETE_FOOD_SUCCESS,
  DELETE_FOOD_FAILURE,
  GET_FOOD_BY_RESTAURANT_REQUEST,
  GET_FOOD_BY_RESTAURANT_SUCCESS,
  GET_FOOD_BY_RESTAURANT_FAILURE,
  UPDATE_AVAILABILITY_REQUEST,
  UPDATE_AVAILABILITY_SUCCESS,
  UPDATE_AVAILABILITY_FAILURE,
  GET_ALL_FOODS_REQUEST,
  GET_ALL_FOODS_SUCCESS,
  GET_ALL_FOODS_FAILURE,
  GET_FOOD_BY_ID_REQUEST,
  GET_FOOD_BY_ID_SUCCESS,
  GET_FOOD_BY_ID_FAILURE,
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

// Create Food
export const createFood = (foodData) => async (dispatch) => {
  dispatch({ type: CREATE_FOOD_REQUEST });
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/admin/restaurants/foods`,
      foodData,
      getAuthHeaders()
    );
    dispatch({ type: CREATE_FOOD_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: CREATE_FOOD_FAILURE,
      payload: error.response?.data?.message || "Failed to create food",
    });
  }
};

// Update Food
export const updateFood = (foodId, foodData) => async (dispatch) => {
  dispatch({ type: UPDATE_FOOD_REQUEST });
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/admin/restaurants/foods/${foodId}`,
      foodData,
      getAuthHeaders()
    );
    dispatch({ type: UPDATE_FOOD_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: UPDATE_FOOD_FAILURE,
      payload: error.response?.data?.message || "Failed to update food",
    });
  }
};

// Delete Food
export const deleteFood = (foodId) => async (dispatch) => {
  dispatch({ type: DELETE_FOOD_REQUEST });
  try {
    await axios.delete(`${BASE_URL}/api/v1/admin/restaurants/foods/${foodId}`, getAuthHeaders());
    dispatch({ type: DELETE_FOOD_SUCCESS, payload: foodId });
  } catch (error) {
    dispatch({
      type: DELETE_FOOD_FAILURE,
      payload: error.response?.data?.message || "Failed to delete food",
    });
  }
};

// Get Food by Restaurant
export const getFoodByRestaurantId = (restaurantId) => async (dispatch) => {
  dispatch({ type: GET_FOOD_BY_RESTAURANT_REQUEST });
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/admin/restaurants/${restaurantId}/foods`,
      getAuthHeaders()
    );
    dispatch({ type: GET_FOOD_BY_RESTAURANT_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: GET_FOOD_BY_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch foods by restaurant",
    });
  }
};
// Get Food by Restaurant
export const getFoodByRestaurant = () => async (dispatch) => {
    dispatch({ type: GET_FOOD_BY_RESTAURANT_REQUEST });
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/admin/restaurants/foods`,
        getAuthHeaders()
      );
      dispatch({ type: GET_FOOD_BY_RESTAURANT_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({
        type: GET_FOOD_BY_RESTAURANT_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch foods by restaurant",
      });
    }
  };
// Update Availability
export const updateAvailability = (foodId, availability) => async (dispatch) => {
  dispatch({ type: UPDATE_AVAILABILITY_REQUEST });
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/admin/restaurants/foods/${foodId}/availability`,
      {  },
      getAuthHeaders()
    );
    dispatch({ type: UPDATE_AVAILABILITY_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: UPDATE_AVAILABILITY_FAILURE,
      payload: error.response?.data?.message || "Failed to update availability",
    });
  }
};

// Get All Foods
export const getAllFoods = () => async (dispatch) => {
  dispatch({ type: GET_ALL_FOODS_REQUEST });
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/foods`, getAuthHeaders());
    dispatch({ type: GET_ALL_FOODS_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_FOODS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch all foods",
    });
  }
};

// Get Food by ID
export const getFoodById = (foodId) => async (dispatch) => {
  dispatch({ type: GET_FOOD_BY_ID_REQUEST });
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/foods/${foodId}`,
      getAuthHeaders()
    );
    dispatch({ type: GET_FOOD_BY_ID_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: GET_FOOD_BY_ID_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch food by ID",
    });
  }
};