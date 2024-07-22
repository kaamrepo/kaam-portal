import API from "../common/API";
import { create } from "zustand";
import { ANALYTICS } from "../common/endpoint";
import { DashboardStore } from "../types/dashboard.types";
export const useDashboardStore = create<DashboardStore>((set) => ({
  totaluser: 0,
  totalPostedJobs: 0,
  totalAppliedJobs: 0,
  totalEngagements: 0,
  locationData: {},
  userBifercation: [],
  getCounts: async () => {
    try {
      const countStats = await API.get(ANALYTICS, {
        params: { analyticscount: true },
      });
      if (Object.keys(countStats?.data)?.length !== 0) {
        set(() => ({
          totaluser: countStats?.data?.totalusercount ?? 0,
          totalPostedJobs: countStats?.data?.totaljobcount ?? 0,
          totalAppliedJobs: countStats?.data?.totaljobapplicationscount ?? 0,
          totalEngagements: countStats?.data?.engagementcount ?? 0,
        }));
      }
      return {
        data: countStats?.data,
        status: false,
      };
    } catch (error) {
      return {
        data: {},
        status: false,
      };
    }
  },
  getLocationStats: async () => {
    try {
      const locationStats = await API.get(ANALYTICS, {
        params: { locationanalytics: true },
      });
      if (Object.keys(locationStats?.data)?.length !== 0) {
        set(() => ({
          locationData: locationStats?.data,
        }));
      }
      return {
        data: locationStats?.data,
        status: true,
      };
    } catch (error) {}
  },
  getUserBifercationStats: async () => {
    try {
      const userBifercationStats = await API.get(ANALYTICS, {
        params: { userbifercationanalytics: true },
      });
      if (Object.keys(userBifercationStats?.data)?.length !== 0) {
        set(() => ({
          userBifercation: userBifercationStats?.data,
        }));
      }
      return {
        data: userBifercationStats,
        status: false,
      };
    } catch (error) {}
  },
}));

export default useDashboardStore;
