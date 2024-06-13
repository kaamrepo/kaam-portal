import API from "../common/API";
import { create } from "zustand";
import { USER } from "../common/endpoint";
import {
  UserStore,
  UserPayload,
  UserData,
  getUserPayload,
} from "../types/user.types";

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  totalCount: 0,
  getUser: async (payload: getUserPayload) => {
    const query: any = {};
    if (payload.skip) {
      query["skip"] = payload.skip;
    }
    if (payload.limit) {
      query["limit"] = payload.limit;
    }
    if (payload.searchOn && payload.searchOn.isActive) {
      query["isActive"] = payload.searchOn.isActive;
    }
    if (payload.searchOn && payload.searchOn.paginate === false) {
      query["paginate"] = false;
    }
    if (payload.searchOn && payload.searchOn.wildString) {
      query["wildString"] = payload.searchOn.wildString;
    }
    if (payload.searchOn && payload.searchOn.excludeIds) {
      query["excludeIds"] = payload.searchOn.excludeIds;
    }
    console.log("query", query);
    try {
      const response = await API.get(`${USER}`, {
        params: query,
      });
      if (response?.data?.data?.length) {
        set(() => ({
          users:
            payload.searchOn && payload.searchOn.paginate === false
              ? response.data
              : response.data.data,
          totalCount:
            payload.searchOn && payload.searchOn.paginate === false
              ? 0
              : response.data.total,
        }));
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
  patchUser: async (payload: UserPayload) => {
    console.log("payload in patchuser", payload);

    let data: Partial<UserData> = {
      address: {},
    };

    if (payload?._id) data._id = payload._id;
    if (payload?.phone) data.phone = payload.phone;
    if (payload?.lastname) data.lastname = payload.lastname;
    if (payload?.firstname) data.firstname = payload.firstname;
    if (payload?.dialcode) data.dialcode = payload.dialcode;
    if (payload?.activeforjobs) data.activeforjobs = payload.activeforjobs;
    if (payload?.isactive) data.isactive = payload.isactive;
    if (payload?.createdat) data.createdat = payload.createdat;
    if (payload?.updatedat) data.updatedat = payload.updatedat;
    if (payload?.firebasetokens) data.firebasetokens = payload.firebasetokens;
    if (payload?.coordinates) data.coordinates = payload.coordinates;
    if (payload?.otpexpiresat) data.otpexpiresat = payload.otpexpiresat;
    if (payload?.isActiveforJobs) data.activeforjobs = payload.isActiveforJobs;
    // if (payload?.role) data.role = payload.role;
    if (payload?.dob) data.dateofbirth = new Date(payload.dob);
    if (payload?.address) {
      data.address = {
        addressline: payload.address,
        pincode: payload.pincode,
        district: payload.district,
        state: payload.state,
        country: payload.country,
        city: payload.city,
      };
    }
    // if (payload?.gender) data.gender = payload.gender;
    if (payload?.aboutMe) data.aboutme = payload.aboutMe;
    if (payload?.categories?.length) data.tags = payload.categories;

    try {
      const response = await API.patch(`${USER}/${payload._id}`, data);

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
