// import axios from "axios";
// import {
//   GET_MY_RESTAURANT_FAILURE,
//   GET_MY_RESTAURANT_REQUEST,
//   GET_MY_RESTAURANT_SUCCESS,
//   CREATE_RESTAURANT_REQUEST,
//   CREATE_RESTAURANT_SUCCESS,
//   CREATE_RESTAURANT_FAILURE,
//   GET_ALL_RESTAURANT_REQUEST,
//   GET_ALL_RESTAURANT_SUCCESS,
//   GET_ALL_RESTAURANT_FAILURE,
//   UPDATE_RESTAURANT_REQUEST,
//   UPDATE_RESTAURANT_SUCCESS,
//   UPDATE_RESTAURANT_FAILURE,
//   DELETE_RESTAURANT_REQUEST,
//   DELETE_RESTAURANT_SUCCESS,
//   DELETE_RESTAURANT_FAILURE,
//   UPDATE_RESTAURANT_STATUS_REQUEST,
//   UPDATE_RESTAURANT_STATUS_SUCCESS,
//   UPDATE_RESTAURANT_STATUS_FAILURE,
//   GET_CATEGORY_OF_RESTAURANT_REQUEST,
//   GET_CATEGORY_OF_RESTAURANT_SUCCESS,
//   GET_CATEGORY_OF_RESTAURANT_FAILURE,
//   CREATE_CATEGORY_REQUEST,
//   CREATE_CATEGORY_SUCCESS,
//   CREATE_CATEGORY_FAILURE,
//   SEARCH_RESTAURANTS_FAILURE,
//   SEARCH_RESTAURANTS_SUCCESS,
//   SEARCH_RESTAURANTS_REQUEST,
//   GET_FAVOURITE_RESTAURANTS_FAILURE,
//   GET_FAVOURITE_RESTAURANTS_SUCCESS,
//   GET_FAVOURITE_RESTAURANTS_REQUEST,
//   ADD_FAVOURITE_RESTAURANT_SUCCESS,
//   ADD_FAVOURITE_RESTAURANT_FAILURE,
//   ADD_FAVOURITE_RESTAURANT_REQUEST,
//   DELETE_INGREDIENT_SUCCESS,
//   DELETE_INGREDIENT_FAILURE,
//   DELETE_INGREDIENT_REQUEST,
//   GET_INGREDIENTS_BY_RESTAURANT_FAILURE,
//   GET_INGREDIENTS_BY_RESTAURANT_SUCCESS,
//   GET_INGREDIENTS_BY_RESTAURANT_REQUEST,
//   UPDATE_INGREDIENT_FAILURE,
//   UPDATE_INGREDIENT_SUCCESS,
//   UPDATE_INGREDIENT_REQUEST,
//   CREATE_INGREDIENT_FAILURE,
//   CREATE_INGREDIENT_SUCCESS,
//   CREATE_INGREDIENT_REQUEST,
//   GET_FOOD_BY_ID_FAILURE,
//   GET_FOOD_BY_ID_SUCCESS,
//   GET_FOOD_BY_ID_REQUEST,
//   GET_ALL_FOODS_FAILURE,
//   GET_ALL_FOODS_SUCCESS,
//   GET_ALL_FOODS_REQUEST,
//   UPDATE_AVAILABILITY_FAILURE,
//   UPDATE_AVAILABILITY_SUCCESS,
//   UPDATE_AVAILABILITY_REQUEST,
//   GET_FOOD_BY_RESTAURANT_FAILURE,
//   GET_FOOD_BY_RESTAURANT_SUCCESS,
//   GET_FOOD_BY_RESTAURANT_REQUEST,
//   DELETE_FOOD_FAILURE,
//   DELETE_FOOD_REQUEST,
//   DELETE_FOOD_SUCCESS,
//   UPDATE_FOOD_FAILURE,
//   UPDATE_FOOD_SUCCESS,
//   UPDATE_ORDER_STATUS_FAILURE,
//   UPDATE_ORDER_STATUS_SUCCESS,
//   UPDATE_ORDER_STATUS_REQUEST,
//   GET_ORDER_BY_RESTAURANT_FAILURE,
//   GET_ORDER_BY_RESTAURANT_SUCCESS,
//   GET_ORDER_BY_RESTAURANT_REQUEST,
//   UPDATE_FOOD_REQUEST,
//   CREATE_FOOD_FAILURE,
//   CREATE_FOOD_SUCCESS,
//   CREATE_FOOD_REQUEST,
//   UPDATE_CATEGORY_REQUEST,
//   UPDATE_CATEGORY_SUCCESS,
//   UPDATE_CATEGORY_FAILURE,
//   DELETE_CATEGORY_REQUEST,
//   DELETE_CATEGORY_SUCCESS,
//   DELETE_CATEGORY_FAILURE,
//   GET_CATEGORY_OF_RESTAURANT_ID_REQUEST,
//   GET_CATEGORY_OF_RESTAURANT_ID_SUCCESS,
//   GET_CATEGORY_OF_RESTAURANT_ID_FAILURE,
//   GET_RESTAURANT_BY_ID_SUCCESS,
//   GET_RESTAURANT_BY_ID_FAILURE,
//   GET_RESTAURANT_BY_ID_REQUEST,
// } from "./ActionType";

// const BASE_URL = "http://localhost:8080";

// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     throw new Error("Token not found");
//   }
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };
// export const getRestaurantById = (restaurantId) => async (dispatch) => {
//   dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/restaurants/${restaurantId}`,
//       getAuthHeaders()
//     );
//     dispatch({
//       type: GET_RESTAURANT_BY_ID_SUCCESS,
//       payload: response.data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_RESTAURANT_BY_ID_FAILURE,
//       payload:
//         error.response?.data?.message || "Failed to fetch restaurant details",
//     });
//   }
// };
// export const getAllRestaurant = () => async (dispatch) => {
//   dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/restaurants`,
//       getAuthHeaders()
//     );
//     dispatch({
//       type: GET_ALL_RESTAURANT_SUCCESS,
//       payload: response.data.data.items,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_ALL_RESTAURANT_FAILURE,
//       payload: error.response?.data?.message || {
//         message: error.message || "Failed to fetch restaurant",
//       },
//     });
//   }
// };

// export const getMyRestaurant = () => async (dispatch) => {
//   dispatch({ type: GET_MY_RESTAURANT_REQUEST });
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/admin/my-restaurant`,
//       getAuthHeaders()
//     );
//     dispatch({ type: GET_MY_RESTAURANT_SUCCESS, payload: response.data.data });
//   } catch (error) {
//     console.log(error.response?.data);
//     dispatch({
//       type: GET_MY_RESTAURANT_FAILURE,
//       payload: error.response?.data?.message || {
//         message: error.message || "Failed to fetch restaurant",
//       },
//     });
//   }
// };

// export const createRestaurant = (restaurantData) => async (dispatch) => {
//   dispatch({ type: CREATE_RESTAURANT_REQUEST });
//   try {
//     console.log(restaurantData);
//     const response = await axios.post(
//       `${BASE_URL}/api/v1/admin/restaurants`,
//       restaurantData,
//       getAuthHeaders()
//     );
//     dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: response.data.data });
//   } catch (error) {
//     dispatch({
//       type: CREATE_RESTAURANT_FAILURE,
//       payload: error.response?.data?.message || {
//         message: error.message || "Failed to create restaurant",
//       },
//     });
//   }
// };
// export const updateRestaurant = (restaurantData) => async (dispatch) => {
//   dispatch({ type: UPDATE_RESTAURANT_REQUEST });
//   try {
//     console.log(restaurantData);
//     const response = await axios.put(
//       `${BASE_URL}/api/v1/admin/restaurants`,
//       restaurantData,
//       getAuthHeaders()
//     );
//     dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: response.data.data });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_RESTAURANT_FAILURE,
//       payload: error.response?.data?.message || {
//         message: error.message || "Failed to create restaurant",
//       },
//     });
//   }
// };
// export const deleteRestaurant =
//   ({ restaurantId }) =>
//   async (dispatch) => {
//     dispatch({ type: DELETE_RESTAURANT_REQUEST });
//     try {
//       const response = await axios.delete(
//         `${BASE_URL}/api/v1/admin/restaurants/${restaurantId}`,
//         getAuthHeaders()
//       );
//       dispatch({
//         type: DELETE_RESTAURANT_SUCCESS,
//         payload: response.data.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: DELETE_RESTAURANT_FAILURE,
//         payload: error.response?.data?.message || {
//           message: error.message || "Failed to create restaurant",
//         },
//       });
//     }
//   };
// export const getCategoriesByRestaurantId =
//   (restaurantId) => async (dispatch) => {
//     dispatch({ type: GET_CATEGORY_OF_RESTAURANT_ID_REQUEST });
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/v1/restaurants/${restaurantId}/categories`,
//         getAuthHeaders()
//       );
//       dispatch({
//         type: GET_CATEGORY_OF_RESTAURANT_ID_SUCCESS,
//         payload: response.data.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: GET_CATEGORY_OF_RESTAURANT_ID_FAILURE,
//         payload: error.response?.data?.message || "Failed to fetch categories",
//       });
//     }
//   };
// export const updateStatusOfRestaurant = () => async (dispatch) => {
//   dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
//   try {
//     const response = await axios.put(
//       `${BASE_URL}/api/v1/admin/restaurants/status`,
//       {},
//       getAuthHeaders()
//     );
//     dispatch({
//       type: UPDATE_RESTAURANT_STATUS_SUCCESS,
//       payload: response.data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_RESTAURANT_STATUS_FAILURE,
//       payload: error.response?.data?.message || {
//         message: error.message || "Failed to create restaurant",
//       },
//     });
//   }
// };
// export const getCategoriesByRestaurant = () => async (dispatch) => {
//   dispatch({ type: GET_CATEGORY_OF_RESTAURANT_REQUEST });
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/admin/restaurants/categories`,
//       getAuthHeaders()
//     );
//     dispatch({
//       type: GET_CATEGORY_OF_RESTAURANT_SUCCESS,
//       payload: response.data.data,
//     });
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: GET_CATEGORY_OF_RESTAURANT_FAILURE,
//       payload: error.response?.data?.message || {
//         message: error.message || "Failed to create restaurant",
//       },
//     });
//   }
// };
// export const createCategoryOfRestaurant =
//   (categoryData) => async (dispatch) => {
//     dispatch({ type: CREATE_CATEGORY_REQUEST });
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/api/v1/admin/restaurants/categories`,
//         categoryData,
//         getAuthHeaders()
//       );
//       dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data.data });
//     } catch (error) {
//       dispatch({
//         type: CREATE_CATEGORY_FAILURE,
//         payload: error.response?.data?.message || {
//           message: error.message || "Failed to create restaurant",
//         },
//       });
//     }
//   };
// export const updateCategory =
//   (categoryId, categoryData) => async (dispatch) => {
//     dispatch({ type: UPDATE_CATEGORY_REQUEST });
//     try {
//       const response = await axios.put(
//         `${BASE_URL}/api/v1/admin/restaurants/categories/${categoryId}`,
//         categoryData,
//         getAuthHeaders()
//       );
//       dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: response.data.data });
//     } catch (error) {
//       dispatch({
//         type: UPDATE_CATEGORY_FAILURE,
//         payload: error.response?.data?.message || "Failed to update ingredient",
//       });
//     }
//   };

// // Delete Category
// export const deleteCategory = (categoryId) => async (dispatch) => {
//   dispatch({ type: DELETE_CATEGORY_REQUEST });
//   try {
//     await axios.delete(
//       `${BASE_URL}/api/v1/admin/restaurants/categories/${categoryId}`,
//       getAuthHeaders()
//     );
//     dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: categoryId });
//   } catch (error) {
//     dispatch({
//       type: DELETE_CATEGORY_FAILURE,
//       payload: error.response?.data?.message || "Failed to delete ingredient",
//     });
//   }
// };

// // Create Food
// export const createFood = (foodData) => async (dispatch) => {
//   dispatch({ type: CREATE_FOOD_REQUEST });
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/api/v1/admin/restaurants/foods`,
//       foodData,
//       getAuthHeaders()
//     );
//     dispatch({ type: CREATE_FOOD_SUCCESS, payload: response.data.data });
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: CREATE_FOOD_FAILURE,
//       payload: error.response?.data?.message || "Failed to create food",
//     });
//   }
// };

// // Update Food
// export const updateFood = (foodId, foodData) => async (dispatch) => {
//   dispatch({ type: UPDATE_FOOD_REQUEST });
//   try {
//     const response = await axios.put(
//       `${BASE_URL}/api/v1/admin/restaurants/foods/${foodId}`,
//       foodData,
//       getAuthHeaders()
//     );
//     dispatch({ type: UPDATE_FOOD_SUCCESS, payload: response.data.data });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_FOOD_FAILURE,
//       payload: error.response?.data?.message || "Failed to update food",
//     });
//   }
// };

// // Delete Food
// export const deleteFood = (foodId) => async (dispatch) => {
//   dispatch({ type: DELETE_FOOD_REQUEST });
//   try {
//     await axios.delete(
//       `${BASE_URL}/api/v1/admin/restaurants/foods/${foodId}`,
//       getAuthHeaders()
//     );
//     dispatch({ type: DELETE_FOOD_SUCCESS, payload: foodId });
//   } catch (error) {
//     dispatch({
//       type: DELETE_FOOD_FAILURE,
//       payload: error.response?.data?.message || "Failed to delete food",
//     });
//   }
// };

// // Get Food by Restaurant
// export const getFoodByRestaurantId = (restaurantId) => async (dispatch) => {
//   dispatch({ type: GET_FOOD_BY_RESTAURANT_REQUEST });
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/admin/restaurants/${restaurantId}/foods`,
//       getAuthHeaders()
//     );
//     dispatch({
//       type: GET_FOOD_BY_RESTAURANT_SUCCESS,
//       payload: response.data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_FOOD_BY_RESTAURANT_FAILURE,
//       payload:
//         error.response?.data?.message || "Failed to fetch foods by restaurant",
//     });
//   }
// };
// // Get Food by Restaurant
// export const getFoodByRestaurant = () => async (dispatch) => {
//   dispatch({ type: GET_FOOD_BY_RESTAURANT_REQUEST });
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/admin/restaurants/foods`,
//       getAuthHeaders()
//     );
//     dispatch({
//       type: GET_FOOD_BY_RESTAURANT_SUCCESS,
//       payload: response.data.data.items,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_FOOD_BY_RESTAURANT_FAILURE,
//       payload:
//         error.response?.data?.message || "Failed to fetch foods by restaurant",
//     });
//   }
// };
// // Update Availability
// export const updateAvailability =
//   (foodId, availability) => async (dispatch) => {
//     dispatch({ type: UPDATE_AVAILABILITY_REQUEST });
//     try {
//       const response = await axios.put(
//         `${BASE_URL}/api/v1/admin/restaurants/foods/${foodId}/availability`,{},
//         getAuthHeaders()
//       );
//       dispatch({
//         type: UPDATE_AVAILABILITY_SUCCESS,
//         payload: response.data.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: UPDATE_AVAILABILITY_FAILURE,
//         payload:
//           error.response?.data?.message || "Failed to update availability",
//       });
//     }
//   };

// // Get All Foods
// export const getAllFoods = (restaurantId, filters) => async (dispatch) => {
//   dispatch({ type: GET_ALL_FOODS_REQUEST });
//   try {
//     // Lọc các tham số không rỗng hoặc không null
//     const filteredParams = Object.fromEntries(
//       Object.entries(filters).filter(
//         ([_, value]) => value !== null && value !== "" && value !== undefined
//       )
//     );

//     const response = await axios.get(
//       `${BASE_URL}/api/v1/restaurants/${restaurantId}/foods`,
//       {
//         params: filteredParams, // Chỉ gửi các tham số đã được lọc
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     dispatch({
//       type: GET_ALL_FOODS_SUCCESS,
//       payload: response.data.data.items,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_ALL_FOODS_FAILURE,
//       payload:
//         error.response?.data?.message || "Failed to fetch foods by restaurant",
//     });
//   }
// };

// // Get Food by ID
// export const getFoodById = (foodId) => async (dispatch) => {
//   dispatch({ type: GET_FOOD_BY_ID_REQUEST });
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/foods/${foodId}`,
//       getAuthHeaders()
//     );
//     dispatch({ type: GET_FOOD_BY_ID_SUCCESS, payload: response.data.data });
//   } catch (error) {
//     dispatch({
//       type: GET_FOOD_BY_ID_FAILURE,
//       payload: error.response?.data?.message || "Failed to fetch food by ID",
//     });
//   }
// };

// // Create Ingredient
// export const createIngredient = (ingredientData) => async (dispatch) => {
//   dispatch({ type: CREATE_INGREDIENT_REQUEST });
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/api/v1/admin/restaurants/ingredients`,
//       ingredientData,
//       getAuthHeaders()
//     );
//     dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data.data });
//   } catch (error) {
//     dispatch({
//       type: CREATE_INGREDIENT_FAILURE,
//       payload: error.response?.data?.message || "Failed to create ingredient",
//     });
//   }
// };

// // Update Ingredient
// export const updateIngredient =
//   (ingredientId, ingredientData) => async (dispatch) => {
//     dispatch({ type: UPDATE_INGREDIENT_REQUEST });
//     try {
//       const response = await axios.put(
//         `${BASE_URL}/api/v1/admin/restaurants/ingredients/${ingredientId}`,
//         ingredientData,
//         getAuthHeaders()
//       );
//       dispatch({
//         type: UPDATE_INGREDIENT_SUCCESS,
//         payload: response.data.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: UPDATE_INGREDIENT_FAILURE,
//         payload: error.response?.data?.message || "Failed to update ingredient",
//       });
//     }
//   };

// // Get Ingredients by Restaurant
// export const getIngredientsByRestaurant = () => async (dispatch) => {
//   dispatch({ type: GET_INGREDIENTS_BY_RESTAURANT_REQUEST });
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/admin/restaurants/ingredients`,
//       getAuthHeaders()
//     );
//     dispatch({
//       type: GET_INGREDIENTS_BY_RESTAURANT_SUCCESS,
//       payload: response.data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_INGREDIENTS_BY_RESTAURANT_FAILURE,
//       payload:
//         error.response?.data?.message ||
//         "Failed to fetch ingredients by restaurant",
//     });
//   }
// };

// // Delete Ingredient
// export const deleteIngredient = (ingredientId) => async (dispatch) => {
//   dispatch({ type: DELETE_INGREDIENT_REQUEST });
//   try {
//     await axios.delete(
//       `${BASE_URL}/api/v1/admin/restaurants/ingredients/${ingredientId}`,
//       getAuthHeaders()
//     );
//     dispatch({ type: DELETE_INGREDIENT_SUCCESS, payload: ingredientId });
//   } catch (error) {
//     dispatch({
//       type: DELETE_INGREDIENT_FAILURE,
//       payload: error.response?.data?.message || "Failed to delete ingredient",
//     });
//   }
// };

// // Add Favourite Restaurant
// export const addFavouriteRestaurant = (restaurantId) => async (dispatch) => {
//   dispatch({ type: ADD_FAVOURITE_RESTAURANT_REQUEST });
//   try {
//     const response = await axios.put(
//       `${BASE_URL}/api/v1/restaurants/${restaurantId}/favourites`,
//       {},
//       getAuthHeaders()
//     );
//     dispatch({
//       type: ADD_FAVOURITE_RESTAURANT_SUCCESS,
//       payload: response.data.data,
//     });
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: ADD_FAVOURITE_RESTAURANT_FAILURE,
//       payload:
//         error.response?.data?.message || "Failed to add favourite restaurant",
//     });
//   }
// };

// // Get Favourite Restaurants
// export const getFavouriteRestaurants = () => async (dispatch) => {
//   dispatch({ type: GET_FAVOURITE_RESTAURANTS_REQUEST });
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/restaurants/favourites`,
//       getAuthHeaders()
//     );
//     dispatch({
//       type: GET_FAVOURITE_RESTAURANTS_SUCCESS,
//       payload: response.data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_FAVOURITE_RESTAURANTS_FAILURE,
//       payload:
//         error.response?.data?.message ||
//         "Failed to fetch favourite restaurants",
//     });
//   }
// };

// // Search Restaurants
// export const searchRestaurants = (query) => async (dispatch) => {
//   dispatch({ type: SEARCH_RESTAURANTS_REQUEST });
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/api/v1/restaurants/search?keyword=${query}`,
//       getAuthHeaders()
//     );
//     dispatch({ type: SEARCH_RESTAURANTS_SUCCESS, payload: response.data.data });
//   } catch (error) {
//     dispatch({
//       type: SEARCH_RESTAURANTS_FAILURE,
//       payload: error.response?.data?.message || "Failed to search restaurants",
//     });
//   }
// };

// export const getOrderByRestaurant = () => async (dispatch) => {
//   dispatch({ type: GET_ORDER_BY_RESTAURANT_REQUEST });
//   try {
//     const response = await axios.get(
//       `http://localhost:8080/api/v1/admin/restaurants/orders`,
//       getAuthHeaders()
//     );
//     // response.data.data là PaginationResponse
//     dispatch({
//       type: GET_ORDER_BY_RESTAURANT_SUCCESS,
//       payload: response.data.data.items,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_ORDER_BY_RESTAURANT_FAILURE,
//       payload:
//         error.response?.data?.message || "Failed to fetch orders by restaurant",
//     });
//   }
// };

// // Cập nhật trạng thái đơn hàng
// export const updateOrderStatus = (orderId, status) => async (dispatch) => {
//   dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
//   try {
//     const response = await axios.put(
//       `http://localhost:8080/api/v1/admin/restaurants/orders/${orderId}`,
//       { status }, // body: { status: "NEW_STATUS" }
//       getAuthHeaders()
//     );
//     dispatch({
//       type: UPDATE_ORDER_STATUS_SUCCESS,
//       payload: response.data.data, // Trả về order đã cập nhật
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_ORDER_STATUS_FAILURE,
//       payload: error.response?.data?.message || "Failed to update order status",
//     });
//   }
// };

import api from "../../../config/api";
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
  SEARCH_RESTAURANTS_FAILURE,
  SEARCH_RESTAURANTS_SUCCESS,
  SEARCH_RESTAURANTS_REQUEST,
  GET_FAVOURITE_RESTAURANTS_FAILURE,
  GET_FAVOURITE_RESTAURANTS_SUCCESS,
  GET_FAVOURITE_RESTAURANTS_REQUEST,
  ADD_FAVOURITE_RESTAURANT_SUCCESS,
  ADD_FAVOURITE_RESTAURANT_FAILURE,
  ADD_FAVOURITE_RESTAURANT_REQUEST,
  DELETE_INGREDIENT_SUCCESS,
  DELETE_INGREDIENT_FAILURE,
  DELETE_INGREDIENT_REQUEST,
  GET_INGREDIENTS_BY_RESTAURANT_FAILURE,
  GET_INGREDIENTS_BY_RESTAURANT_SUCCESS,
  GET_INGREDIENTS_BY_RESTAURANT_REQUEST,
  UPDATE_INGREDIENT_FAILURE,
  UPDATE_INGREDIENT_SUCCESS,
  UPDATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_SUCCESS,
  CREATE_INGREDIENT_REQUEST,
  GET_FOOD_BY_ID_FAILURE,
  GET_FOOD_BY_ID_SUCCESS,
  GET_FOOD_BY_ID_REQUEST,
  GET_ALL_FOODS_FAILURE,
  GET_ALL_FOODS_SUCCESS,
  GET_ALL_FOODS_REQUEST,
  UPDATE_AVAILABILITY_FAILURE,
  UPDATE_AVAILABILITY_SUCCESS,
  UPDATE_AVAILABILITY_REQUEST,
  GET_FOOD_BY_RESTAURANT_FAILURE,
  GET_FOOD_BY_RESTAURANT_SUCCESS,
  GET_FOOD_BY_RESTAURANT_REQUEST,
  DELETE_FOOD_FAILURE,
  DELETE_FOOD_REQUEST,
  DELETE_FOOD_SUCCESS,
  UPDATE_FOOD_FAILURE,
  UPDATE_FOOD_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_REQUEST,
  GET_ORDER_BY_RESTAURANT_FAILURE,
  GET_ORDER_BY_RESTAURANT_SUCCESS,
  GET_ORDER_BY_RESTAURANT_REQUEST,
  UPDATE_FOOD_REQUEST,
  CREATE_FOOD_FAILURE,
  CREATE_FOOD_SUCCESS,
  CREATE_FOOD_REQUEST,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  GET_RESTAURANT_STATISTICS_REQUEST,
  GET_RESTAURANT_STATISTICS_SUCCESS,
  GET_RESTAURANT_STATISTICS_FAILURE,
  GET_CATEGORY_OF_RESTAURANT_ID_REQUEST,
  GET_CATEGORY_OF_RESTAURANT_ID_SUCCESS,
  GET_CATEGORY_OF_RESTAURANT_ID_FAILURE,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
} from "./ActionType";

// Lấy chi tiết nhà hàng theo id
export const getRestaurantById = (restaurantId) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
  try {
    const response = await api.get(`/restaurants/${restaurantId}`);
    dispatch({
      type: GET_RESTAURANT_BY_ID_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_BY_ID_FAILURE,
      payload:
        error.response?.data?.message || "Failed to fetch restaurant details",
    });
  }
};

export const getAllRestaurant = () => async (dispatch) => {
  dispatch({ type: GET_ALL_RESTAURANT_REQUEST });
  try {
    const response = await api.get(`/restaurants`);
    dispatch({
      type: GET_ALL_RESTAURANT_SUCCESS,
      payload: response.data.data.items,
    });
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
    const response = await api.get(`/admin/my-restaurant`);
    dispatch({ type: GET_MY_RESTAURANT_SUCCESS, payload: response.data.data });
  } catch (error) {
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
    const response = await api.post(`/admin/restaurants`, restaurantData);
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
    const response = await api.put(`/admin/restaurants`, restaurantData);
    dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: UPDATE_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || {
        message: error.message || "Failed to update restaurant",
      },
    });
  }
};

export const deleteRestaurant =
  ({ restaurantId }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
      const response = await api.delete(`/admin/restaurants/${restaurantId}`);
      dispatch({
        type: DELETE_RESTAURANT_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_RESTAURANT_FAILURE,
        payload: error.response?.data?.message || {
          message: error.message || "Failed to delete restaurant",
        },
      });
    }
  };

// Lấy danh mục theo restaurantId
export const getCategoriesByRestaurantId =
  (restaurantId) => async (dispatch) => {
    dispatch({ type: GET_CATEGORY_OF_RESTAURANT_ID_REQUEST });
    try {
      const response = await api.get(`/restaurants/${restaurantId}/categories`);
      dispatch({
        type: GET_CATEGORY_OF_RESTAURANT_ID_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_CATEGORY_OF_RESTAURANT_ID_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch categories",
      });
    }
  };

export const updateStatusOfRestaurant = () => async (dispatch) => {
  dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
  try {
    const response = await api.put(`/admin/restaurants/status`, {});
    dispatch({
      type: UPDATE_RESTAURANT_STATUS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_RESTAURANT_STATUS_FAILURE,
      payload: error.response?.data?.message || {
        message: error.message || "Failed to update status",
      },
    });
  }
};

export const getCategoriesByRestaurant = () => async (dispatch) => {
  dispatch({ type: GET_CATEGORY_OF_RESTAURANT_REQUEST });
  try {
    const response = await api.get(`/admin/restaurants/categories`);
    dispatch({
      type: GET_CATEGORY_OF_RESTAURANT_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_OF_RESTAURANT_FAILURE,
      payload: error.response?.data?.message || {
        message: error.message || "Failed to fetch categories",
      },
    });
  }
};

export const createCategoryOfRestaurant =
  (categoryData) => async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const response = await api.post(
        `/admin/restaurants/categories`,
        categoryData
      );
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({
        type: CREATE_CATEGORY_FAILURE,
        payload: error.response?.data?.message || {
          message: error.message || "Failed to create category",
        },
      });
    }
  };

export const updateCategory =
  (categoryId, categoryData) => async (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    try {
      const response = await api.put(
        `/admin/restaurants/categories/${categoryId}`,
        categoryData
      );
      dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({
        type: UPDATE_CATEGORY_FAILURE,
        payload: error.response?.data?.message || "Failed to update category",
      });
    }
  };

export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_REQUEST });
  try {
    await api.delete(`/admin/restaurants/categories/${categoryId}`);
    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: categoryId });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAILURE,
      payload: error.response?.data?.message || "Failed to delete category",
    });
  }
};

// Create Food
export const createFood = (foodData) => async (dispatch) => {
  dispatch({ type: CREATE_FOOD_REQUEST });
  try {
    const response = await api.post(`/admin/restaurants/foods`, foodData);
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
    const response = await api.put(
      `/admin/restaurants/foods/${foodId}`,
      foodData
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
    await api.delete(`/admin/restaurants/foods/${foodId}`);
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
    const response = await api.get(`/admin/restaurants/${restaurantId}/foods`);
    dispatch({
      type: GET_FOOD_BY_RESTAURANT_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_FOOD_BY_RESTAURANT_FAILURE,
      payload:
        error.response?.data?.message || "Failed to fetch foods by restaurant",
    });
  }
};

// Lấy danh sách món ăn của nhà hàng (admin) có phân trang, không filter
export const getFoodByRestaurant = (page = 1, size = 5) => async (dispatch) => {
  dispatch({ type: GET_FOOD_BY_RESTAURANT_REQUEST });
  try {
    const params = { page, size };
    const response = await api.get(`/admin/restaurants/foods`, { params });
    dispatch({
      type: GET_FOOD_BY_RESTAURANT_SUCCESS,
      payload: {
        items: response.data.data.items,
        pagination: response.data.data.pagination,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_FOOD_BY_RESTAURANT_FAILURE,
      payload:
        error.response?.data?.message || "Failed to fetch foods by restaurant",
    });
  }
};

// Update Availability
export const updateAvailability =
  (foodId, availability) => async (dispatch) => {
    dispatch({ type: UPDATE_AVAILABILITY_REQUEST });
    try {
      const response = await api.put(
        `/admin/restaurants/foods/${foodId}/availability`,
        {}
      );
      dispatch({
        type: UPDATE_AVAILABILITY_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_AVAILABILITY_FAILURE,
        payload:
          error.response?.data?.message || "Failed to update availability",
      });
    }
  };

// Get All Foods with filters
// export const getAllFoods = (restaurantId, filters) => async (dispatch) => {
//   dispatch({ type: GET_ALL_FOODS_REQUEST });
//   try {
//     const filteredParams = Object.fromEntries(
//       Object.entries(filters).filter(
//         ([_, value]) => value !== null && value !== "" && value !== undefined
//       )
//     );
//     const response = await api.get(`/restaurants/${restaurantId}/foods`, {
//       params: filteredParams,
//     });
//     dispatch({
//       type: GET_ALL_FOODS_SUCCESS,
//       payload: response.data.data.items,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_ALL_FOODS_FAILURE,
//       payload:
//         error.response?.data?.message || "Failed to fetch foods by restaurant",
//     });
//   }
// };
export const getAllFoods = (restaurantId, filters = {}, page = 1, size = 5) => async (dispatch) => {
  dispatch({ type: GET_ALL_FOODS_REQUEST });
  try {
    // Lọc các tham số không rỗng hoặc không null
    const filteredParams = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== null && value !== "" && value !== undefined
      )
    );
    const params = { ...filteredParams, page, size };
    const response = await api.get(
      `/restaurants/${restaurantId}/foods`,
      { params }
    );
    dispatch({
      type: GET_ALL_FOODS_SUCCESS,
      payload: {
        items: response.data.data.items,
        pagination: response.data.data.pagination,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_FOODS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch foods by restaurant",
    });
  }
};

// Get Food by ID
export const getFoodById = (foodId) => async (dispatch) => {
  dispatch({ type: GET_FOOD_BY_ID_REQUEST });
  try {
    const response = await api.get(`/foods/${foodId}`);
    dispatch({ type: GET_FOOD_BY_ID_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: GET_FOOD_BY_ID_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch food by ID",
    });
  }
};

// Create Ingredient
export const createIngredient = (ingredientData) => async (dispatch) => {
  dispatch({ type: CREATE_INGREDIENT_REQUEST });
  try {
    const response = await api.post(
      `/admin/restaurants/ingredients`,
      ingredientData
    );
    dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: CREATE_INGREDIENT_FAILURE,
      payload: error.response?.data?.message || "Failed to create ingredient",
    });
  }
};

// Update Ingredient
export const updateIngredient =
  (ingredientId, ingredientData) => async (dispatch) => {
    dispatch({ type: UPDATE_INGREDIENT_REQUEST });
    try {
      const response = await api.put(
        `/admin/restaurants/ingredients/${ingredientId}`,
        ingredientData
      );
      dispatch({
        type: UPDATE_INGREDIENT_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_INGREDIENT_FAILURE,
        payload: error.response?.data?.message || "Failed to update ingredient",
      });
    }
  };

// Get Ingredients by Restaurant
export const getIngredientsByRestaurant = () => async (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_BY_RESTAURANT_REQUEST });
  try {
    const response = await api.get(`/admin/restaurants/ingredients`);
    dispatch({
      type: GET_INGREDIENTS_BY_RESTAURANT_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_INGREDIENTS_BY_RESTAURANT_FAILURE,
      payload:
        error.response?.data?.message ||
        "Failed to fetch ingredients by restaurant",
    });
  }
};

// Delete Ingredient
export const deleteIngredient = (ingredientId) => async (dispatch) => {
  dispatch({ type: DELETE_INGREDIENT_REQUEST });
  try {
    await api.delete(`/admin/restaurants/ingredients/${ingredientId}`);
    dispatch({ type: DELETE_INGREDIENT_SUCCESS, payload: ingredientId });
  } catch (error) {
    dispatch({
      type: DELETE_INGREDIENT_FAILURE,
      payload: error.response?.data?.message || "Failed to delete ingredient",
    });
  }
};

// Add Favourite Restaurant
export const addFavouriteRestaurant = (restaurantId) => async (dispatch) => {
  dispatch({ type: ADD_FAVOURITE_RESTAURANT_REQUEST });
  try {
    const response = await api.put(
      `/restaurants/${restaurantId}/favourites`,
      {}
    );
    dispatch({
      type: ADD_FAVOURITE_RESTAURANT_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_FAVOURITE_RESTAURANT_FAILURE,
      payload:
        error.response?.data?.message || "Failed to add favourite restaurant",
    });
  }
};

// Get Favourite Restaurants
export const getFavouriteRestaurants = () => async (dispatch) => {
  dispatch({ type: GET_FAVOURITE_RESTAURANTS_REQUEST });
  try {
    const response = await api.get(`/restaurants/favourites`);
    dispatch({
      type: GET_FAVOURITE_RESTAURANTS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_FAVOURITE_RESTAURANTS_FAILURE,
      payload:
        error.response?.data?.message ||
        "Failed to fetch favourite restaurants",
    });
  }
};

// Search Restaurants
export const searchRestaurants = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_RESTAURANTS_REQUEST });
  try {
    const response = await api.get(`/restaurants/search?keyword=${query}`);
    dispatch({ type: SEARCH_RESTAURANTS_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({
      type: SEARCH_RESTAURANTS_FAILURE,
      payload: error.response?.data?.message || "Failed to search restaurants",
    });
  }
};

// Get Orders by Restaurant
export const getOrderByRestaurant = (page = 1, size = 5) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_RESTAURANT_REQUEST });
  try {
    const params = { page, size };
    const response = await api.get(`/admin/restaurants/orders`, { params });
    dispatch({
      type: GET_ORDER_BY_RESTAURANT_SUCCESS,
      payload: {
        items: response.data.data.items,
        pagination: response.data.data.pagination,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_ORDER_BY_RESTAURANT_FAILURE,
      payload:
        error.response?.data?.message || "Failed to fetch orders by restaurant",
    });
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
  try {
    const response = await api.put(`/admin/restaurants/orders/${orderId}`, {
      status,
    });
    dispatch({
      type: UPDATE_ORDER_STATUS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_STATUS_FAILURE,
      payload: error.response?.data?.message || "Failed to update order status",
    });
  }
};

export const getRestaurantStatistics = () => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_STATISTICS_REQUEST});
  try {
    const response = await api.get("/admin/restaurants/statistics");
    dispatch({
      type: GET_RESTAURANT_STATISTICS_SUCCESS,
      payload: response.data.data, // { totalOrders, totalFoods }
    });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_STATISTICS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch statistics",
    });
  }
};