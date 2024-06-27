import API from '../common/API';
import { create } from 'zustand';
import { APPROVAL } from '../common/endpoint';
export const useApprovalStore = create<any>((set) => ({
  approvals: [],
  totalCount:0,
  getApprovals: async () => {
    try {
      const aprovalResponse = await API.get(APPROVAL);
      console.log("aprovalResponse",aprovalResponse);
      
      if (aprovalResponse?.data?.data) {
        set(() => ({
            approvals: aprovalResponse.data?.data,
            totalCount:aprovalResponse?.data?.total
          
        }));
        return{
          data:aprovalResponse?.data?.data ,
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
