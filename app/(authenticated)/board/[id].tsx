import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/constants/tailwind-colors";
import { useEffect, useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSupabase } from "@/context/SupabaseContext";
import { Board } from "@/types/enums";
import BoardArea from "@/components/Board/BoardArea";

export default function Id() {
    const { id, bg } = useLocalSearchParams<{ id: string; bg?: string }>();
    const { getBoardInfo } = useSupabase();
    const [board, setBoard] = useState<Board>();
    const { top } = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();

    useEffect(() => {
        if (id) {
            loadBoardInfo();
        }
    }, [id]);

    const loadBoardInfo = async () => {
        if (!id) return;

        try {
            const data = await getBoardInfo!(id);
            setBoard(data);
        } catch (e: any) {
            Alert.alert("Error loading board info", e.message);
        }
    };

    const CustomHeader = () => (
        <BlurView intensity={80} tint="dark" style={{ paddingTop: top }}>
            <View className={"flex-row items-center gap-3 bg-none px-4 h-16"}>
                <TouchableOpacity
                    onPress={() => {
                        router.dismiss();
                    }}
                >
                    <Ionicons name="close" size={24} color={colors.fontLight} />
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.fontLight, fontSize: 16 }}>{board?.title}</Text>
                    <Text style={{ color: colors.fontLight, fontSize: 12 }}>
                        Workspace of {(board as any)?.users.first_name}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", gap: 16 }}>
                    <TouchableOpacity onPress={() => {}}>
                        <Ionicons name="filter-circle-outline" size={26} color={colors.fontLight} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <Ionicons name="notifications-outline" size={26} color={colors.fontLight} />
                    </TouchableOpacity>
                    <Link href={`/(authenticated)/board/settings?id=${id}`} asChild>
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                                name="dots-horizontal"
                                size={26}
                                color={colors.fontLight}
                            />
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </BlurView>
    );

    return (
        <ScrollView
            style={{
                backgroundColor: bg,
                paddingTop: headerHeight,
                flex: 1,
            }}
        >
            <Stack.Screen
                options={{
                    title: board?.title,
                    headerTransparent: true,
                    header: () => <CustomHeader />,
                }}
            />
            {board && <BoardArea board={board} />}
        </ScrollView>
    );
}
