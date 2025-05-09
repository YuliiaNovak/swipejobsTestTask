import { commonStyles } from "@/common/styles/styles";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  branch: string;
  branchPhoneNumber: string;
}

export const Branch = ({ branch, branchPhoneNumber }: Props) => {
  return (
    <View style={[commonStyles.cardPadding, styles.container]}>
      <Entypo name="flow-branch" size={26} style={commonStyles.icon} />
      <View style={commonStyles.containerGap}>
        <Text style={commonStyles.secondaryText}>Branch</Text>
        <Text>
          {branch} {formatPhoneNumber(branchPhoneNumber)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0,
  },
});
