import { router, Stack } from "expo-router";
import { colors } from "@/constants/tailwind-colors";
import { Image } from "expo-image";
import { images } from "@/constants";
import DropdownPlus from "@/components/DropdownPlus";
import { Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BoardsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    headerTitle: () => (
                        <Image
                            className={"w-[120px] h-[45px]"}
                            contentFit={"contain"}
                            source={images.trelloLogoGradientWhite}
                        />
                    ),
                    headerRight: DropdownPlus,
                }}
            />

            <Stack.Screen
                name={"new-board"}
                options={{ headerShown: false, presentation: "modal" }}
            />

            <Stack.Screen
                name="templates"
                options={{
                    title: "Start with a template",
                    presentation: "fullScreenModal",
                    headerRight: () => {
                        return Platform.OS === "ios" ? (
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className={"bg-lightGray rounded-2xl p-2"}
                            >
                                <Ionicons name="close" size={18} color={colors.darkGray} />
                            </TouchableOpacity>
                        ) : null;
                    },
                }}
            />
        </Stack>
    );
}
