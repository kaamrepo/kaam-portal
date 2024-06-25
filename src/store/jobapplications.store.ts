import API from '../common/API';
import { create } from 'zustand';
import { JOB_APPLICATION } from '../common/endpoint';
import { JobApplicationsState, GetJobApplicationsPayload} from '../types/jobApplications.types';

export const useJobApplications = create<JobApplicationsState>((set) => ({
  jobapplications: [],

  getJobApplications: async (payload: GetJobApplicationsPayload): Promise<any> => {
    const query: any = {};
    if (payload.limit) {
      query["limit"] = payload.limit;
    }
    if (payload.skip) {
      query["skip"] = payload.skip;
    }
    if (payload.appliedby) {
      query["appliedby"] = payload.appliedby;
    }
    if (payload.employerid) {
      query["appliedby"] = payload.employerid;
    }

    try {
      const response = await API.get(JOB_APPLICATION, { params: query });
      if (response?.data?.data) {
        set(() => ({
          jobapplications: response.data.data,
        }));
        return {
          data: response.data.data,
          status: true,
        };
      }else{
        set(() => ({
          jobapplications: [],
        }));
      }
    } catch (error) {
      return {
        data: [],
        status: false,
      };
    }
  },
}));

export default useJobApplications;
