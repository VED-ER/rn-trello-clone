import { ListRenderItemInfo, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { colors } from "@/constants/tailwind-colors";
import { User } from "@/types/enums";

interface UserListItemProps {
    element: ListRenderItemInfo<User>;
    onPress: (user: User) => void;
}

export default function MemberListItem({ element: { item }, onPress }: UserListItemProps) {
    return (
        <TouchableOpacity
            style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
            onPress={() => onPress(item)}
        >
            <Image
                source={{ uri: item.avatar_url }}
                style={{ width: 30, height: 30, borderRadius: 40 }}
            />
            <View>
                <Text style={{ fontSize: 16, fontWeight: "semibold" }}>{item.first_name}</Text>
                <Text style={{ color: colors.grey }}>{item.email}</Text>
            </View>
        </TouchableOpacity>
    );
}
