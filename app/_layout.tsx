import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { setBackgroundColorAsync } from "expo-system-ui";
import { useEffect } from "react";
import '../global.css';

export default function RootLayout() {
  useEffect(() => {
    setBackgroundColorAsync("#0F0D23"); // sets bottom nav bar color
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#0F0D23" barStyle="light-content" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
