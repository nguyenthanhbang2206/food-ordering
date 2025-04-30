import {
  GET_MY_RESTAURANT_REQUEST,
  GET_MY_RESTAURANT_SUCCESS,
  GET_MY_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_REQUEST,
  CREATE_CATEGORY_REQUEST,
  GET_CATEGORY_OF_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_SUCCESS,
  CREATE_CATEGORY_SUCCESS,
  GET_CATEGORY_OF_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_FAILURE,
  GET_CATEGORY_OF_RESTAURANT_FAILURE,
} from "./ActionType";

const initialState = {
  restaurants: [],
  userRestaurant: null,
  restaurant: null,
  loading: false,
  error: null,
  message: null,
  categories: [],
};

export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_RESTAURANT_REQUEST:
    case CREATE_RESTAURANT_REQUEST:
    case GET_ALL_RESTAURANT_REQUEST:
    case DELETE_RESTAURANT_REQUEST:
    case UPDATE_RESTAURANT_REQUEST:
    case CREATE_CATEGORY_REQUEST:
    case GET_CATEGORY_OF_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_MY_RESTAURANT_SUCCESS:
    case UPDATE_RESTAURANT_STATUS_SUCCESS:
    case UPDATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurant: action.payload,
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
          (restaurant) => restaurant.id !== action.payload.id
        ),
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
    case CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
        error: null,
        userRestaurant: action.payload,
      };
    case GET_MY_RESTAURANT_FAILURE:
      return {
        ...state,
        restaurant: null,
        loading: false,
        error: action.payload,
      };

    case CREATE_RESTAURANT_FAILURE:
    case GET_ALL_RESTAURANT_FAILURE:
    case DELETE_RESTAURANT_FAILURE:
    case UPDATE_RESTAURANT_FAILURE:
    case GET_CATEGORY_OF_RESTAURANT_FAILURE:
      return {
        ...state,
        message: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
