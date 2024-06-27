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
  getCounts: async () => {
    try {
      const countStats = await API.get(ANALYTICS, {
        params: { analyticscount: true },
      });
      if (Object.keys(countStats?.data)?.length !== 0) {
        console.log("in the if ", countStats.data);

        set(() => ({
          totaluser: countStats?.data?.totalusercount,
          totalPostedJobs: countStats?.data?.totaljobcount,
          totalAppliedJobs: countStats?.data?.totaljobapplicationscount,
          totalEngagements: countStats?.data?.engagementcount,
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
        status: false,
      };
    } catch (error) {}
  },
}));

export default useDashboardStore;
