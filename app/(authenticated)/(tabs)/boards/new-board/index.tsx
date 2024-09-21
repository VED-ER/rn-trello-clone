import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Link, router, Stack, useGlobalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSupabase } from "@/context/SupabaseContext";
import { DEFAULT_BOARD_COLOR } from "@/constants";
import { colors } from "@/constants/tailwind-colors";
import { setStatusBarStyle } from "expo-status-bar";

export default function NewBoard() {
    const [boardName, setBoardName] = useState("");
    const [creatingBoard, setCreatingBoard] = useState(false);
    const { createBoard } = useSupabase();
    // TODO: find a new way to send color from color-select screen without using global search params
    const { bg } = useGlobalSearchParams<{ bg?: string }>();
    const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_BOARD_COLOR);
    console.log(selectedColor);
    useEffect(() => {
        if (bg) {
            setSelectedColor(bg);
        }
    }, [bg]);

    useEffect(() => {
        if (Platform.OS === "android") {
            setStatusBarStyle("dark");
        }

        return () => {
            if (Platform.OS === "android") {
                setStatusBarStyle("light");
            }
        };
    }, []);

    const onCreateBoard = async () => {
        setCreatingBoard(true);
        try {
            await createBoard!(boardName, selectedColor);
            router.dismiss();
        } catch (e: any) {
            Alert.alert("Error creating board", e.message);
        } finally {
            setCreatingBoard(false);
        }
    };

    return (
        <View style={{ marginVertical: 10 }}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={onCreateBoard}
                            disabled={boardName === "" || creatingBoard}
                        >
                            <Text
                                className={`text-lg font-medium ${boardName !== "" ? "text-primary" : "text-grey"}`}
                            >
                                Create
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <TextInput
                className={
                    "border-t-[0.5px] border-b-[0.5px] border-grey bg-white p-3 px-6 text-base mb-8"
                }
                value={boardName}
                onChangeText={setBoardName}
                placeholder="New Board"
                autoFocus
            />
            <Link href={"/(authenticated)/(tabs)/boards/new-board/color-select"} asChild>
                <TouchableOpacity className={"flex-row items-center p-3 bg-white"}>
                    <Text className={"flex-1 text-base"}>Background</Text>
                    <View
                        className={`w-6 h-6 rounded mr-1`}
                        style={{ backgroundColor: selectedColor }}
                    />
                    <Ionicons name="chevron-forward" size={22} color={colors.grey} />
                </TouchableOpacity>
            </Link>
        </View>
    );
}
