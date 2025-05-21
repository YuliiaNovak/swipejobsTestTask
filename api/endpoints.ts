export const endpoints = {
  getProfileData: (workerId: string) => `/worker/${workerId}/profile`,
  worker: {
    showMatchedJobs: (workerId: string) => `/worker/${workerId}/matches`,
    acceptJob: (workerId: string, jobid: string) =>
      `/worker/${workerId}/job/${jobid}/accept`,
    rejectJob: (workerId: string, jobid: string) =>
      `/worker/${workerId}/job/${jobid}/reject`,
  },
};
