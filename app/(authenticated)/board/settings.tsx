import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Board } from "@/types/enums";
import { router, useLocalSearchParams } from "expo-router";
import { useSupabase } from "@/context/SupabaseContext";

export default function Settings() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const { getBoardInfo, updateBoard, deleteBoard } = useSupabase();
    const [board, setBoard] = useState<Board>();

    useEffect(() => {
        loadInfo();
    }, [id]);

    const loadInfo = async () => {
        if (!id) return;

        const data = await getBoardInfo!(id);
        setBoard(data);
    };

    const onDelete = async () => {
        await deleteBoard!(`${id}`);
        router.dismissAll();
    };

    const onUpdateBoard = async () => {
        const updated = await updateBoard!(board!);
        setBoard(updated);
    };

    return (
        <View>
            <View className={"bg-white p-2 px-4 my-4"}>
                <View>
                    <Text className={"text-grey text-xs mb-1.5"}>Board name</Text>
                    <TextInput
                        value={board?.title}
                        onChangeText={(e) => setBoard({ ...board!, title: e })}
                        className={"text-base text-fontDark"}
                        returnKeyType="done"
                        enterKeyHint="done"
                        onEndEditing={onUpdateBoard}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={onDelete}
                className={"bg-white p-2 mx-4 rounded-md items-center"}
            >
                <Text>Close Board</Text>
            </TouchableOpacity>
        </View>
    );
}
