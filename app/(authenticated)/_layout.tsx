import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/tailwind-colors";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name={"(tabs)"} options={{ headerShown: false }} />
            <Stack.Screen
                name={"board/settings"}
                options={{
                    presentation: "modal",
                    title: "Manage Board",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name={"close"} size={24} color={colors.grey} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name={"board/invite"}
                options={{
                    presentation: "modal",
                    title: "Manage Board Members",
                    headerLeft: () => (
                        <TouchableOpacity
                            className={"bg-[#E3DFE9] p-1.5 rounded-2xl"}
                            onPress={() => router.back()}
                        >
                            <Ionicons name={"close"} size={24} color={colors.grey} />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
}
