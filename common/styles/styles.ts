import { Colors } from "@/common/constants/Colors";
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    height: "55%",
    marginTop: 20,
  },
  cardPadding: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightGray,
    marginHorizontal: 16,
  },
  mainTitle: { fontSize: 18, fontWeight: 700 },
  secondaryText: { fontSize: 14, fontWeight: 600 },
  containerGap: { gap: 4 },
  icon: { paddingRight: 16 },
  errorText: { fontSize: 22, textAlign: "center", margin: 16 },
});
