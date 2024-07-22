export interface LoginType {
  user: Partial<User>;
  feScopes: string[];
  loggedInUserId: string;
  loaderState: boolean;
  isAuthenticated: boolean;
  token: string | null;
  setToken: (token: string) => void;
  setLoaderState: (status: boolean) => void;
  getOtp: (payload: { dialcode: string; phone: string }) => void;
  logout: () => void;
  loginWithEmail: (payload: EmailPasswordPayload) => void;
  verifyOtp: (phone: string, otp: string) => void;
  registerUser: (payload: any) => void;
  getUserDetails: (userid: string) => void;
  getAuthDetails: () => void;
}

export interface EmailPasswordPayload {
  email: string;
  password: string;
}
export interface OtpResponse {
  data: {
    _id?: string;
  };
  status: boolean;
}
export interface VerifyOtpPayload {
  phone: string;
  otp: string;
}
export interface LoginResponse {
  data: {
    accessToken: string;
    authentication: {
      strategy: string;
      payload: {
        iat: number;
        aud: string;
        sub: string;
        jti: string;
      };
    };
    user: User;
  };
}

interface User {
  _id: string;
  phone: string;
  lastname: string;
  firstname: string;
  dialcode: string;
  activeforjobs: boolean;
  isactive: boolean;
  createdat: string;
  updatedat: string;
  firebasetokens: string[];
  coordinates: [number, number];
  address: Address;
  aboutme: string;
  tags: string[];
  otpexpiresat: string;
  profilepic?: string;
}
// Define interface for the user's address
interface Address {
  addressline: string;
  pincode: string;
  district: string;
  state: string;
  country: string;
  city: string;
}
