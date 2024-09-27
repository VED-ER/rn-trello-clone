import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { setStatusBarStyle } from "expo-status-bar";

export default function Card() {
    const { id } = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        setStatusBarStyle("dark");

        return () => setStatusBarStyle("light");
    }, []);

    return (
        <View>
            <Text>{id}</Text>
        </View>
    );
}
