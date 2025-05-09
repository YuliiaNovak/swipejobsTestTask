import { useGetProfileDataQuery } from "@/api/queries/profileApi";
import { USER_ID } from "@/common/constants/User";
import { commonStyles } from "@/common/styles/styles";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const Profile = () => {
  const {
    data: profileData,
    error,
    isLoading,
  } = useGetProfileDataQuery(USER_ID);

  if (isLoading) {
    return <ActivityIndicator size="large" accessibilityLabel="Loading" />;
  }

  if (error || !profileData)
    return (
      <Text style={commonStyles.errorText}>
        Profile data couldn't be fetched. Please try again.
      </Text>
    );

  return (
    <View style={styles.container}>
      <View style={styles.mainInfoContainer}>
        <Text style={commonStyles.mainTitle}>
          {profileData.firstName} {profileData.lastName}
        </Text>
        <Text style={commonStyles.secondaryText}>{profileData.email}</Text>
        <Text style={styles.text}>
          {formatPhoneNumber(profileData.phoneNumber)}
        </Text>
      </View>
      <View>
        <Text style={commonStyles.secondaryText}>Address:</Text>
        <Text style={styles.text}>{profileData.address.formattedAddress}</Text>
      </View>
      <View>
        <Text style={commonStyles.secondaryText}>Max Job Distance:</Text>
        <Text style={styles.text}>{profileData.maxJobDistance} miles</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  mainInfoContainer: { alignItems: "center", gap: 6 },
  nameAndSurnameText: { fontSize: 20, fontWeight: 500 },
  text: { fontSize: 14 },
});
