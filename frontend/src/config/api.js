import axios from "axios"

export const API_URL = "http://localhost:8080/api/v1"; // Địa chỉ API của bạn

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json" 
   },
});