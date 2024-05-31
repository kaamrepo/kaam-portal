import API from '../common/API';
import { create } from 'zustand';
import { LOGIN_USER, GET_OTP } from '../common/endpoint';
import { LoginResponse,LoginType } from '../types/login.types';

export const useLoginStore = create<LoginType>((set) => ({
  isAuthenticated: false,
  token: null,
  loaderState: false,
  setLoaderState: (status) => set(() => ({ loaderState: status })),
  setToken: (token) =>
    set((state) => ({ ...state, token, isAuthenticated: !!token })),
  getOtp: async (payload) => {
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
    } catch (error) {
      return {
        data: {},
        status: false,
      };
    }
  },
  verifyOtp: async (phone, otp) => {
    try {
      let data = {
        phone,
        otp,
        data: new Date(),
        strategy: 'local',
      };
      const response: LoginResponse = await API.post(LOGIN_USER, data);
      if (response?.data?.accessToken) {
        sessionStorage.setItem('token', response.data.accessToken);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        
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
    } catch (error) {
      return {
        data: {},
        status: false,
      };
    }
  },
}));

export default useLoginStore;
