// jobApplications.types.ts

export interface JobApplication {
    id: number;
    position: string;
    company: string;
    appliedDate: string;
    status: string;
    // Add more fields as necessary
  }
  
  export interface GetJobApplicationsPayload {
    limit?: number;
    skip?: number;
    _id?:string
  }
  
  export interface JobApplicationsState {
    jobapplications: JobApplication[];
    getJobApplications: (payload: GetJobApplicationsPayload) => Promise<GetJobApplicationsResponse | undefined>;
    clearJobApplications: any;
  }
  
  export interface GetJobApplicationsResponse {
    data: JobApplication[];
    status: boolean;
  }
  