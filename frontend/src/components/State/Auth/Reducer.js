import {
  ADD_TO_FAVORITE,
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_SUCCESS,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import { isPresentInFavorites } from "../../../utils/logic";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
  favorites: [],
  success: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Xử lý các yêu cầu
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_USER_PROFILE_REQUEST:
    case ADD_TO_FAVORITE:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    // Đăng ký thành công
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: "Đăng ký thành công! Vui lòng đăng nhập.",
      };

    // Đăng nhập thành công
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload, // Lưu token
        user: JSON.parse(localStorage.getItem("user")), // Lấy thông tin người dùng từ localStorage
        success: "Đăng nhập thành công!",
      };

    // Lấy thông tin người dùng thành công
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload, // Lưu thông tin người dùng
        success: "Thông tin người dùng đã được tải thành công!",
      };

    // Thêm hoặc xóa món ăn yêu thích thành công
    case ADD_TO_FAVORITE_SUCCESS:
      const isFavorite = isPresentInFavorites(state.favorites, action.payload);
      return {
        ...state,
        isLoading: false,
        error: null,
        success: isFavorite
          ? "Đã xóa khỏi danh sách yêu thích!"
          : "Đã thêm vào danh sách yêu thích!",
        favorites: isFavorite
          ? state.favorites.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favorites],
      };

    // Đăng xuất
    case LOGOUT:
      return {
        ...initialState,
      };

    // Xử lý lỗi
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_PROFILE_FAILURE:
    case ADD_TO_FAVORITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload, // Lưu thông báo lỗi
        success: null,
      };

    default:
      return state;
  }
};

export default authReducer;