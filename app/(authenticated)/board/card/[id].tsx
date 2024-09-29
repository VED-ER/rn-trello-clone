import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { setStatusBarStyle } from "expo-status-bar";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Card, User } from "@/types/enums";
import { useSupabase } from "@/context/SupabaseContext";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/tailwind-colors";
import { Image } from "expo-image";
import { DefaultTheme } from "@react-navigation/native";
import MemberListItem from "@/components/MemberListItem";

export default function CardId() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["60%"], []);

    const { getCardInfo, getBoardMembers, getFileFromPath, updateCard, assignCard } = useSupabase();

    const router = useRouter();
    const [card, setCard] = useState<Card>();
    const [member, setMember] = useState<User[]>();
    const [imagePath, setImagePath] = useState<string>("");

    if (card?.image_url) {
        getFileFromPath!(card.image_url).then((path) => {
            if (path) {
                setImagePath(path);
            }
        });
    }

    useEffect(() => {
        setStatusBarStyle("dark");

        return () => setStatusBarStyle("light");
    }, []);

    useEffect(() => {
        if (!id) return;
        loadInfo();
    }, [id]);

    const loadInfo = async () => {
        if (!id) return;

        const data = await getCardInfo!(id);
        setCard(data);

        const member = await getBoardMembers!(data.board_id);
        setMember(member);
    };

    const saveAndClose = () => {
        updateCard!(card!);
        router.back();
    };

    const onArchiveCard = () => {
        updateCard!({ ...card!, done: true });
        router.back();
    };

    const onAssignUser = async (user: User) => {
        const { data, error } = await assignCard!(card!.id, user.id);

        setCard(data);
        bottomSheetModalRef.current?.close();
    };

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                opacity={0.2}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                {...props}
                onPress={() => bottomSheetModalRef.current?.close()}
            />
        ),
        [],
    );

    return (
        <BottomSheetModalProvider>
            <View style={{ flex: 1 }}>
                <Stack.Screen
                    options={{
                        headerLeft: () => (
                            <TouchableOpacity onPress={saveAndClose}>
                                <Ionicons name="close" size={24} color={colors.grey} />
                            </TouchableOpacity>
                        ),
                    }}
                />
                {card && (
                    <>
                        {!card.image_url && (
                            <TextInput
                                className={"p-2 bg-white my-2 rounded"}
                                value={card.title}
                                multiline
                                onChangeText={(text: string) => setCard({ ...card, title: text })}
                            ></TextInput>
                        )}

                        <TextInput
                            className={"p-2 bg-white my-2 rounded min-h-[100px]"}
                            value={card.description || ""}
                            multiline
                            placeholder="Add a description"
                            onChangeText={(text: string) => setCard({ ...card, description: text })}
                        ></TextInput>

                        {imagePath && (
                            <>
                                {card.image_url && (
                                    <Image
                                        source={{ uri: imagePath }}
                                        style={{
                                            width: "100%",
                                            height: 400,
                                            resizeMode: "contain",
                                            borderRadius: 4,
                                            backgroundColor: "#f3f3f3",
                                        }}
                                    />
                                )}
                            </>
                        )}

                        <View className={"flex-row gap-3 p-2 items-center"}>
                            <Ionicons name="person" size={24} color={colors.grey} />

                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={() => bottomSheetModalRef.current?.present()}
                            >
                                {!card.assigned_to ? (
                                    <Text>Assign...</Text>
                                ) : (
                                    <Text>
                                        Assigned to {card.users?.first_name || card.users?.email}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={onArchiveCard}
                            className={"p-2.5 rounded-lg items-center border border-white"}
                        >
                            <Text className={"text-lg"}>Archive</Text>
                        </TouchableOpacity>
                    </>
                )}
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    handleStyle={{
                        backgroundColor: DefaultTheme.colors.background,
                        borderRadius: 12,
                    }}
                    backdropComponent={renderBackdrop}
                    enableOverDrag={false}
                    enablePanDownToClose
                >
                    <View
                        className={"flex-1 gap-4"}
                        style={{ backgroundColor: DefaultTheme.colors.background }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: 10,
                            }}
                        >
                            <Button
                                title="Cancel"
                                onPress={() => bottomSheetModalRef.current?.close()}
                            />
                        </View>
                        <View
                            style={{
                                backgroundColor: "#fff",
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                            }}
                        >
                            <FlatList
                                data={member}
                                keyExtractor={(item) => `${item.id}`}
                                renderItem={(item) => (
                                    <MemberListItem onPress={onAssignUser} element={item} />
                                )}
                                contentContainerStyle={{ gap: 8 }}
                            />
                        </View>
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
}
