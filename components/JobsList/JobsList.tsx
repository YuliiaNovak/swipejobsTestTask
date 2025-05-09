import { useGetJobListingsQuery } from "@/api/queries/jobsApi";
import { secondsBeforeAutoScroll } from "@/common/constants/TimeoutData";
import { USER_ID } from "@/common/constants/User";
import { commonStyles } from "@/common/styles/styles";
import { saveJobs } from "@/store/slices/jobsSlice";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import PagerView from "react-native-pager-view";
import { useDispatch } from "react-redux";
import { JobDetailsCard } from "../JobDetailsCard/JobDetailsCard";

export const JobsList = () => {
  const pagerRef = useRef<PagerView>(null);
  const dispatch = useDispatch();

  const {
    data: jobListings,
    error,
    isLoading,
  } = useGetJobListingsQuery(USER_ID);

  const swipeToNextJob = () => {
    pagerRef.current?.setPage(1);
  };

  useEffect(() => {
    if (!jobListings) return;

    dispatch(saveJobs(jobListings));

    const timer = setTimeout(() => {
      if (jobListings?.length > 1) {
        swipeToNextJob();
      }
    }, secondsBeforeAutoScroll);

    return () => clearTimeout(timer);
  }, [jobListings]);

  if (isLoading) {
    return <ActivityIndicator size="large" accessibilityLabel="Loading" />;
  }

  if (error) {
    return (
      <Text style={commonStyles.errorText}>
        Couldn't fetch jobs. Please try again.
      </Text>
    );
  }

  return (
    <>
      {jobListings?.length ? (
        <Text style={styles.title}>Job Listings</Text>
      ) : null}
      <PagerView
        style={commonStyles.container}
        initialPage={0}
        scrollEnabled
        ref={pagerRef}
      >
        {jobListings?.length ? (
          jobListings.map(
            ({
              jobId,
              jobTitle,
              company,
              milesToTravel,
              wagePerHourInCents,
            }) => (
              <JobDetailsCard
                key={jobId}
                jobId={jobId}
                jobTitle={jobTitle}
                company={company}
                milesToTravel={milesToTravel}
                wagePerHourInCents={wagePerHourInCents}
              />
            )
          )
        ) : (
          <Text style={commonStyles.errorText}>No jobs found.</Text>
        )}
      </PagerView>
    </>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 600, textAlign: "center" },
});
