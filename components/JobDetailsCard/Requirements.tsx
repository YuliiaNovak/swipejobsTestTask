import { commonStyles } from "@/common/styles/styles";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  requirements: string[] | undefined;
}

export const Requirements = ({ requirements }: Props) => (
  <View style={[styles.container, commonStyles.cardPadding]}>
    <Entypo name="tools" size={26} style={commonStyles.icon} />
    <View style={commonStyles.containerGap}>
      <Text style={commonStyles.secondaryText}>Requirements</Text>
      {requirements?.length ? (
        requirements.map((requirement, index) => (
          <Text key={`${requirement}-${index}`}>{requirement}</Text>
        ))
      ) : (
        <Text>None</Text>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
