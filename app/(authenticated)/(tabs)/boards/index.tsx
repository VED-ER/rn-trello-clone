import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { Board } from "@/types/enums";
import { Link, useFocusEffect } from "expo-router";
import { useSupabase } from "@/context/SupabaseContext";
import { DefaultTheme } from "@react-navigation/native";

export default function Boards() {
    const [boards, setBoards] = useState<Board[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const { getBoards } = useSupabase();

    useFocusEffect(
        useCallback(() => {
            loadBoards();
        }, []),
    );

    const loadBoards = async () => {
        try {
            const data = await getBoards!();
            setBoards(data);
        } catch (e: any) {
            Alert.alert("Error creating board", e.message);
        }
    };

    const renderItem = ({ item }: { item: Board }) => (
        <Link
            // @ts-ignore
            href={`/(authenticated)/board/${item.id}?bg=${encodeURIComponent(item.background)}`}
            key={item.id}
        >
            <View className={"py-4 px-3 gap-x-4 flex-row items-center"}>
                <View style={{ backgroundColor: item.background }} className={"h-8 w-8 rounded"} />
                <Text className={"text-sm"}>{item.title}</Text>
            </View>
        </Link>
    );

    const keyExtractor = (item: Board): string => item.id;

    const ItemSeparatorComponent = () => <View className={"h-[0.5px] bg-grey"} />;

    const ListEmptyComponent = () => (
        <View
            style={{ backgroundColor: DefaultTheme.colors.background }}
            className={"flex-1 grow justify-center items-center"}
        >
            <Text className={"text-center text-lg font-medium"}>No Boards to display</Text>
            <Text className={"text-center text-base text-neutral-500"}>
                Press on a plus icon to get started
            </Text>
        </View>
    );
    return (
        <FlatList
            data={boards}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparatorComponent}
            ListEmptyComponent={ListEmptyComponent}
            contentContainerStyle={{
                flexGrow: boards.length ? 0 : 1,
                backgroundColor: "white",
                marginTop: boards.length ? 20 : 0,
                borderColor: "grey",
                borderTopWidth: boards.length ? StyleSheet.hairlineWidth : 0,
                borderBottomWidth: boards.length ? StyleSheet.hairlineWidth : 0,
            }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadBoards} />}
        />
    );
}
