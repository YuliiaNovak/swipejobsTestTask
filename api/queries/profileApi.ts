import { ProfileData } from "@/types/profile";
import { endpoints } from "../endpoints";
import { baseApi } from "./base";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileData: build.query<ProfileData, string>({
      query: (workerId) => endpoints.getProfileData(workerId),
    }),
  }),
  overrideExisting: true,
});

export const { useGetProfileDataQuery } = profileApi;
