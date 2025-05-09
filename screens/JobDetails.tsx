import {
  useLazyAcceptJobQuery,
  useLazyRejectJobQuery,
} from "@/api/queries/jobsApi";
import { Colors } from "@/common/constants/Colors";
import { USER_ID } from "@/common/constants/User";
import { Branch } from "@/components/JobDetailsCard/Branch";
import { DistanceAndRate } from "@/components/JobDetailsCard/DistanceAndRate";
import { Location } from "@/components/JobDetailsCard/Location";
import { NameInfo } from "@/components/JobDetailsCard/NameInfo";
import { ReportTo } from "@/components/JobDetailsCard/ReportTo";
import { Requirements } from "@/components/JobDetailsCard/Requirements";
import { ShiftList } from "@/components/JobDetailsCard/ShiftList";
import { DoubleButton } from "@/components/reusable/DoubleButton/DoubleButton";
import { RootState } from "@/store/store";
import { useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export const JobDetails = () => {
  const { jobId } = useLocalSearchParams<{ jobId: string }>();

  const jobDetails = useSelector((state: RootState) => state.jobs).find(
    (job) => job.jobId === jobId
  );

  const [acceptJobTrigger, { isFetching: isAcceptFetching }] =
    useLazyAcceptJobQuery();
  const [rejectJobTrigger, { isFetching: isRejectFetching }] =
    useLazyRejectJobQuery();

  if (!jobDetails)
    return <Text>Failed to get job info. Please try again.</Text>;

  const {
    jobTitle,
    company,
    milesToTravel,
    wagePerHourInCents,
    shifts,
    requirements,
    branch,
    branchPhoneNumber,
  } = jobDetails;

  const rightButtonAction = async () => {
    try {
      const response = await acceptJobTrigger({
        workerId: USER_ID,
        jobId,
      }).unwrap();

      if (!response.success && "message" in response) {
        Alert.alert(response.message || "Something went wrong.");
        return;
      }

      Alert.alert(
        "The job is almost yours! Our manager will contact you soon."
      );
    } catch (e) {
      console.log("accept", e);

      Alert.alert("Action failed! Please try again.");
    }
  };

  const leftButtonAction = async () => {
    try {
      const response = await rejectJobTrigger({
        workerId: USER_ID,
        jobId,
      }).unwrap();

      if (!response.success && "message" in response) {
        Alert.alert(response.message || "Something went wrong.");
        return;
      }

      Alert.alert("The job was successfully rejected!");
    } catch (error) {
      console.log("reject", error);

      Alert.alert("Action failed! Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <NameInfo jobTitle={jobTitle.name} companyName={company.name} />
      <DistanceAndRate
        milesToTravel={milesToTravel}
        wagePerHourInCents={wagePerHourInCents}
      />
      <ShiftList shifts={shifts} />
      <Location
        address={company.address.formattedAddress}
        milesToTravel={milesToTravel}
      />
      <Requirements requirements={requirements} />
      <ReportTo reportTo={company.reportTo} />
      <Branch branch={branch} branchPhoneNumber={branchPhoneNumber} />
      <DoubleButton
        rightButtonText="I'll Take It"
        leftButtonText="No Thanks"
        rightButtonAction={rightButtonAction}
        leftButtonAction={leftButtonAction}
        isRightButtonActionLoading={isAcceptFetching}
        isLeftButtonActionLoading={isRejectFetching}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: Colors.white,
    flex: 1,
  },
});
