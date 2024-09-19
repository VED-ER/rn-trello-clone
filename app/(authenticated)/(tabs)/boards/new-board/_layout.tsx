import { router, Stack } from "expo-router";
import { DefaultTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/tailwind-colors";

export default function NewBoardLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Board",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: DefaultTheme.colors.background,
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="close" size={26} color={colors.primary} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="color-select"
                options={{
                    title: "Board Background",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: DefaultTheme.colors.background,
                    },
                }}
            />
        </Stack>
    );
}
