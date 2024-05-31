import API from '../common/API';
import { create } from 'zustand';
import { USER,JOB,JOB_APPLICATION } from '../common/endpoint';
import { DashboardStore } from '../types/dashboard.types';
export const dashboardStore = create<DashboardStore>((set) => ({
  totaluser: 0,
  totalPostedJobs: 0,
  totalAppliedJobs: 0,
  totalEngagements:0,

  getCounts: async () => {
    try {
      const userResponse = await API.get(USER);
      if (response?.data?.data) {
        set(() => ({
            totaluser: response.data.accessToken,
          
        }));
    }
    } catch (error) {
      return {
        data: {},
        status: false,
      };
    }
  },

}));

export default dashboardStore;
