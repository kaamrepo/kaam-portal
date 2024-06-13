import API from "../common/API";
import { create } from "zustand";
import { LOGIN_USER, REGISTER_USER, GET_OTP } from "../common/endpoint";
import { LoginResponse, LoginType } from "../types/login.types";

interface RegisterPayload {
  dialcode: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface OtpPayload {
  dialcode: string;
  phone: string;
}

export const useLoginStore = create<LoginType>((set) => ({
  isAuthenticated: false,
  user: {},
  token: null,
  loaderState: false,

  // Set loader state
  setLoaderState: (status) => set(() => ({ loaderState: status })),

  // Set token and authentication state
  setToken: (token) =>
    set((state) => ({ ...state, token, isAuthenticated: !!token })),

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
        set(() => ({
          token: response.data.accessToken,
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

  // Logout user
  logout: async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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

  // Verify OTP
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
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        set(() => ({
          user: response?.data?.user,
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
}));

export default useLoginStore;
