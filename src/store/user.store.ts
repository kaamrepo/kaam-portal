import API from "../common/API";
import { create } from "zustand";
import { GET_ROLES, ONBOARDSTAFF, USER } from "../common/endpoint";
import { UserStore, getUserPayload, User } from "../types/user.types";

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  roles: [],
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
  patchUser: async (payload: User) => {
    try {
      const response = await API.patch(`${USER}/${payload._id}`, payload);
      if (
        response?.data?._id &&
        (response.status == 200 || response.status == 201)
      ) {
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
  createStaffUser: async (payload: User) => {
    try {
      const response = await API.post(`${ONBOARDSTAFF}`, payload);
      if (
        response?.data?._id &&
        (response.status == 200 || response.status == 201)
      ) {
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
      throw error;
    }
  },
  listOfroles: async (payload: getUserPayload) => {
    const query: any = {};
    try {
      if (payload.searchOn && payload.searchOn.paginate === false) {
        query["paginate"] = false;
      }
      query["select"] = ["_id", "roleName", "roleId", "isActive"];
      const response = await API.get(`${GET_ROLES}`, {
        params: query,
      });
      if (response?.data?.length) {
        set(() => ({
          roles: response.data,
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
}));

export default useUserStore;
