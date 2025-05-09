import { baseApi } from "@/api/queries/base";
import { profileApi } from "@/api/queries/profileApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { jobsSlice } from "./slices/jobsSlice";

const rootReducer = combineReducers({
  jobs: jobsSlice.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gDM) => gDM().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
