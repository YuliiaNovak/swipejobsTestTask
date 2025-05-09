import { Stack } from "expo-router";
import "react-native-reanimated";
import { Provider } from "react-redux";

import { store } from "@/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="jobDetails/[jobId]"
          options={{
            headerTitle: "Job Details",
            headerBackTitle: "Job Listings",
          }}
        />
      </Stack>
    </Provider>
  );
}
