import { Stack } from "expo-router";
import { colors } from "@/constants/tailwind-colors";
import { Image } from "expo-image";
import { images } from "@/constants";

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
                }}
            />
        </Stack>
    );
}
