import axios from "axios";
import { useAuthStore } from "../store/authStore";



export const api = axios.create({
    baseURL: "http://localhost:8080/api",
});
export const publicApi = axios.create({
    baseURL:"http://localhost:8080/api"
})

api.interceptors.request.use((config)=> {
    const token=useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                useAuthStore.getState().logout();
                return Promise.reject(error);
            }
            try {
                const response = await publicApi.post("/refresh", {
                    refreshToken
                });

                const {
                    accessToken,
                    refreshToken: newRefreshToken
                } = response.data;

                useAuthStore.getState().setToken(accessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }return Promise.reject(error);}
);