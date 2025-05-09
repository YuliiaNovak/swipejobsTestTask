import {
  ActionErrorResponse,
  ActionParams,
  ActionSuccessResponse,
} from "@/types/api";
import { JobListing } from "@/types/jobListing";
import { endpoints } from "../endpoints";
import { baseApi } from "./base";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getJobListings: build.query<JobListing[], string>({
      query: (workerId) => endpoints.worker.showMatchedJobs(workerId),
    }),
    acceptJob: build.query<ActionErrorResponse | ActionSuccessResponse, ActionParams>({
      query: ({ workerId, jobId }) =>
        endpoints.worker.acceptJob(workerId, jobId),
    }),
    rejectJob: build.query<ActionErrorResponse | ActionSuccessResponse, ActionParams>({
      query: ({ workerId, jobId }) =>
        endpoints.worker.rejectJob(workerId, jobId),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetJobListingsQuery,
  useLazyAcceptJobQuery,
  useLazyRejectJobQuery,
} = jobsApi;
