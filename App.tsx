import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { commonStyles } from "./common/styles/styles";
import { JobsList } from "./components/JobsList/JobsList";

export default function App() {
  return (
    <SafeAreaView style={commonStyles.safeAreaContainer}>
      <View style={styles.mainContainer}>
        <JobsList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1 },
  mainContainer: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "center",
  },
  title: { textAlign: "center", fontSize: 24, fontWeight: "600" },
});
