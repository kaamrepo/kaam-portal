import API from '../common/API';
import { create } from 'zustand';
import { APPROVAL } from '../common/endpoint';
export const useApprovalStore = create<any>((set) => ({
  approvals: 0,
  getApprovals: async () => {
    try {
      const aprovalResponse = await API.get(APPROVAL);
      if (aprovalResponse?.data?.data) {
        set(() => ({
            approvals: aprovalResponse.data,
          
        }));
        return{
          data:aprovalResponse?.data?.data  ,
          status: true,
        }
    }
    } catch (error) {
      return {
        data: {},
        status: false,
      };
    }
  },

}));

export default useApprovalStore;
