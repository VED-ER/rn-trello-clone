import { Card, CardList } from "@/types/enums";
import { Alert, Button, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/constants/tailwind-colors";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { DefaultTheme } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSupabase } from "@/context/SupabaseContext";
import DraggableFlatList from "react-native-draggable-flatlist/src/components/DraggableFlatList";
import ListItem from "@/components/Board/ListItem";
import * as Haptics from "expo-haptics";
import { DragEndParams } from "react-native-draggable-flatlist";

export interface ListViewProps {
    cardList: CardList;
    onDelete: () => void;
}

export default function ListView({ cardList, onDelete }: ListViewProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState("");
    const [cards, setCards] = useState<Card[]>([]);
    const { deleteBoardList, updateBoardList, addListCard, updateCard, getListCards } =
        useSupabase();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["40%"], []);

    const [listName, setListName] = useState("");

    useEffect(() => {
        setListName(cardList.title);
    }, [cardList.title]);

    useEffect(() => {
        loadListCards();
    }, []);

    const loadListCards = async () => {
        const data = await getListCards!(cardList.id);
        setCards(data);
    };

    const onDeleteList = async () => {
        try {
            await deleteBoardList!(cardList.id);
            bottomSheetModalRef.current?.close();
            onDelete();
        } catch (e: any) {
            Alert.alert("Error deleting board list", e.message);
        }
    };

    const onUpdateTaskList = async () => {
        try {
            await updateBoardList!(cardList, listName);
        } catch (e: any) {
            Alert.alert("Error updating board list", e.message);
        }
    };

    const onAddCard = async () => {
        if (!newCardTitle) return;
        const { data, error } = await addListCard!(
            cardList.id,
            cardList.board_id,
            newCardTitle,
            cards.length,
        );
        if (!error) {
            setIsAdding(false);
            setNewCardTitle("");
        }
        // Unnecessary when using realtime updates
        setCards((prevCards) => [...prevCards, data]);
    };

    const onTaskDropped = async (params: DragEndParams<Card>) => {
        const newData = params.data.map((item: any, index: number) => {
            return { ...item, position: index };
        });

        setCards(newData);
        newData.forEach(async (item: any) => {
            await updateCard!(item);
        });
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
            <View className={"pt-5 px-7"}>
                <View className={"bg-[#F3EFFC] rounded p-1.5 mb-4"}>
                    <View className={"flex-row justify-between items-center p-2"}>
                        <Text className={"py-2 font-medium"}>{listName}</Text>
                        <TouchableOpacity onPress={() => bottomSheetModalRef.current?.present()}>
                            <MaterialCommunityIcons
                                name="dots-horizontal"
                                size={22}
                                color={colors.grey}
                            />
                        </TouchableOpacity>
                    </View>

                    <DraggableFlatList
                        data={cards}
                        renderItem={ListItem}
                        keyExtractor={(item) => `${item.id}`}
                        onDragEnd={onTaskDropped}
                        onDragBegin={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                        onPlaceholderIndexChange={() =>
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        }
                        activationDistance={10}
                        containerStyle={{
                            paddingBottom: 4,
                            maxHeight: "80%",
                        }}
                        contentContainerStyle={{ gap: 4 }}
                    />

                    {isAdding && (
                        <TextInput
                            autoFocus
                            style={{ elevation: 1 }}
                            className={`p-2 mb-3 bg-white ${Platform.OS !== "android" ? "shadow-sm" : ""} rounded`}
                            value={newCardTitle}
                            onChangeText={setNewCardTitle}
                        />
                    )}

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingHorizontal: 8,
                            marginVertical: 8,
                        }}
                    >
                        {!isAdding && (
                            <>
                                <TouchableOpacity
                                    className={"flex-row items-center"}
                                    onPress={() => setIsAdding(true)}
                                >
                                    <Ionicons name="add" size={14} />
                                    <Text className={"text-xs"}>Add card</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {}}>
                                    <Ionicons name="image-outline" size={18} />
                                </TouchableOpacity>
                            </>
                        )}
                        {isAdding && (
                            <>
                                <TouchableOpacity onPress={() => setIsAdding(false)}>
                                    <Text className={"text-primary text-sm"}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onAddCard}>
                                    <Text className={"text-primary text-sm font-bold"}>Add</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </View>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                handleStyle={{ backgroundColor: DefaultTheme.colors.background, borderRadius: 12 }}
                backdropComponent={renderBackdrop}
                enableOverDrag={false}
                enablePanDownToClose
            >
                <View
                    className={"flex-1 gap-4"}
                    style={{ backgroundColor: DefaultTheme.colors.background }}
                >
                    <View className={"flex-row items-center px-2.5"}>
                        <Button
                            title="Cancel"
                            onPress={() => bottomSheetModalRef.current?.close()}
                        />
                    </View>
                    <View className={"bg-white px-4 py-2"}>
                        <Text className={"text-grey text-sm mb-1.5"}>List name</Text>
                        <TextInput
                            className={"text-base text-fontDark"}
                            returnKeyType="done"
                            enterKeyHint="done"
                            onEndEditing={onUpdateTaskList}
                            onChangeText={(e) => setListName(e)}
                            value={listName}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={onDeleteList}
                        className={"bg-white p-2 mx-4 rounded-sm items-center"}
                    >
                        <Text>Close List</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
