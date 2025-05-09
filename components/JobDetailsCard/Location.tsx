import { commonStyles } from "@/common/styles/styles";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  address: string;
  milesToTravel: number;
}

export const Location = ({ address, milesToTravel }: Props) => (
  <View style={[styles.container, commonStyles.cardPadding]}>
    <Entypo name="location-pin" size={26} style={commonStyles.icon} />
    <View style={commonStyles.containerGap}>
      <Text style={commonStyles.secondaryText}>Location</Text>
      <Text>{address}</Text>
      <Text style={styles.milesText}>
        {milesToTravel} miles from your job search location
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  milesText: { fontSize: 12 },
});
