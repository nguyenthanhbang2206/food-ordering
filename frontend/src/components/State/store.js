import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./authReducer";
const rootReducer = combineReducers({
    auth: authReducer,
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));