import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Board, User } from "@/types/enums";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useSupabase } from "@/context/SupabaseContext";
import MemberListItem from "@/components/MemberListItem";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/tailwind-colors";

export default function Settings() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const { getBoardInfo, updateBoard, deleteBoard, getBoardMembers } = useSupabase();
    const [board, setBoard] = useState<Board>();
    const [members, setMembers] = useState<User[]>([]);

    useEffect(() => {
        loadInfo();
    }, [id]);

    const loadInfo = async () => {
        if (!id) return;

        const data = await getBoardInfo!(id);
        setBoard(data);

        const members = await getBoardMembers!(id);
        setMembers(members);
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

            <View className={"bg-white p-2 px-4 my-4"}>
                <View className={"flex-row gap-3.5"}>
                    <Ionicons name="person-outline" size={18} color={colors.fontDark} />
                    <Text className={"text-base text-fontDark font-bold"}>Members</Text>
                </View>
                <FlatList
                    data={members}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={(item) => <MemberListItem onPress={() => {}} element={item} />}
                    contentContainerStyle={{ gap: 8 }}
                    style={{ marginVertical: 12 }}
                />
                <Link href={`/(authenticated)/board/invite?id=${id}`} asChild>
                    <TouchableOpacity className={"bg-primary p-2 mt-2 rounded-md items-center"}>
                        <Text className={"text-base text-fontLight"}>Invite...</Text>
                    </TouchableOpacity>
                </Link>
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
