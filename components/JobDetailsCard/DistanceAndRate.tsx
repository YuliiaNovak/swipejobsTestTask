import { Colors } from "@/common/constants/Colors";
import { commonStyles } from "@/common/styles/styles";
import { formatCentsToDollars } from "@/utils/formatCentsToDollars";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  milesToTravel: number;
  wagePerHourInCents: number;
}

export const DistanceAndRate = ({
  milesToTravel,
  wagePerHourInCents,
}: Props) => {
  return (
    <View style={[commonStyles.cardPadding, styles.distanceAndRateContainer]}>
      <View>
        <Text style={[commonStyles.secondaryText, styles.distanceAndRateText]}>
          Distance
        </Text>
        <Text style={styles.numbers}>{milesToTravel.toFixed(1)} miles</Text>
      </View>
      <View>
        <Text style={[commonStyles.secondaryText, styles.distanceAndRateText]}>
          Hourly rate
        </Text>
        <Text style={styles.numbers}>
          {formatCentsToDollars(wagePerHourInCents)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  distanceAndRateContainer: {
    backgroundColor: Colors.green,
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 0,
    paddingHorizontal: 16,
  },
  distanceAndRateText: {
    fontSize: 12,
    color: Colors.white,
  },
  numbers: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.white,
  },
});
