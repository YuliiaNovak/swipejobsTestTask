import { Colors } from "@/common/constants/Colors";
import { commonStyles } from "@/common/styles/styles";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../Button/Button";

interface Props {
  rightButtonText: string;
  leftButtonText: string;
  rightButtonAction: () => void;
  leftButtonAction: () => void;
  isRightButtonActionLoading: boolean;
  isLeftButtonActionLoading: boolean;
}

export const DoubleButton = ({
  rightButtonText,
  leftButtonText,
  rightButtonAction,
  leftButtonAction,
  isRightButtonActionLoading,
  isLeftButtonActionLoading,
}: Props) => (
  <View style={[commonStyles.cardPadding, styles.container]}>
    <Button
      buttonAction={leftButtonAction}
      isActionLoading={isLeftButtonActionLoading}
      buttonText={leftButtonText}
      buttonStyle={styles.leftButton}
      textStyle={styles.leftButtonText}
    />
    <Button
      buttonAction={rightButtonAction}
      isActionLoading={isRightButtonActionLoading}
      buttonText={rightButtonText}
      buttonStyle={styles.rightButton}
      textStyle={styles.rightButtonText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0,
    justifyContent: "space-around",
    gap: 10,
  },
  leftButton: {
    borderWidth: 0.6,
    borderColor: Colors.darkGray,
    flex: 1,
    paddingVertical: 8,
    borderRadius: 4,
  },
  rightButton: {
    backgroundColor: Colors.dark,
    borderWidth: 0.6,
    borderColor: Colors.dark,
    flex: 1,
    paddingVertical: 8,
    borderRadius: 4,
  },
  leftButtonText: { color: Colors.darkGray },
  rightButtonText: { color: Colors.white },
});
