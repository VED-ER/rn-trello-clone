import { Text, TouchableOpacity, View } from "react-native";
import { BOARD_COLORS, DEFAULT_BOARD_COLOR } from "@/constants";
import { router } from "expo-router";
import { useState } from "react";
import { colors } from "@/constants/tailwind-colors";

export default function ColorSelect() {
    const [selected, setSelected] = useState<string>(DEFAULT_BOARD_COLOR);

    const onColorSelect = (color: string) => {
        setSelected(color);
        router.setParams({ bg: color });
    };

    return (
        <View className={"flex-row flex-grow flex-wrap justify-center max-w-[330px] mx-auto"}>
            {BOARD_COLORS.map((color) => (
                <TouchableOpacity
                    key={color}
                    className={"h-[100px] w-[100px] m-[5px] rounded"}
                    style={{
                        backgroundColor: color,
                        borderWidth: selected === color ? 2 : 0,
                        borderColor: colors.fontDark,
                    }}
                    onPress={() => onColorSelect(color)}
                />
            ))}
        </View>
    );
}
