import { commonStyles } from "@/common/styles/styles";
import { ReportToInfo } from "@/types/jobListing";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  reportTo: ReportToInfo;
}

export const ReportTo = ({ reportTo: { name, phone } }: Props) => (
  <View style={[commonStyles.cardPadding, styles.container]}>
    <Ionicons
      name="person-circle-outline"
      size={26}
      style={commonStyles.icon}
    />
    <View style={commonStyles.containerGap}>
      <Text style={commonStyles.secondaryText}>Report To</Text>
      <Text>{phone ? `${name} ${formatPhoneNumber(phone)}` : name}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0,
  },
});
