import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";
import {restaurantReducer} from "./Restaurant/Reducer";
import cartReducer from "./Cart/Reducer";
const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  cart: cartReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
