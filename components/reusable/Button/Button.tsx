import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

interface Props {
  buttonAction: () => void;
  isActionLoading: boolean;
  buttonText: string;
  buttonStyle?: {};
  textStyle?: {};
}

export const Button = ({
  buttonAction,
  isActionLoading,
  buttonText,
  buttonStyle,
  textStyle,
}: Props) => (
  <Pressable onPress={buttonAction} style={buttonStyle}>
    {isActionLoading ? (
      <ActivityIndicator accessibilityLabel="Loading" />
    ) : (
      <Text style={[styles.buttonText, textStyle]}>{buttonText}</Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  buttonText: { lineHeight: 21, textAlign: "center" },
});
