export interface Address {
    addressline?: string;
    pincode?: string;
    district?: string;
    state?: string;
    country?: string;
    city?: string;
  }
  
  export interface UserPayload {
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
    phone:string
  }
  
  export interface getUserPayload {
    type: string;
    skip?: string;
    limit?: boolean;
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
    getUser: (payload: UserPayload) => Promise<{
      data: UserData | [];
      status: boolean;
    }>;
  }
  