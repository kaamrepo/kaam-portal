export interface Address {
  addressline?: string;
  pincode?: string;
  district?: string;
  state?: string;
  country?: string;
  city?: string;
}

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
  patchUser: (payload: UserPayload) => Promise<{
    data: UserData | [];
    status: boolean;
  }>;
  totalCount: number;
  getUser: (payload: getUserPayload) => Promise<{
    data: UserData | [];
    status: boolean;
  }>;
}
