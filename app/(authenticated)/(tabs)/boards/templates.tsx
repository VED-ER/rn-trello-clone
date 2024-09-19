import { Text, View } from "react-native";
import { useEffect } from "react";
import { setStatusBarStyle } from "expo-status-bar";

export default function Templates() {
    useEffect(() => {
        setStatusBarStyle("dark");

        return () => setStatusBarStyle("light");
    });
    return (
        <View>
            <Text>Templates</Text>
        </View>
    );
}
