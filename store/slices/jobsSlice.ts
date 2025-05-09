import { JobListing } from "@/types/jobListing";
import { createSlice } from "@reduxjs/toolkit";

const initialState: JobListing[] = [];

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    saveJobs: (_, { payload }) => {
      return payload;
    },
  },
});

export const { saveJobs } = jobsSlice.actions;
