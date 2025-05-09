import { Colors } from "@/common/constants/Colors";
import { commonStyles } from "@/common/styles/styles";
import { Shifts } from "@/types/jobListing";
import { formatShift } from "@/utils/formatShift";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ShiftListProps {
  shifts: Shifts[];
}

export const ShiftList = ({ shifts }: ShiftListProps) => {
  const [expanded, setExpanded] = useState(false);

  const visibleShifts = expanded ? shifts : shifts.slice(0, 2);

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <View style={[styles.container, commonStyles.cardPadding]}>
      <AntDesign
        name="calendar"
        size={26}
        style={[shifts.length > 2 && styles.iconWithMargin, commonStyles.icon]}
      />
      <View style={commonStyles.containerGap}>
        <Text style={commonStyles.secondaryText}>Shift Dates</Text>
        <View style={commonStyles.containerGap}>
          {visibleShifts.map((shift, index) => (
            <Text key={`${shift.startDate}-${shift.endDate}-${index}`}>
              {formatShift(shift.startDate, shift.endDate)}
            </Text>
          ))}

          {shifts.length > 2 && (
            <Pressable onPress={handleToggle}>
              <Text style={styles.showMoreText}>
                {expanded ? "Show Less" : "Show More"}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  showMoreText: {
    alignSelf: "center",
    color: Colors.green,
    fontWeight: "500",
    marginTop: 8,
  },
  iconWithMargin: {
    marginBottom: 30,
  },
});
