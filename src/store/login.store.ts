import API from '../common/API';
import { create } from 'zustand';
import { LOGIN_USER, GET_OTP } from '../common/endpoint';
console.log('API', API);
console.log('LOGIN_USER', LOGIN_USER);

interface State {
  loaderState: boolean;
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string) => void;
  setLoaderState: (status: boolean) => void;
  getOtp: (payload: {}) => void;
  verifyOtp: (paylaod: {}) => void;
}

export const useLoginStore = create<State>((set) => ({
  isAuthenticated: false,
  token: null,
  loaderState: false,
  setLoaderState: (status) => set(() => ({ loaderState: status })),
  setToken: (token) =>
    set((state) => ({ ...state, token, isAuthenticated: !!token })),
  getOtp: async (payload) => {
    try {
      const response = await API.patch(GET_OTP, payload);
      console.log('API redeponse', response);

      if (response?.data?._id) {
        return {
          data: response?.data,
          status: true,
        };
      } else {
      }
    } catch (error) {
      return {
        data: {},
        status: false,
      };
    }
  },
  verifyOtp: (payload) => {
    console.log('payload in veriffyOTP', payload);
  },
  // set((state) => ({...state, token, isAuthenticated:!!token })),
}));

export default useLoginStore;
