import API from '../common/API';
import { create } from 'zustand';
import { LOGIN_USER, REGISTER_USER, GET_OTP } from '../common/endpoint';
import { LoginResponse, LoginType } from '../types/login.types';

export const useLoginStore = create<LoginType>((set) => ({
  isAuthenticated: false,
  token: null,
  loaderState: false,
  setLoaderState: (status) => set(() => ({ loaderState: status })),
  setToken: (token) =>
    set((state) => ({ ...state, token, isAuthenticated: !!token })),
  registerUser: async (payload) => {
    console.log('payload to register user', payload);
    const params: any = {};
    params.dialcode = payload.dialcode;
    params.firstname = payload.firstName;
    params.lastname = payload.lastName;
    params.phone = payload.phone;
    try {
      const response = await API.post(REGISTER_USER, params);
      console.log('response to register user', response);

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
    } catch (error) {
      console.log('error in registering user', error.response.data.message);

      return {
        data: error?.response?.data?.message,
        status: false,
      };
    }
  },
  getOtp: async (payload) => {
    try {
      const response = await API.patch(GET_OTP, payload);
      console.log('response on login', response);

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
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));

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
