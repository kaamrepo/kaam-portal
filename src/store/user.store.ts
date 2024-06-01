import API from '../common/API';
import { create } from 'zustand';
import { USER } from '../common/endpoint';
import { UserStore, UserPayload, UserData } from '../types/user.types';

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  patchUser: async (payload: UserPayload) => {
    let data: Partial<UserData> = {
      address: {},
    };

    if (payload?.email) data.email = payload.email;
    if (payload?.isActive) data.activeforjobs = payload.isActive;
    // if (payload?.role) data.role = payload.role;
    if (payload?.dob) data.dateofbirth = new Date(payload.dob);
    if (payload?.address) {
      data.address = {
        addressline: payload.address,
        pincode: payload.pinCode,
        district: payload.district,
        state: payload.state,
        country: payload.country,
        city: payload.city,
      };
    }
    // if (payload?.gender) data.gender = payload.gender;
    if (payload?.aboutMe) data.aboutme = payload.aboutMe;
    if (payload?.categories?.length) data.tags = payload.categories;
    console.log('params before sending', data);
    console.log(USER, 'USER');
    console.log(payload.phone, 'payload.phone');

    try {
      const response = await API.patch(`${USER}/${payload._id}`, data);      
    console.log("response?.data?.data?._id",response?.data?._id);
    
      if (response?.data?._id) {
        console.log("om tje if");
        
        return {
          data: response.data,
          status: true,
        };
      } else {
        return {
          data: [],
          status: false,
        };
      }
    } catch (error) {
      return {
        data: [],
        status: false,
      };
    }
  },
}));

export default useUserStore;