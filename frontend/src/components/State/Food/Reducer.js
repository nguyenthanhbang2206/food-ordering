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

const initialState = {
  foods: [], // Danh sách món ăn
  food: null, // Chi tiết món ăn
  loading: false, // Trạng thái loading
  error: null, // Lỗi
  success: null, // Thông báo thành công
};

export const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Food
    case CREATE_FOOD_REQUEST:
      return { ...state, loading: true, error: null, success: null };
    case CREATE_FOOD_SUCCESS:
      return {
        ...state,
        loading: false,
        foods: [...state.foods, action.payload],
        success: "Food created successfully!",
      };
    case CREATE_FOOD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update Food
    case UPDATE_FOOD_REQUEST:
      return { ...state, loading: true, error: null, success: null };
    case UPDATE_FOOD_SUCCESS:
      return {
        ...state,
        loading: false,
        foods: state.foods.map((food) =>
          food.id === action.payload.id ? action.payload : food
        ),
        success: "Food updated successfully!",
      };
    case UPDATE_FOOD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Delete Food
    case DELETE_FOOD_REQUEST:
      return { ...state, loading: true, error: null, success: null };
    case DELETE_FOOD_SUCCESS:
      return {
        ...state,
        loading: false,
        foods: state.foods.filter((food) => food.id !== action.payload),
        success: "Food deleted successfully!",
      };
    case DELETE_FOOD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Get Food by Restaurant
    case GET_FOOD_BY_RESTAURANT_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_FOOD_BY_RESTAURANT_SUCCESS:
      return { ...state, loading: false, foods: action.payload };
    case GET_FOOD_BY_RESTAURANT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update Availability
    case UPDATE_AVAILABILITY_REQUEST:
      return { ...state, loading: true, error: null, success: null };
    case UPDATE_AVAILABILITY_SUCCESS:
      return {
        ...state,
        loading: false,
        foods: state.foods.map((food) =>
          food.id === action.payload.id ? action.payload : food
        ),
        success: "Availability updated successfully!",
      };
    case UPDATE_AVAILABILITY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Get All Foods
    case GET_ALL_FOODS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_FOODS_SUCCESS:
      return { ...state, loading: false, foods: action.payload };
    case GET_ALL_FOODS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Get Food by ID
    case GET_FOOD_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_FOOD_BY_ID_SUCCESS:
      return { ...state, loading: false, food: action.payload };
    case GET_FOOD_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
