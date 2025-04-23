import { ADD_TO_FAVORITE, ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_SUCCESS, GET_USER_PROFILE_REQUEST, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import {isPresentInFavorites} from "../../../utils/logic";
const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
  favorites: [],
  success: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
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
  
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          token: action.payload,  // lưu jwt
          error: null,
          success: "Success",
        };
  
      case ADD_TO_FAVORITE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          error: null,
          success: null,
          favorites: isPresentInFavorites( state.favorites, action.payload) ? state.favorites.filter(item => item.id !== action.payload.id) : [ action.payload, ...state.favorites], // thêm hoặc xóa món ăn khỏi danh sách yêu thích
       };
       case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            case ADD_TO_FAVORITE_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload,
                    success: null,
                };
      default:
        return state;
    }
  };
  
  export default authReducer