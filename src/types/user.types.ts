export interface UserPayload {
  otpexpiresat: any;
  _id: any;
  email?: string;
  isActive?: boolean;
  role?: string;
  dob?: string;
  address?: Address;
  pinCode?: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  gender?: string;
  aboutMe?: string;
  categories?: string[];
  phone: string;
  isActiveforJobs: boolean;
}

export interface getUserPayload {
  skip?: number;
  limit?: number;
  searchOn?: {
    isActive?: boolean;
    wildString?: string;
    paginate?: boolean;
    excludeIds?: string;
  };
}

export interface UserData {
  _id: string;
  email?: string;
  activeforjobs?: boolean;
  role?: string;
  dob?: string;
  address?: Address;
  gender?: string;
  aboutme?: string;
  tags?: string[];
}

export interface UserStore {
  users: UserData[];
  patchUser: (payload: User) => Promise<{
    data: UserData | [];
    status: boolean;
  }>;
  totalCount: number;
  getUser: (payload: getUserPayload) => Promise<{
    data: UserData | [];
    status: boolean;
  }>;
}

interface Address {
  addressline?: string;
  pincode?: string;
  district?: string;
  city?: string;
  state?: string;
  country?: string;
}

interface Location {
  type: string;
  coordinates: (number | null)[];
  fulladdress?: string;
  pincode?: string;
  district?: string;
  city?: string;
  state?: string;
  country?: string;
}

interface Experience {
  about: string;
  employer?: string;
  year: string;
}

export interface User {
  _id?: any;
  phone: string;
  dialcode: string;
  firstname: string;
  lastname: string;
  email: string;
  otp?: string;
  otpexpiresat: string;
  createdat: string;
  updatedat: string;
  isactive: boolean;
  aboutme?: string;
  dateofbirth: string;
  address?: Address;
  location?: Location;
  firebasetokens?: string[];
  profilepic?: string;
  activeforjobs?: boolean;
  allowedjobposting?: number;
  allowedjobapplication?: number;
  tags?: [];
  experience?: Experience[];
}
