import API from "../common/API";
import { create } from "zustand";
import { LOGIN_USER, REGISTER_USER, GET_OTP, USER } from "../common/endpoint";
import { LoginResponse, LoginType } from "../types/login.types";
import Cookies from "js-cookie";
interface OtpPayload {
  dialcode: string;
  phone: string;
}

export const useLoginStore = create<LoginType>((set) => ({
  isAuthenticated: false,
  user: {},
  token: null,
  loaderState: false,
  loggedInUserId: "",
  // Set loader state
  setLoaderState: (status) => set(() => ({ loaderState: status })),

  setToken: (token) => {
    Cookies.set("token", token);
    set((state) => ({ ...state, token, isAuthenticated: !!token }));
  },

  // Register user
  registerUser: async (payload: any) => {
    try {
      const response = await API.post(REGISTER_USER, payload);
      if (response?.data?._id) {
        return {
          data: response,
          status: true,
        };
      } else {
        return {
          data: {},
          status: false,
        };
      }
    } catch (error: any) {
      console.log("Error in registering user:", error?.response?.data?.message);
      return {
        data: error?.response?.data?.message || "Registration failed",
        status: false,
      };
    }
  },

  // Get OTP
  getOtp: async (payload: OtpPayload) => {
    try {
      const response = await API.patch(GET_OTP, payload);
      if (response?.data?._id) {
        const accessToken = response.data.accessToken;
        Cookies.set("token", accessToken);
        set(() => ({
          token: accessToken,
          isAuthenticated: true,
        }));
        return {
          data: response?.data,
          status: true,
        };
      } else {
        return {
          data: {},
          status: false,
        };
      }
    } catch (error: any) {
      console.log("Error in getting OTP:", error?.response?.data?.message);
      return {
        data: error?.response?.data?.message || "Failed to get OTP",
        status: false,
      };
    }
  },


  logout: async () => {
    try {
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("loggedInUserId");
      set(() => ({
        user: {},
        isAuthenticated: false,
      }));
      return {
        data: {},
        status: true,
      };
    } catch (error: any) {
      console.log("Error in logging out:", error?.message);
      return {
        data: {},
        status: false,
      };
    }
  },

  verifyOtp: async (phone: string, otp: string) => {
    try {
      const data = {
        phone,
        otp,
        date: new Date(),
        strategy: "local",
      };
      const response: LoginResponse = await API.post(LOGIN_USER, data);
      if (response?.data?.accessToken) {
        Cookies.set("token", response.data.accessToken);
        Cookies.set("user", JSON.stringify(response.data.user));
        Cookies.set("loggedInUserId", response?.data?.user?._id);
        set(() => ({
          loggedInUserId: response?.data?.user?._id,
          isAuthenticated: true,
        }));
        return {
          data: response?.data,
          status: true,
        };
      } else {
        return {
          data: {},
          status: false,
        };
      }
    } catch (error: any) {
      console.log("Error in verifying OTP:", error?.response?.data?.message);
      return {
        data: error?.response?.data?.message || "Failed to verify OTP",
        status: false,
      };
    }
  },
  getUserDetails: async (userId: string) => {
    const response = await API.get(`${USER}/${userId}`);
    set(() => ({
      user: response?.data,
      isAuthenticated: true,
    }));
  },
}));

export default useLoginStore;
