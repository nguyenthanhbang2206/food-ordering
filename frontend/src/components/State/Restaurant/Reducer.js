import { isPresentInFavorites } from "../../../config/api";
import {
  GET_MY_RESTAURANT_REQUEST,
  GET_MY_RESTAURANT_SUCCESS,
  GET_MY_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  GET_CATEGORY_OF_RESTAURANT_REQUEST,
  GET_CATEGORY_OF_RESTAURANT_SUCCESS,
  GET_CATEGORY_OF_RESTAURANT_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  ADD_FAVOURITE_RESTAURANT_REQUEST,
  ADD_FAVOURITE_RESTAURANT_SUCCESS,
  ADD_FAVOURITE_RESTAURANT_FAILURE,
  GET_FAVOURITE_RESTAURANTS_REQUEST,
  GET_FAVOURITE_RESTAURANTS_SUCCESS,
  GET_FAVOURITE_RESTAURANTS_FAILURE,
  SEARCH_RESTAURANTS_REQUEST,
  SEARCH_RESTAURANTS_SUCCESS,
  SEARCH_RESTAURANTS_FAILURE,
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
  GET_ALL_FOODS_REQUEST,
  GET_ALL_FOODS_SUCCESS,
  GET_ALL_FOODS_FAILURE,
  GET_FOOD_BY_ID_REQUEST,
  GET_FOOD_BY_ID_SUCCESS,
  GET_FOOD_BY_ID_FAILURE,
  UPDATE_AVAILABILITY_REQUEST,
  UPDATE_AVAILABILITY_SUCCESS,
  UPDATE_AVAILABILITY_FAILURE,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  UPDATE_INGREDIENT_REQUEST,
  UPDATE_INGREDIENT_SUCCESS,
  UPDATE_INGREDIENT_FAILURE,
  GET_INGREDIENTS_BY_RESTAURANT_REQUEST,
  GET_INGREDIENTS_BY_RESTAURANT_SUCCESS,
  GET_INGREDIENTS_BY_RESTAURANT_FAILURE,
  DELETE_INGREDIENT_REQUEST,
  DELETE_INGREDIENT_SUCCESS,
  DELETE_INGREDIENT_FAILURE,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  GET_RESTAURANT_STATISTICS_REQUEST,
  GET_RESTAURANT_STATISTICS_SUCCESS,
  GET_RESTAURANT_STATISTICS_FAILURE,
  GET_ORDER_BY_RESTAURANT_REQUEST,
  GET_ORDER_BY_RESTAURANT_SUCCESS,
  GET_ORDER_BY_RESTAURANT_FAILURE,
  GET_CATEGORY_OF_RESTAURANT_ID_REQUEST,
  GET_CATEGORY_OF_RESTAURANT_ID_SUCCESS,
  GET_CATEGORY_OF_RESTAURANT_ID_FAILURE,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
} from "./ActionType";

const initialState = {
  restaurants: [],
  statistics: null,
  userRestaurant: null,
  restaurant: null,
  categories: [],
  categoriesByRestaurant: [],
  restaurantOrders: [],
  favouriteRestaurants: [],
  foods: [],
  food: null,
  ingredients: [],
  loading: false,
  error: null,
  message: null,
  searchResults: [], 
};

export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_BY_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_BY_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantOrders: Array.isArray(action.payload.items)
          ? action.payload.items
          : [],
        pagination: action.payload.pagination,
        error: null,
      };
    case GET_ORDER_BY_RESTAURANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Cập nhật trạng thái đơn hàng
    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        // Cập nhật order vừa thay đổi trong danh sách restaurantOrders
        restaurantOrders: state.restaurantOrders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
        error: null,
        message: "Cập nhật trạng thái đơn hàng thành công!",
      };
    case UPDATE_ORDER_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // Loading states
    case GET_MY_RESTAURANT_REQUEST:
    case CREATE_RESTAURANT_REQUEST:
    case GET_ALL_RESTAURANT_REQUEST:
    case DELETE_RESTAURANT_REQUEST:
    case UPDATE_RESTAURANT_REQUEST:
    case UPDATE_RESTAURANT_STATUS_REQUEST:
    case CREATE_CATEGORY_REQUEST:
    case GET_CATEGORY_OF_RESTAURANT_REQUEST:
    case UPDATE_CATEGORY_REQUEST:
    case DELETE_CATEGORY_REQUEST:
    case ADD_FAVOURITE_RESTAURANT_REQUEST:
    case GET_FAVOURITE_RESTAURANTS_REQUEST:
    case SEARCH_RESTAURANTS_REQUEST:
    case CREATE_FOOD_REQUEST:
    case UPDATE_FOOD_REQUEST:
    case DELETE_FOOD_REQUEST:
    case GET_FOOD_BY_RESTAURANT_REQUEST:
    case GET_ALL_FOODS_REQUEST:
    case GET_FOOD_BY_ID_REQUEST:
    case UPDATE_AVAILABILITY_REQUEST:
    case CREATE_INGREDIENT_REQUEST:
    case UPDATE_INGREDIENT_REQUEST:
    case GET_INGREDIENTS_BY_RESTAURANT_REQUEST:
    case DELETE_INGREDIENT_REQUEST:
    case GET_CATEGORY_OF_RESTAURANT_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success states
    case GET_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        restaurant: action.payload,
        loading: false,
        error: null,
      };
    case GET_RESTAURANT_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_MY_RESTAURANT_SUCCESS:
      return {
        ...state,
        userRestaurant: action.payload,
        loading: false,
        error: null,
      };
    case GET_CATEGORY_OF_RESTAURANT_ID_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };
    case GET_CATEGORY_OF_RESTAURANT_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        userRestaurant: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurants: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurants: state.restaurants.filter(
          (restaurant) => restaurant.id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case UPDATE_RESTAURANT_SUCCESS:
    case UPDATE_RESTAURANT_STATUS_SUCCESS:
      return {
        ...state,
        userRestaurant: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
        error: null,
      };
    case GET_CATEGORY_OF_RESTAURANT_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
        loading: false,
        error: null,
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case ADD_FAVOURITE_RESTAURANT_SUCCESS:
      return {
        ...state,
        favouriteRestaurants: isPresentInFavorites(
          state.favouriteRestaurants,
          action.payload
        )
          ? state.favouriteRestaurants.filter(
              (item) => item.id !== action.payload.id
            )
          : [action.payload, ...state.favouriteRestaurants], // thêm hoặc xóa món ăn khỏi danh sách yêu thích
        loading: false,
        error: null,
      };
    case GET_FAVOURITE_RESTAURANTS_SUCCESS:
      return {
        ...state,
        favouriteRestaurants: action.payload,
        loading: false,
        error: null,
      };
    case SEARCH_RESTAURANTS_SUCCESS:
      return {
        ...state,
        searchResults: action.payload, // <-- Lưu kết quả tìm kiếm vào searchResults
        loading: false,
        error: null,
      };
    case CREATE_FOOD_SUCCESS:
      return {
        ...state,
        foods: [...state.foods, action.payload],
        loading: false,
        error: null,
      };
    case UPDATE_FOOD_SUCCESS:
      return {
        ...state,
        foods: state.foods.map((food) =>
          food.id === action.payload.id ? action.payload : food
        ),
        loading: false,
        error: null,
      };
    case DELETE_FOOD_SUCCESS:
      return {
        ...state,
        foods: state.foods.filter((food) => food.id !== action.payload),
        loading: false,
        error: null,
      };
    case GET_FOOD_BY_RESTAURANT_SUCCESS:
      return {
        ...state,
        foods: Array.isArray(action.payload.items) ? action.payload.items : [],
        pagination: action.payload.pagination,
        loading: false,
        error: null,
      };
    case GET_ALL_FOODS_SUCCESS:
      return {
        ...state,
        foods: action.payload.items,
        pagination: action.payload.pagination,
        loading: false,
        error: null,
      };
    case GET_FOOD_BY_ID_SUCCESS:
      return {
        ...state,
        food: action.payload,
        loading: false,
        error: null,
      };
    case GET_RESTAURANT_STATISTICS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_RESTAURANT_STATISTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        statistics: action.payload,
        error: null,
      };
    case GET_RESTAURANT_STATISTICS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_AVAILABILITY_SUCCESS:
      return {
        ...state,
        foods: state.foods.map((food) =>
          food.id === action.payload.id ? action.payload : food
        ),
        loading: false,
        error: null,
      };
    case CREATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
        loading: false,
        error: null,
      };
    case UPDATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient.id === action.payload.id ? action.payload : ingredient
        ),
        loading: false,
        error: null,
      };
    case GET_INGREDIENTS_BY_RESTAURANT_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_INGREDIENT_SUCCESS:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        ),
        loading: false,
        error: null,
      };

    // Failure states
    case GET_MY_RESTAURANT_FAILURE:
    case CREATE_RESTAURANT_FAILURE:
    case GET_ALL_RESTAURANT_FAILURE:
    case DELETE_RESTAURANT_FAILURE:
    case UPDATE_RESTAURANT_FAILURE:
    case UPDATE_RESTAURANT_STATUS_FAILURE:
    case CREATE_CATEGORY_FAILURE:
    case GET_CATEGORY_OF_RESTAURANT_FAILURE:
    case UPDATE_CATEGORY_FAILURE:
    case DELETE_CATEGORY_FAILURE:
    case ADD_FAVOURITE_RESTAURANT_FAILURE:
    case GET_FAVOURITE_RESTAURANTS_FAILURE:
    case SEARCH_RESTAURANTS_FAILURE:
    case CREATE_FOOD_FAILURE:
    case UPDATE_FOOD_FAILURE:
    case DELETE_FOOD_FAILURE:
    case GET_FOOD_BY_RESTAURANT_FAILURE:
    case GET_ALL_FOODS_FAILURE:
    case GET_FOOD_BY_ID_FAILURE:
    case UPDATE_AVAILABILITY_FAILURE:
    case CREATE_INGREDIENT_FAILURE:
    case UPDATE_INGREDIENT_FAILURE:
    case GET_INGREDIENTS_BY_RESTAURANT_FAILURE:
    case DELETE_INGREDIENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
