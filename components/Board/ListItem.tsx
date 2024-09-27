import { Card } from "@/types/enums";
import { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { useSupabase } from "@/context/SupabaseContext";
import { useState } from "react";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

export default function ListItem({ item, drag, isActive }: RenderItemParams<Card>) {
    const { getFileFromPath } = useSupabase();
    const [imagePath, setImagePath] = useState<string>("");
    if (item.image_url) {
        getFileFromPath!(item.image_url).then((path) => {
            if (path) {
                setImagePath(path);
            }
        });
    }

    const openLink = () => {
        router.push(`/board/card/${item.id}`);
    };
    console.log(item);
    return (
        <ScaleDecorator>
            <TouchableOpacity
                activeOpacity={1}
                onPress={openLink}
                onLongPress={drag}
                disabled={isActive}
                className={"p-2 rounded bg-white"}
                style={{ opacity: isActive ? 0.5 : 1 }}
            >
                {item.image_url && (
                    <>
                        {imagePath && (
                            <Image
                                source={{ uri: imagePath }}
                                className={"w-full h-[200px] rounded bg-[#f3f3f3]"}
                            />
                        )}

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ flex: 1 }}>{item.title}</Text>
                            {item.assigned_to && (
                                <Ionicons name="person-circle-outline" size={16} color={"#000"} />
                            )}
                        </View>
                    </>
                )}
                {!item.image_url && (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ flex: 1 }}>{item.title}</Text>
                        {item.assigned_to && (
                            <Ionicons name="person-circle-outline" size={16} color={"#000"} />
                        )}
                    </View>
                )}
            </TouchableOpacity>
        </ScaleDecorator>
    );
}
