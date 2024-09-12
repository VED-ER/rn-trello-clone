import { Stack } from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

function InitialLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}

export default function RootLayoutNav() {
    return (
        <ActionSheetProvider>
            <>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <StatusBar style={"light"} />
                    <InitialLayout />
                </GestureHandlerRootView>
            </>
        </ActionSheetProvider>
    );
}
