import { Colors } from "@/common/constants/Colors";
import { CompanyInfo, JobTitle } from "@/types/jobListing";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { DistanceAndRate } from "./DistanceAndRate";
import { Location } from "./Location";
import { NameInfo } from "./NameInfo";

interface Props {
  jobId: string;
  jobTitle: JobTitle;
  company: CompanyInfo;
  milesToTravel: number;
  wagePerHourInCents: number;
}

export const JobDetailsCard = ({
  jobId,
  jobTitle,
  company,
  milesToTravel,
  wagePerHourInCents,
}: Props) => {
  const router = useRouter();

  const redirectToJobDetails = (id: string) =>
    router.navigate(`/jobDetails/${id}`);

  return (
    <View style={styles.card} collapsable={false}>
      <Image
        style={styles.jobImg}
        source={{
          uri: jobTitle.imageUrl,
        }}
        resizeMode="contain"
      />
      <NameInfo jobTitle={jobTitle.name} companyName={company.name} />
      <DistanceAndRate
        milesToTravel={milesToTravel}
        wagePerHourInCents={wagePerHourInCents}
      />
      <Location
        address={company.address.formattedAddress}
        milesToTravel={milesToTravel}
      />
      <Pressable
        style={styles.detailsBtn}
        onPress={() => redirectToJobDetails(jobId)}
      >
        <Text style={styles.detailsBtnText}>See details</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
  },
  jobImg: { width: "100%", height: 117 },
  detailsBtn: {
    backgroundColor: Colors.dark,
    borderWidth: 0.6,
    borderColor: Colors.dark,
    flex: 1,
    paddingVertical: 8,
    justifyContent: "center",
  },
  detailsBtnText: {
    color: Colors.white,
    lineHeight: 21,
    textAlign: "center",
    fontSize: 18,
  },
});
