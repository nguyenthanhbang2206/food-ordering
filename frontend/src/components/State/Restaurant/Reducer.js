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
} from "./ActionType";

const initialState = {
  restaurants: [],
  userRestaurant: null,
  restaurant: null,
  categories: [],
  favouriteRestaurants: [],
  foods: [],
  food: null,
  ingredients: [],
  loading: false,
  error: null,
  message: null,
};

export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
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
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success states
    case GET_MY_RESTAURANT_SUCCESS:
      return {
        ...state,
        userRestaurant: action.payload,
        loading: false,
        error: null,
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
        favouriteRestaurants: [...state.favouriteRestaurants, action.payload],
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
        restaurants: action.payload,
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
        foods: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
        error: null,
      };
    case GET_ALL_FOODS_SUCCESS:
      return {
        ...state,
        foods: action.payload,
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