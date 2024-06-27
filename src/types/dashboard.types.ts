export interface DashboardStoreState {
    totaluser: number;
    totalPostedJobs: number;
    totalAppliedJobs: number;
    totalEngagements: number;
    locationData:any
  }
  
  export interface DashboardStore extends DashboardStoreState {
    getCounts: () => void;
    getLocationStats: () => void;
  }