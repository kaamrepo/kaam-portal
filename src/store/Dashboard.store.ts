import API from '../common/API';
import { create } from 'zustand';
import { USER } from '../common/endpoint';
import { DashboardStore } from '../types/dashboard.types';
export const useDashboardStore = create<DashboardStore>((set) => ({
  totaluser: 0,
  totalPostedJobs: 0,
  totalAppliedJobs: 0,
  totalEngagements:0,

  getCounts: async () => {
    try {
      const userResponse = await API.get(USER,{params:{analytics:"analyticstest"}});
    //   if (userResponse?.data?.data) {
    //     set(() => ({
    //         totaluser: userResponse.data,
          
    //     }));
    // }
    console.log("userResponse",userResponse);
    
    } catch (error) {
      return {
        data: {},
        status: false,
      };
    }
  },

}));

export default useDashboardStore;
