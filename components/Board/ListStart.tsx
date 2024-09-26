import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

export interface ListStartProps {
    onCancel: () => void;
    onSave: (title: string) => void;
}

export default function ListStart({ onCancel, onSave }: ListStartProps) {
    const [listTitle, setListTitle] = useState("");

    return (
        <View className={"bg-white rounded p-1.5 mb-4 w-full h-[90px]"}>
            <TextInput
                className={"p-2 border-[0.5px] border-grey rounded mb-2"}
                value={listTitle}
                onChangeText={setListTitle}
                placeholder="List title"
                autoFocus
            />
            <View className={"flex-row justify-between p-2"}>
                <TouchableOpacity onPress={onCancel}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onSave(listTitle)}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
