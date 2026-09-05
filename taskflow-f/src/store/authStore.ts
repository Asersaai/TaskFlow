import { create } from "zustand";

type AuthStore = {
    token: string | null;
    setToken: (token: string) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    token: localStorage.getItem("accessToken"),
    setToken: (token) => {
        localStorage.setItem("accessToken", token);
        set({ token });
    },
    logout:() => {
        set({token:null});
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");}
}));