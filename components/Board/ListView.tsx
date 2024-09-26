import { TaskList } from "@/types/enums";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/constants/tailwind-colors";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { DefaultTheme } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSupabase } from "@/context/SupabaseContext";

export interface ListViewProps {
    taskList: TaskList;
    onDelete: () => void;
}

export default function ListView({ taskList, onDelete }: ListViewProps) {
    const { deleteBoardList, updateBoardList } = useSupabase();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["40%"], []);

    const [listName, setListName] = useState(taskList.title);

    useEffect(() => {
        setListName(taskList.title);
    }, [taskList.title]);

    const onDeleteList = async () => {
        try {
            await deleteBoardList!(taskList.id);
            bottomSheetModalRef.current?.close();
            onDelete();
        } catch (e: any) {
            Alert.alert("Error deleting board list", e.message);
        }
    };

    const onUpdateTaskList = async () => {
        try {
            await updateBoardList!(taskList, listName);
        } catch (e: any) {
            Alert.alert("Error updating board list", e.message);
        }
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
