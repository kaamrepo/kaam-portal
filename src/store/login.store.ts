import API from '../common/API';
import {create} from 'zustand';
import { LOGIN_USER,GET_OTP } from '../common/endpoint';
console.log("API",API);
console.log("LOGIN_USER",LOGIN_USER);

interface State {
  loaderState: boolean;
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string) => void;
  setLoaderState: (status: boolean) => void;
  getOtp: (payload: {}) => void;
}

export const useLoginStore = create<State>((set) => ({
  isAuthenticated: false,
  token: null,
  loaderState:false,
  setLoaderState: (status) =>
    set(() => ({loaderState:status})),
  setToken: (token) =>
    set((state) => ({...state, token, isAuthenticated:!!token })),
  getOtp: (payload) =>{
    console.log("payload",payload);
  }
    // set((state) => ({...state, token, isAuthenticated:!!token })),
}));


export default useLoginStore;