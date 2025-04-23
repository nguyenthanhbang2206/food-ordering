import axios from "axios";
import { 
    GET_USER_PROFILE_SUCCESS, 
    GET_USER_PROFILE_REQUEST, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAILURE, 
    ADD_TO_FAVORITE, 
    LOGOUT,
    LOGIN_FAILURE,
    GET_USER_PROFILE_FAILURE
} from "./ActionType";

import { API_URL } from "../../../../config/API_URL";
import { api } from "../../../config/api";
export const registerUser = (request) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const {data} = await api.post(`/auth/register`, request.userData);
        if(data.jwt){
            localStorage.setItem("token", data.jwt); // Lưu token vào localStorage
        }
        if(data.role === "ROLE_RESTAURANT_OWNER"){
            request.navigate("/admin/restaurant");
        }else{
            request.navigate("/");
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error});
        console.log("error", error);
    }
}
export const login = (request) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const {data} = await axios.post(`/auth/login`, request.userData);
        if(data.jwt){
            localStorage.setItem("token", data.jwt); // Lưu token vào localStorage
        }
        if(data.role === "ROLE_RESTAURANT_OWNER"){
            request.navigate("/admin/restaurant");
        }else{
            request.navigate("/");
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error});
        console.log("error", error);
    }
}
export const getProfile = (token) => async (dispatch) => {
    dispatch({ type: GET_USER_PROFILE_REQUEST });
    try {
        const {data} = await api.get("/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data.jwt });
    } catch (error) {
        dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error});
        console.log("error", error);
    }
}
export const addToFavorites = ({token, restaurantId}) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE });
    try {
        const {data} = await api.post(`/restaurants/${restaurantId}/favourites`, {} ,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: GET_USER_PROFILE_FAILURE, payload: error});
        console.log("error", error);
    }
}


export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT });
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT});
    } catch (error) {
        console.log("error", error);
    }
}