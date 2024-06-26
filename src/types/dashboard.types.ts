export interface DashboardStoreState {
    totaluser: number;
    totalPostedJobs: number;
    totalAppliedJobs: number;
    totalEngagements: number;
  }
  
  export interface DashboardStore extends DashboardStoreState {
    getCounts: () => void;
  }