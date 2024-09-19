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
        <View
            style={{
                flexDirection: "row",
                flexGrow: 1,
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {BOARD_COLORS.map((color) => (
                <TouchableOpacity
                    key={color}
                    style={{
                        backgroundColor: color,
                        height: 100,
                        width: 100,
                        margin: 5,
                        borderRadius: 4,
                        borderWidth: selected === color ? 2 : 0,
                        borderColor: colors.fontDark,
                    }}
                    onPress={() => onColorSelect(color)}
                />
            ))}
        </View>
    );
}
