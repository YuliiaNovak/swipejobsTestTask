import { commonStyles } from "@/common/styles/styles";
import { Text, View } from "react-native";

interface Props {
  jobTitle: string;
  companyName: string;
}

export const NameInfo = ({ jobTitle, companyName }: Props) => (
  <View style={commonStyles.cardPadding}>
    <Text style={commonStyles.mainTitle}>{jobTitle}</Text>
    <Text style={commonStyles.secondaryText}>{companyName}</Text>
  </View>
);
