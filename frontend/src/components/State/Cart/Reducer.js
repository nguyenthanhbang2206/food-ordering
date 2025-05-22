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
  PLACE_ORDER_FAILURE,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_REQUEST,
  GET_ORDER_BY_USER_LOGIN_REQUEST,
  GET_ORDER_BY_USER_LOGIN_SUCCESS,
  GET_ORDER_BY_USER_LOGIN_FAILURE,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_REQUEST,
} from "./ActionType";

const initialState = {
  cartItems: [], // Danh sách các sản phẩm trong giỏ hàng
  loading: false, // Trạng thái loading
  orders: [],
  order: null, // Thông tin đơn hàng
  error: null, // Thông báo lỗi
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
     case GET_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload, // Lưu chi tiết đơn hàng vào state
      };
    case GET_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ORDER_BY_USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_BY_USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload, // Lưu danh sách đơn hàng vào state
      };
    case GET_ORDER_BY_USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // Lấy danh sách sản phẩm trong giỏ hàng
    case GET_ALL_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ALL_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };
    case GET_ALL_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Thêm sản phẩm vào giỏ hàng
    case ADD_CART_ITEM_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_CART_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [...state.cartItems, action.payload],
      };
    case ADD_CART_ITEM_TO_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    case UPDATE_QUANTITY_OF_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_QUANTITY_OF_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ), // Cập nhật cartItem trong danh sách
      };
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload, // Lưu thông tin đơn hàng
      };
    case PLACE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Lưu thông báo lỗi
      };

    case UPDATE_QUANTITY_OF_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Xóa sản phẩm khỏi giỏ hàng
    case DELETE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case DELETE_CART_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Xóa toàn bộ giỏ hàng
    case DELETE_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [],
      };
    case DELETE_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_CART_BY_USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CART_BY_USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload, // Lưu thông tin giỏ hàng
      };
    case GET_CART_BY_USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
